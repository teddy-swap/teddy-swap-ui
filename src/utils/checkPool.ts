import {
  AmmPool,
  NetworkAmmPoolValidation,
  ValidationResult,
} from 'ergo-dex-sdk';
import { explorer } from './explorer';

export const checkPool = async (pool: AmmPool): Promise<ValidationResult> => {
  return new NetworkAmmPoolValidation(explorer).validate(pool);
};
