import { Tabs } from '@ergolabs/ui-kit';
import SearchIcon from '@mui/icons-material/Search';
import {
  InputAdornment,
  Tab as MatTab,
  Tabs as MatTabs,
  TextField,
} from '@mui/material';
import React, { FC } from 'react';

import { LiquidityTitleExtra } from '../common/components/LiquidityTitleExtra/LiquidityTitleExtra';
import { LiquidityLayoutProps } from '../common/types/LiquidityLayoutProps';
import {
  LiquidityState,
  LiquidityStateCaptions,
} from '../common/types/LiquidityState';
import { PoolsOverview } from './components/PoolsOverview/PoolsOverview';
import { YourPositions } from './components/YourPositions/YourPositions';

export const LiquidityDefaultLayout: FC<LiquidityLayoutProps> = ({
  ammPools,
  isAmmPoolsLoading,
  term,
  handleSearchTerm,
  filters,
  setFilters,
  activeState,
  setActiveState,
  positions,
  isPositionsEmpty,
  isPositionsLoading,
  positionsWithLocks,
  showLockedPositions,
}) => (
  <>
    <div className="flex">
      <MatTabs
        className="w-full"
        value={activeState}
        onChange={(e, v) => {
          setActiveState(v);
        }}
      >
        <MatTab
          label={LiquidityStateCaptions[LiquidityState.POOLS_OVERVIEW]}
          value={LiquidityState.POOLS_OVERVIEW}
        />
        <MatTab
          label={LiquidityStateCaptions[LiquidityState.YOUR_POSITIONS]}
          value={LiquidityState.YOUR_POSITIONS}
        />
      </MatTabs>
      <div className="grid justify-items-end w-full">
        <LiquidityTitleExtra />
        {/* <LiquidityFilter value={filters} onChange={setFilters} /> */}
      </div>
    </div>
    <div className="mt-4">
      <TextField
        className="w-full rounded-md"
        label="Type token name or pool id"
        variant="outlined"
        autoFocus={false}
        onChange={handleSearchTerm}
        value={term}
        sx={{
          '& input': {
            height: 55,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
    {activeState === LiquidityState.POOLS_OVERVIEW && (
      <>
        <PoolsOverview ammPools={ammPools} loading={isAmmPoolsLoading} />
      </>
    )}
    {activeState === LiquidityState.YOUR_POSITIONS && (
      <>
        <YourPositions
          positions={positions}
          isPositionsEmpty={isPositionsEmpty}
          isPositionsLoading={isPositionsLoading}
        />
      </>
    )}
  </>
);
