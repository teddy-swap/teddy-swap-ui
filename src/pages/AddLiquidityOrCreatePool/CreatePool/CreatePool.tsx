import { AssetInfo } from '@ergolabs/ergo-sdk/build/main/entities/assetInfo';
import React, { FC, useEffect, useState } from 'react';
import { skip } from 'rxjs';

import { useAssetsBalance } from '../../../api/assetBalance';
import { useSubscription } from '../../../common/hooks/useObservable';
import { Currency } from '../../../common/models/Currency';
import { Ratio } from '../../../common/models/Ratio';
import { TokenControlFormItem } from '../../../components/common/TokenControl/TokenControl';
import {
  openConfirmationModal,
  Operation,
} from '../../../components/ConfirmationModal/ConfirmationModal';
import {
  OperationForm,
  OperationValidator,
} from '../../../components/OperationForm/OperationForm';
import { RatioBox } from '../../../components/RatioBox/RatioBox';
import { Section } from '../../../components/Section/Section';
import { Flex, Form, FormGroup, useForm } from '../../../ergodex-cdk';
import { useMaxTotalFees, useNetworkAsset } from '../../../services/new/core';
import { CreatePoolConfirmationModal } from './CreatePoolConfirmationModal/CreatePoolConfirmationModal';
import { CreatePoolFormModel } from './CreatePoolFormModel';
import { FeeSelector } from './FeeSelector/FeeSelector';
import { InitialPriceInput } from './InitialPrice/InitialPriceInput';

export interface CreatePoolProps {
  readonly xAsset?: AssetInfo;
  readonly yAsset?: AssetInfo;
}

