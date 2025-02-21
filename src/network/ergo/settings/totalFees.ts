import { MinBoxValue } from '@ergolabs/ergo-sdk';
import { combineLatest, map, publishReplay, refCount } from 'rxjs';

import { Currency } from '../../../common/models/Currency';
import { calculateTotalFee } from '../../../common/utils/calculateTotalFee';
import { networkAsset } from '../api/networkAsset/networkAsset';
import { maxExFee$, minExFee$ } from './executionFee';
import { minerFee$, useMinerFee } from './minerFee';

export const minTotalFee$ = combineLatest([minerFee$, minExFee$]).pipe(
  map(([minerFee]) => calculateTotalFee([minerFee], networkAsset)),
  publishReplay(1),
  refCount(),
);
export const maxTotalFee$ = combineLatest([minerFee$, maxExFee$]).pipe(
  map(([minerFee]) => calculateTotalFee([minerFee], networkAsset)),
  publishReplay(1),
  refCount(),
);

export const useMinTotalFee = (): Currency => {
  const minerFee = useMinerFee();

  return calculateTotalFee([minerFee], networkAsset);
};

export const useCreatePoolValidationFee = (): Currency => {
  const minerFee = useMinerFee();

  return calculateTotalFee([minerFee, minerFee, MinBoxValue], networkAsset);
};
