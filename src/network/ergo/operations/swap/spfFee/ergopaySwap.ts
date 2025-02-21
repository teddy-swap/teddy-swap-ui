import {
  from as fromPromise,
  map,
  Observable,
  switchMap,
  tap,
  timeout,
} from 'rxjs';

import { applicationConfig } from '../../../../../applicationConfig';
import { Currency } from '../../../../../common/models/Currency';
import { captureOperationError } from '../../../../../common/services/ErrorLogs';
import { TxId } from '../../../../../common/types';
import { ErgoAmmPool } from '../../../api/ammPools/ErgoAmmPool';
import { ergoPayMessageManager } from '../../common/ergopayMessageManager';
import { ergoPaySpfFeePoolActions } from '../../common/nativeFeePoolActions';
import { submitErgopayTx } from '../../common/submitErgopayTx';
import { createSwapTxData } from './createSwapTxData';

export const ergoPaySwap = (
  pool: ErgoAmmPool,
  from: Currency,
  to: Currency,
): Observable<TxId> =>
  createSwapTxData(pool, from, to).pipe(
    switchMap(([swapParams, txContext, additionalData]) =>
      fromPromise(
        ergoPaySpfFeePoolActions(pool.pool).swap(swapParams, txContext),
      ).pipe(map((txRequest) => ({ txRequest, additionalData }))),
    ),
    switchMap(({ txRequest, additionalData }) =>
      submitErgopayTx(txRequest, {
        p2pkaddress: additionalData.p2pkaddress,
        message: ergoPayMessageManager.swap({
          from,
          to,
          feeMin: additionalData.minTotalFee,
          feeMax: additionalData.maxTotalFee,
        }),
      }),
    ),
    timeout(applicationConfig.operationTimeoutTime),
    tap({
      error: (error) =>
        captureOperationError(error, 'ergo', 'Spf ergopay swap'),
    }),
  );