export const CreatePool: FC<CreatePoolProps> = ({ xAsset, yAsset }) => {
  const [lastEditedField, setLastEditedField] = useState<'x' | 'y'>('x');
  const [balance] = useAssetsBalance();
  const networkAsset = useNetworkAsset();
  const totalFees = useMaxTotalFees();
  const form = useForm<CreatePoolFormModel>({
    initialPrice: undefined,
    x: undefined,
    xAsset,
    yAsset,
    y: undefined,
    fee: undefined,
  });

  useEffect(() => {
    if (xAsset?.id !== form.value.xAsset?.id) {
      form.patchValue(
        { xAsset, x: undefined, y: undefined },
        { emitEvent: 'silent' },
      );
    }
  }, [xAsset?.id]);

  useEffect(() => {
    if (yAsset?.id !== form.value.yAsset?.id) {
      form.patchValue(
        { yAsset, x: undefined, y: undefined },
        { emitEvent: 'silent' },
      );
    }
  }, [yAsset?.id]);

  const getMainRatio = (ratio: Ratio, xAsset: AssetInfo) =>
    ratio.baseAsset.id === xAsset.id ? ratio : ratio.invertRatio();

  const getOppositeRatio = (ratio: Ratio, yAsset: AssetInfo) =>
    ratio.baseAsset.id === yAsset.id ? ratio : ratio.invertRatio();

  const handleXChange = (x: Currency | undefined) => {
    if (lastEditedField !== 'x') {
      setLastEditedField('x');
    }

    const { initialPrice } = form.value;

    if (!x) {
      form.patchValue({ y: undefined }, { emitEvent: 'silent' });
      return;
    }
    if (!initialPrice) {
      form.patchValue({ y: undefined }, { emitEvent: 'silent' });
      return;
    }

    const ratio: Ratio =
      initialPrice.quoteAsset.id === x?.asset.id
        ? initialPrice
        : initialPrice.invertRatio();

    form.patchValue(
      {
        y: ratio.toBaseCurrency(x),
      },
      { emitEvent: 'silent' },
    );
  };

  const handleYChange = (y: Currency | undefined) => {
    if (lastEditedField !== 'y') {
      setLastEditedField('y');
    }

    const { initialPrice } = form.value;

    if (!y) {
      form.patchValue({ x: undefined }, { emitEvent: 'silent' });
      return;
    }
    if (!initialPrice) {
      form.patchValue({ x: undefined }, { emitEvent: 'silent' });
      return;
    }

    const ratio: Ratio =
      initialPrice.quoteAsset.id === y?.asset.id
        ? initialPrice
        : initialPrice.invertRatio();

    form.patchValue(
      {
        x: ratio.toBaseCurrency(y),
      },
      { emitEvent: 'silent' },
    );
  };

  const selectTokenValidator: OperationValidator<CreatePoolFormModel> = ({
    value: { xAsset, yAsset },
  }) => (!xAsset || !yAsset ? 'Select a token' : undefined);

  const feeValidator: OperationValidator<CreatePoolFormModel> = ({
    value: { fee },
  }) => !fee && 'Select a fee tier';

  const initialPriceValidator: OperationValidator<CreatePoolFormModel> = ({
    value: { initialPrice },
  }) => !initialPrice?.isPositive() && 'Enter an Initial Price';

  const amountValidator: OperationValidator<CreatePoolFormModel> = ({
    value: { x, y },
  }) => {
    if (
      (!x?.isPositive() && y?.isPositive()) ||
      (!y?.isPositive() && x?.isPositive())
    ) {
      return undefined;
    }

    return (!x?.isPositive() || !y?.isPositive()) && 'Enter an Amount';
  };

  const minValueValidator: OperationValidator<CreatePoolFormModel> = ({
    value: { x, y, initialPrice, xAsset, yAsset },
  }): string | undefined => {
    let c: Currency | undefined;

    if (!x?.isPositive() && y?.isPositive() && initialPrice && xAsset) {
      c =
        initialPrice.quoteAsset.id === xAsset.id
          ? initialPrice.toBaseCurrency(new Currency(1n, xAsset))
          : initialPrice.toQuoteCurrency(new Currency(1n, xAsset));
    }
    if (!y?.isPositive() && x?.isPositive() && initialPrice && yAsset) {
      c =
        initialPrice.quoteAsset.id === yAsset.id
          ? initialPrice.toBaseCurrency(new Currency(1n, yAsset))
          : initialPrice.toQuoteCurrency(new Currency(1n, yAsset));
    }
    return c ? `Min value for ${c?.asset.name} is ${c?.toString()}` : undefined;
  };

  const balanceValidator: OperationValidator<CreatePoolFormModel> = ({
    value: { x, y },
  }) => {
    if (x?.gt(balance.get(x?.asset))) {
      return `Insufficient ${x?.asset.name} Balance`;
    }

    if (y?.gt(balance.get(y?.asset))) {
      return `Insufficient ${y?.asset.name} Balance`;
    }

    return undefined;
  };

  const insufficientFeeValidator: OperationValidator<CreatePoolFormModel> = ({
    value: { x, y },
  }) => {
    let totalFeesWithAmount = x?.isAssetEquals(networkAsset)
      ? x?.plus(totalFees)
      : totalFees;

    totalFeesWithAmount = y?.isAssetEquals(networkAsset)
      ? totalFeesWithAmount.plus(y)
      : totalFees;

    return totalFeesWithAmount.gt(balance.get(networkAsset))
      ? `Insufficient ${networkAsset.name} Balance for Fees`
      : undefined;
  };

  const validators: OperationValidator<CreatePoolFormModel>[] = [
    selectTokenValidator,
    feeValidator,
    initialPriceValidator,
    amountValidator,
    minValueValidator,
    balanceValidator,
    insufficientFeeValidator,
  ];

  useSubscription(form.controls.x.valueChanges$.pipe(skip(1)), handleXChange, [
    lastEditedField,
  ]);

  useSubscription(form.controls.y.valueChanges$.pipe(skip(1)), handleYChange, [
    lastEditedField,
  ]);

  useSubscription(
    form.controls.initialPrice.valueChanges$.pipe(skip(1)),
    () => {
      const { y, x } = form.value;

      if (!y && !x) {
        return;
      }
      if (lastEditedField === 'x') {
        handleXChange(x);
      } else {
        handleYChange(y);
      }
    },
    [lastEditedField],
  );

  const resetForm = () =>
    form.patchValue(
      {
        x: undefined,
        y: undefined,
      },
      { emitEvent: 'silent' },
    );

  const createPoolAction = ({ value }: FormGroup<CreatePoolFormModel>) => {
    openConfirmationModal(
      (next) => {
        return (
          <CreatePoolConfirmationModal
            value={value as Required<CreatePoolFormModel>}
            onClose={(request: Promise<any>) =>
              next(
                request.then((tx) => {
                  resetForm();
                  return tx;
                }),
              )
            }
          />
        );
      },
      Operation.ADD_LIQUIDITY,
      {
        xAsset: value.x,
        yAsset: value.y,
      },
    );
  };

  return (
    <OperationForm
      form={form}
      onSubmit={createPoolAction}
      actionCaption="Create pool"
      validators={validators}
    >
      <Flex col>
        <Flex.Item marginBottom={4}>
          <Section title="Choose a fee" tooltip="test">
            <Form.Item name="fee">
              {({ value, onChange }) => (
                <FeeSelector value={value} onChange={onChange} />
              )}
            </Form.Item>
          </Section>
        </Flex.Item>
        <Flex.Item marginBottom={4}>
          <Section title="Set initial price" tooltip="test">
            <Form.Item name="initialPrice" watchForm>
              {({ value, onChange, parent }) => (
                <InitialPriceInput
                  xAsset={parent.value.xAsset}
                  yAsset={parent.value.yAsset}
                  onChange={onChange}
                  value={value}
                />
              )}
            </Form.Item>
          </Section>
        </Flex.Item>
        <Flex.Item marginBottom={4}>
          <Section title="Liquidity">
            <Flex col>
              <Flex.Item marginBottom={1}>
                <TokenControlFormItem
                  tokenName="xAsset"
                  amountName="x"
                  readonly="asset"
                />
              </Flex.Item>
              <TokenControlFormItem
                tokenName="yAsset"
                amountName="y"
                readonly="asset"
              />
            </Flex>
          </Section>
        </Flex.Item>
        <Form.Listener>
          {({ value }) =>
            value.xAsset &&
            value.yAsset && (
              <Flex.Item justify="center">
                <Flex.Item flex={1} marginRight={2}>
                  <RatioBox
                    mainAsset={value.xAsset}
                    oppositeAsset={value.yAsset}
                    ratio={
                      value.initialPrice
                        ? getMainRatio(value.initialPrice, value.xAsset)
                        : undefined
                    }
                  />
                </Flex.Item>
                <Flex.Item flex={1}>
                  <RatioBox
                    mainAsset={value.yAsset}
                    oppositeAsset={value.xAsset}
                    ratio={
                      value.initialPrice
                        ? getOppositeRatio(value.initialPrice, value.yAsset)
                        : undefined
                    }
                  />
                </Flex.Item>
              </Flex.Item>
            )
          }
        </Form.Listener>
      </Flex>
    </OperationForm>
  );
};
