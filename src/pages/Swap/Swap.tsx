import { Flex, Form, SwapOutlined, useForm } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { CardHeader } from '@mui/material';
import findLast from 'lodash/findLast';
import maxBy from 'lodash/maxBy';
import { DateTime } from 'luxon';
import React from 'react';
import { useMemo, useState } from 'react';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  Observable,
  of,
  skip,
  switchMap,
  zip,
} from 'rxjs';

import { panalytics } from '../../common/analytics';
import {
  useObservable,
  useSubscription,
} from '../../common/hooks/useObservable';
import { useSearchParams } from '../../common/hooks/useSearchParams';
import { AmmPool } from '../../common/models/AmmPool';
import { AssetInfo } from '../../common/models/AssetInfo';
import { Currency } from '../../common/models/Currency';
import {
  END_TIMER_DATE,
  LOCKED_TOKEN_ID,
} from '../../components/common/ActionForm/ActionButton/ActionButton';
import { ActionForm } from '../../components/common/ActionForm/ActionForm';
import { AssetControlFormItem } from '../../components/common/TokenControl/AssetControl';
import { Page } from '../../components/Page/Page';
import { ammPools$, getAmmPoolsByAssetPair } from '../../gateway/api/ammPools';
import { useAssetsBalance } from '../../gateway/api/assetBalance';
import {
  defaultTokenAssets$,
  getAssetToImportFor,
  getDefaultAssetsFor,
  getImportedAssetsFor,
  importedTokenAssets$,
  tokenAssetsToImport$,
} from '../../gateway/api/assets';
import { useNetworkAsset } from '../../gateway/api/networkAsset';
import { swap } from '../../gateway/api/operations/swap';
import { useRefundableDeposit } from '../../gateway/api/refundableDeposit';
import { useSwapValidationFee } from '../../gateway/api/validationFees';
import { useSelectedNetwork } from '../../gateway/common/network';
import { operationsSettings$ } from '../../gateway/widgets/operationsSettings';
import { PoolSelector } from './PoolSelector/PoolSelector';
import { SwapFormModel } from './SwapFormModel';
import { SwapGraph } from './SwapGraph/SwapGraph';
import { SwapInfo } from './SwapInfo/SwapInfo';

const getToAssets = (fromAsset?: string) =>
  fromAsset ? getDefaultAssetsFor(fromAsset) : defaultTokenAssets$;

const getToAssetsToImport = (fromAsset?: string) =>
  fromAsset ? getAssetToImportFor(fromAsset) : tokenAssetsToImport$;

const getToImportedAssets = (fromAsset?: string) =>
  fromAsset ? getImportedAssetsFor(fromAsset) : importedTokenAssets$;

const isAssetsPairEquals = (
  [prevFrom, prevTo]: [AssetInfo | undefined, AssetInfo | undefined],
  [nextFrom, nextTo]: [AssetInfo | undefined, AssetInfo | undefined],
) =>
  (prevFrom?.id === nextFrom?.id && prevTo?.id === nextTo?.id) ||
  (prevFrom?.id === nextTo?.id && prevTo?.id === nextFrom?.id);

const getAvailablePools = (xId?: string, yId?: string): Observable<AmmPool[]> =>
  xId && yId ? getAmmPoolsByAssetPair(xId, yId) : of([]);

