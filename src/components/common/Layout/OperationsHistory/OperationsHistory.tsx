import {
  HistoryOutlined,
  LoadingOutlined,
  Modal,
  Tooltip,
} from '@ergolabs/ui-kit';
import { t } from '@lingui/macro';
import { Button as MatButton, Tooltip as MatTooltip } from '@mui/material';
import React, { FC } from 'react';

import { useObservable } from '../../../../common/hooks/useObservable';
import { pendingOperations$ } from '../../../../gateway/api/pendingOperations';
import { isOperationsSyncing$ } from '../../../../gateway/api/transactionsHistory';
import { useSelectedNetwork } from '../../../../gateway/common/network';
import { OperationHistoryModal } from '../../../OperationHistoryModal/OperationHistoryModal';

export const OperationsHistory: FC = () => {
  const [isOperationsSyncing] = useObservable(isOperationsSyncing$);
  const [pendingOperations, pendingLoading] = useObservable(pendingOperations$);
  const [selectedNetwork] = useSelectedNetwork();

  const openOperationsHistoryModal = () => {
    Modal.open(({ close }) => (
      <OperationHistoryModal
        showDateTime={selectedNetwork.name === 'ergo'}
        close={close}
      />
    ));
  };

  const showSyncingLabel =
    isOperationsSyncing && !pendingOperations?.length && !pendingLoading;
  const showLoader =
    isOperationsSyncing || !!pendingOperations?.length || pendingLoading;

  return (
    <MatTooltip
      title={
        showSyncingLabel
          ? t`Synchronizing transaction history. The first time it may take a little longer.`
          : t`Recent transactions`
      }
      placement="bottom"
    >
      <MatButton
        variant="outlined"
        className="!text-white !px-0 !border !border-gray-300 !border-slate-600 hover:!bg-white/10 !rounded-md !min-w-[42px] !min-h-[42px]"
        classes={{ startIcon: '!m-0' }}
        sx={{ border: '1px solid' }}
        onClick={openOperationsHistoryModal}
        startIcon={
          showLoader ? (
            <LoadingOutlined className="!w-5 h-5" />
          ) : (
            <HistoryOutlined className="!w-5 h-5" />
          )
        }
      />
    </MatTooltip>
  );
};
