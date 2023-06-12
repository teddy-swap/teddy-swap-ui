import React, { FC } from 'react';
import { LiquidityLayoutProps } from '../common/types/LiquidityLayoutProps';
import { LiquidityState } from '../common/types/LiquidityState';
import { PoolsOverview } from './components/PoolsOverview/PoolsOverview';
import OrdersHeaderSection from './common/components/OrdersHeaderSection/OrdersHeaderSection';

export const OrdersDefaultLayout: FC<LiquidityLayoutProps> = ({
  ammPools,
  isAmmPoolsLoading,
  activeState,
}) => (
  <>
    <div className="lg:w-[944px] w-auto">
      <div className="flex">
        <div className="grid justify-items-end w-full">
          <OrdersHeaderSection/>
        </div>
      </div>

      {activeState === LiquidityState.POOLS_OVERVIEW && (
        <>
          <PoolsOverview ammPools={ammPools} loading={isAmmPoolsLoading} />
        </>
      )}
    </div>
  </>
);