export const Swap = (): JSX.Element => {
  const form = useForm<SwapFormModel>({
    fromAmount: undefined,
    toAmount: undefined,
    fromAsset: undefined,
    toAsset: undefined,
    pool: undefined,
  });
  const [leftWidgetOpened, setLeftWidgetOpened] = useState<boolean>(false);
  const [lastEditedField, setLastEditedField] = useState<'from' | 'to'>('from');
  const [selectedNetwork] = useSelectedNetwork();
  const [networkAsset] = useNetworkAsset();
  const [balance] = useAssetsBalance();
  const [, allAmmPoolsLoading] = useObservable(ammPools$);
  const refundableDeposit = useRefundableDeposit();
  const totalFeesWithDeposit = useSwapValidationFee();
  const [{ base, quote, initialPoolId }, setSearchParams] =
    useSearchParams<{ base: string; quote: string; initialPoolId: string }>();
  const [OperationSettings] = useObservable(operationsSettings$);
  const [reversedRatio, setReversedRatio] = useState(false);
  const updateToAssets$ = useMemo(
    () => new BehaviorSubject<string | undefined>(undefined),
    [],
  );
  const toAssets$ = useMemo(
    () => updateToAssets$.pipe(switchMap(getToAssets)),
    [],
  );
  const toAssetsToImport$ = useMemo(
    () => updateToAssets$.pipe(switchMap(getToAssetsToImport)),
    [],
  );
  const toImportedAssets$ = useMemo(
    () => updateToAssets$.pipe(switchMap(getToImportedAssets)),
    [],
  );

  const getInsufficientTokenNameForFee = ({
    fromAmount,
  }: Required<SwapFormModel>) => {
    const totalFeesWithAmount = fromAmount.isAssetEquals(networkAsset)
      ? fromAmount.plus(totalFeesWithDeposit).minus(refundableDeposit)
      : totalFeesWithDeposit.minus(refundableDeposit);

    return totalFeesWithAmount.gt(balance.get(networkAsset))
      ? networkAsset.ticker
      : undefined;
  };

  const getInsufficientTokenNameForRefundableDeposit = ({
    fromAmount,
  }: Required<SwapFormModel>) => {
    const totalFeesWithAmount = fromAmount.isAssetEquals(networkAsset)
      ? fromAmount.plus(totalFeesWithDeposit)
      : totalFeesWithDeposit;

    return totalFeesWithAmount.gt(balance.get(networkAsset))
      ? networkAsset.ticker
      : undefined;
  };

  const getInsufficientTokenNameForTx = ({
    fromAsset,
    fromAmount,
  }: SwapFormModel) => {
    if (fromAsset && fromAmount && fromAmount.gt(balance.get(fromAsset))) {
      return fromAsset.ticker;
    }
    return undefined;
  };

  const isAmountNotEntered = ({ toAmount, fromAmount }: SwapFormModel) => {
    if (
      (!fromAmount?.isPositive() && toAmount?.isPositive()) ||
      (!toAmount?.isPositive() && fromAmount?.isPositive())
    ) {
      return false;
    }

    return !fromAmount?.isPositive() || !toAmount?.isPositive();
  };

  const getMinValueForToken = ({
    toAmount,
    fromAmount,
    fromAsset,
    toAsset,
    pool,
  }: SwapFormModel): Currency | undefined => {
    if (
      !fromAmount?.isPositive() &&
      toAmount &&
      toAmount.isPositive() &&
      pool &&
      toAmount.gte(pool.getAssetAmount(toAmount.asset))
    ) {
      return undefined;
    }

    if (!fromAmount?.isPositive() && toAmount?.isPositive() && pool) {
      // TODO: FIX_ERGOLABS_SDK_COMPUTING
      return pool.calculateOutputAmount(new Currency(1n, fromAsset)).plus(1n);
    }
    if (!toAmount?.isPositive() && fromAmount?.isPositive() && pool) {
      return pool.calculateInputAmount(new Currency(1n, toAsset));
    }
    return undefined;
  };

  const isTokensNotSelected = ({ toAsset, fromAsset }: SwapFormModel) =>
    !toAsset || !fromAsset;

  const isSwapLocked = ({ toAsset, fromAsset }: SwapFormModel) =>
    (toAsset?.id === LOCKED_TOKEN_ID || fromAsset?.id === LOCKED_TOKEN_ID) &&
    DateTime.now().toUTC().toMillis() < END_TIMER_DATE.toMillis();

  const isPoolLoading = ({ fromAsset, toAsset, pool }: SwapFormModel) =>
    !!fromAsset && !!toAsset && !pool;

  const submitSwap = (value: Required<SwapFormModel>) => {
    swap(value)
      .pipe(first())
      .subscribe(() => resetForm());
    panalytics.submitSwap(value);
  };

  const resetForm = () =>
    form.patchValue(
      { fromAmount: undefined, toAmount: undefined },
      { emitEvent: 'silent' },
    );

  const handleMaxButtonClick = (balance: Currency) =>
    balance.asset.id === networkAsset.id
      ? balance.minus(totalFeesWithDeposit)
      : balance;

  const isLiquidityInsufficient = ({ toAmount, pool }: SwapFormModel) => {
    if (!toAmount?.isPositive() || !pool) {
      return false;
    }
    return toAmount?.gte(pool.getAssetAmount(toAmount?.asset));
  };

  useSubscription(
    zip([defaultTokenAssets$, tokenAssetsToImport$, importedTokenAssets$]).pipe(
      first(),
      map(([defaultTokenAssets, tokenAssetsToImport, importedTokenAssets]) => [
        ...defaultTokenAssets,
        ...tokenAssetsToImport,
        ...importedTokenAssets,
      ]),
    ),
    (assets) => {
      if (!form.value.fromAsset && !form.value.toAsset) {
        form.patchValue({
          fromAsset: findLast(assets, (a) => a.id === base) || networkAsset,
          toAsset: findLast(assets, (a) => a.id === quote),
        });
      }
    },
    [],
  );

  useSubscription(form.controls.fromAsset.valueChangesWithSilent$, (token) =>
    updateToAssets$.next(token?.id),
  );

  useSubscription(
    combineLatest([
      form.controls.fromAsset.valueChangesWithSilent$.pipe(
        distinctUntilChanged(),
      ),
      form.controls.toAsset.valueChangesWithSilent$.pipe(
        distinctUntilChanged(),
      ),
    ]).pipe(
      debounceTime(100),
      distinctUntilChanged(isAssetsPairEquals),
      switchMap(([fromAsset, toAsset]) =>
        getAvailablePools(fromAsset?.id, toAsset?.id),
      ),
    ),
    (pools) => {
      if (form.value.toAsset || form.value.fromAsset) {
        setSearchParams({
          quote: form.value.toAsset?.id,
          base: form.value.fromAsset?.id,
        });
      }
      if (!pools.length && form.value.toAsset && form.value.fromAsset) {
        form.patchValue(
          {
            pool: undefined,
            toAsset: undefined,
            toAmount:
              lastEditedField === 'to' ? form.value.toAmount : undefined,
            fromAmount:
              lastEditedField === 'from' ? form.value.fromAmount : undefined,
          },
          { emitEvent: 'silent' },
        );
        return;
      }

      let newPool: AmmPool | undefined;

      if (!form.value.pool && initialPoolId) {
        newPool =
          pools.find((p) => p.id === initialPoolId) ||
          maxBy(pools, (p) => p.x.amount * p.y.amount);
      } else {
        newPool =
          pools.find((p) => p.id === form.value.pool?.id) ||
          maxBy(pools, (p) => p.x.amount * p.y.amount);
      }

      form.patchValue({ pool: newPool });
    },
    [lastEditedField],
  );

  useSubscription(
    form.controls.fromAmount.valueChanges$.pipe(skip(1)),
    (value) => {
      setLastEditedField('from');

      if (form.value.pool && value) {
        form.controls.toAmount.patchValue(
          form.value.pool.calculateOutputAmount(value),
          { emitEvent: 'silent' },
        );
      } else {
        form.controls.toAmount.patchValue(undefined, { emitEvent: 'silent' });
      }
    },
  );

  useSubscription(
    form.controls.toAmount.valueChanges$.pipe(skip(1)),
    (value) => {
      setLastEditedField('to');

      if (form.value.pool && value) {
        form.controls.fromAmount.patchValue(
          form.value.pool.calculateInputAmount(value),
          { emitEvent: 'silent' },
        );
      } else {
        form.controls.fromAmount.patchValue(undefined, { emitEvent: 'silent' });
      }
    },
  );

  useSubscription(
    form.controls.pool.valueChanges$,
    () => {
      const { fromAmount, toAmount, fromAsset, toAsset, pool } = form.value;

      if (!pool) {
        return;
      }

      setSearchParams({
        base: fromAsset?.id,
        quote: toAsset?.id,
        initialPoolId: pool?.id,
      });

      if (lastEditedField === 'from' && fromAmount && fromAmount.isPositive()) {
        form.controls.toAmount.patchValue(
          pool.calculateOutputAmount(fromAmount),
          { emitEvent: 'silent' },
        );
      }
      if (lastEditedField === 'to' && toAmount && toAmount.isPositive()) {
        form.controls.fromAmount.patchValue(
          pool.calculateInputAmount(toAmount),
          { emitEvent: 'silent' },
        );
      }
    },
    [lastEditedField],
  );

  const switchAssets = () => {
    form.patchValue(
      {
        fromAsset: form.value.toAsset,
        toAsset: form.value.fromAsset,
        fromAmount: form.value.toAmount,
        toAmount: form.value.fromAmount,
      },
      { emitEvent: 'silent' },
    );
    setLastEditedField((prev) => (prev === 'from' ? 'to' : 'from'));
    panalytics.switchSwap();
  };

  const [pool] = useObservable(form.controls.pool.valueChangesWithSilent$);
  const [fromAsset] = useObservable(
    form.controls.fromAsset.valueChangesWithSilent$,
  );
  return (
    <ActionForm
      form={form}
      getInsufficientTokenNameForFee={getInsufficientTokenNameForFee}
      getInsufficientTokenNameForRefundableDeposit={
        getInsufficientTokenNameForRefundableDeposit
      }
      getInsufficientTokenNameForTx={getInsufficientTokenNameForTx}
      isLoading={isPoolLoading}
      getMinValueForToken={getMinValueForToken}
      isAmountNotEntered={isAmountNotEntered}
      isTokensNotSelected={isTokensNotSelected}
      isLiquidityInsufficient={isLiquidityInsufficient}
      isSwapLocked={isSwapLocked}
      action={submitSwap}
    >

      <Page
        className="w-[448px] !p-0"
        maxWidth={448}
        widgetBaseHeight={pool ? 432 : 272}
        leftWidget={
          selectedNetwork.name === 'ergo' && (
            <SwapGraph
              pool={pool}
              isReversed={reversedRatio}
              setReversed={setReversedRatio}
              fromAsset={fromAsset}
            />
          )
        }
        widgetOpened={leftWidgetOpened}
        onWidgetClose={() => setLeftWidgetOpened(false)}
      >
        <div className="p-[24px]">
          <CardHeader
            action={OperationSettings && <OperationSettings />}
            title="Swap"
            classes={{ title: '!font-bold !text-xl' }}
            className="!p-0 !text-white"
          />
          <div className="flex flex-col">
            <div className="mt-2 mb-1">
              <AssetControlFormItem
                label={'From'}
                loading={allAmmPoolsLoading}
                bordered
                maxButton
                handleMaxButtonClick={handleMaxButtonClick}
                assets$={defaultTokenAssets$}
                assetsToImport$={tokenAssetsToImport$}
                importedAssets$={importedTokenAssets$}
                amountName="fromAmount"
                tokenName="fromAsset"
              />
              <div className="flex flex-col">
                <div className="mt-2 mb-1">
                  <AssetControlFormItem
                    label={'From'}
                    loading={allAmmPoolsLoading}
                    bordered
                    maxButton
                    handleMaxButtonClick={handleMaxButtonClick}
                    assets$={defaultTokenAssets$}
                    assetsToImport$={tokenAssetsToImport$}
                    importedAssets$={importedTokenAssets$}
                    amountName="fromAmount"
                    tokenName="fromAsset"
                  />
                </div>
                <div className="mt-1 flex justify-center"><ImportExportIcon sx={{ border: "1px solid #A4A4A4", borderRadius: "15px", padding: "2px" }} /></div>
                <div className="mb-2">
                  <AssetControlFormItem
                    label={'To(estimated)'}
                    loading={allAmmPoolsLoading}
                    bordered
                    assets$={toAssets$}
                    assetsToImport$={toAssetsToImport$}
                    importedAssets$={toImportedAssets$}
                    amountName="toAmount"
                    tokenName="toAsset"
                  />
                </div>

                <div className="my-2">
                  {({ value, onChange }: { value: any; onChange: any }) => (
                    <Flex.Item marginTop={!!value ? 4 : 0}>
                      <PoolSelector value={value} onChange={onChange} />
                    </Flex.Item>
                  )}
                </div>
                <div className="my-2">
                  <ActionForm.Button analytics={{ location: 'swap' }}>
                    <Trans>Swap</Trans>
                  </ActionForm.Button>
                </div>
                <Form.Listener>
                  {({ value }) => (
                    <>
                      <div className="my-4">
                        <SwapInfo
                          value={value}
                          isReversed={reversedRatio}
                          setReversed={setReversedRatio}
                        />
                      </div>
                    </>
                  )}
                </Form.Listener>
              </div>
              <div className="flex flex-col">

                <div>
                  1 ADA = 0.31 iUSD
                </div>
                <Flex>
                  <span>dsv</span>
                  <span>gvubvuf</span>
                </Flex>

              </div>
            </div>
            <div className="mt-1 mb-2">
              <AssetControlFormItem
                label={'To'}
                loading={allAmmPoolsLoading}
                bordered
                assets$={toAssets$}
                assetsToImport$={toAssetsToImport$}
                importedAssets$={toImportedAssets$}
                amountName="toAmount"
                tokenName="toAsset"
              />
            </div>
            <div className="my-2">
              {({ value, onChange }: { value: any; onChange: any }) => (
                <Flex.Item marginTop={!!value ? 4 : 0}>
                  <PoolSelector value={value} onChange={onChange} />
                </Flex.Item>
              )}
            </div>
            <div className="my-2">
              <ActionForm.Button analytics={{ location: 'swap' }}>
                <Trans>Swap</Trans>
              </ActionForm.Button>
            </div>
            <Form.Listener>
              {({ value }) => (
                <>
                  <div className="my-4">
                    <SwapInfo
                      value={value}
                      isReversed={reversedRatio}
                      setReversed={setReversedRatio}
                    />
                  </div>
                </>
              )}
            </Form.Listener>
          </div>
        </div>
      </Page>
    </ActionForm>
  );
};
