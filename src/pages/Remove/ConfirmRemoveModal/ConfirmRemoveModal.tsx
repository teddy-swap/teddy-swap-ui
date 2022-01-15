import { minValueForOrder } from '@ergolabs/ergo-dex-sdk';
import { BoxSelection, DefaultBoxSelector } from '@ergolabs/ergo-sdk';
import React from 'react';

import { AmmPool } from '../../../common/models/AmmPool';
import { Currency } from '../../../common/models/Currency';
import { FormFeesSection } from '../../../components/common/FormView/FormFeesSection/FormFeesSection';
import { FormPairSection } from '../../../components/common/FormView/FormPairSection/FormPairSection';
import { ERG_DECIMALS, UI_FEE } from '../../../constants/erg';
import { useSettings } from '../../../context';
import { Box, Button, Flex, message, Modal } from '../../../ergodex-cdk';
import { useUTXOs } from '../../../hooks/useUTXOs';
import { explorer } from '../../../services/explorer';
import { useMinExFee, useMinTotalFees } from '../../../services/new/core';
import { poolActions } from '../../../services/poolActions';
import { submitTx } from '../../../services/yoroi';
import { makeTarget } from '../../../utils/ammMath';
import { parseUserInputToFractions } from '../../../utils/math';

interface ConfirmRemoveModalProps {
  onClose: (p: Promise<any>) => void;
  pool: AmmPool;
  lpToRemove: Currency;
  xAmount: Currency;
  yAmount: Currency;
}

const ConfirmRemoveModal: React.FC<ConfirmRemoveModalProps> = ({
  pool,
  lpToRemove,
  xAmount,
  yAmount,
  onClose,
}) => {
  const UTXOs = useUTXOs();
  const [{ minerFee, address, pk }] = useSettings();
  const minExFee = useMinExFee();
  const totalFees = useMinTotalFees();

  const uiFeeNErg = parseUserInputToFractions(UI_FEE, ERG_DECIMALS);
  const exFeeNErg = minExFee.amount;
  const minerFeeNErgs = parseUserInputToFractions(minerFee, ERG_DECIMALS);

  const removeOperation = async (pool: AmmPool) => {
    const actions = poolActions(pool['pool']);
    const lp = pool['pool'].lp.withAmount(lpToRemove.amount);

    const poolId = pool.id;

    try {
      const network = await explorer.getNetworkContext();

      const inputs = DefaultBoxSelector.select(
        UTXOs,
        makeTarget([lp], minValueForOrder(minerFeeNErgs, uiFeeNErg, exFeeNErg)),
      ) as BoxSelection;

      if (address && pk) {
        onClose(
          actions
            .redeem(
              {
                poolId,
                pk,
                lp,
                exFee: exFeeNErg,
                uiFee: uiFeeNErg,
              },
              {
                inputs,
                changeAddress: address,
                selfAddress: address,
                feeNErgs: minerFeeNErgs,
                network,
              },
            )
            .then((tx) => submitTx(tx)),
        );
      }
    } catch (err) {
      message.error('Network connection issue');
    }
  };

  return (
    <>
      <Modal.Title>Confirm Remove Liquidity</Modal.Title>
      <Modal.Content width={436}>
        <Box transparent>
          <Flex direction="col">
            <Flex.Item marginBottom={6}>
              <FormPairSection
                title="Pooled assets"
                xAmount={xAmount}
                yAmount={yAmount}
              />
            </Flex.Item>
            <Flex.Item marginBottom={6}>
              <FormFeesSection
                minerFee={minerFee}
                minExFee={minExFee}
                totalFees={totalFees}
              />
            </Flex.Item>
            <Flex.Item>
              <Button
                block
                type="primary"
                size="large"
                onClick={() => removeOperation(pool)}
              >
                Remove Liquidity
              </Button>
            </Flex.Item>
          </Flex>
        </Box>
      </Modal.Content>
    </>
  );
};

export { ConfirmRemoveModal };
