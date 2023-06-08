import { Flex } from '@ergolabs/ui-kit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography as MatTypography,
} from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';
import { AmmPool } from '../../../../../common/models/AmmPool';
import { Position } from '../../../../../common/models/Position';
import { ExpandComponentProps } from '../../../../../components/TableView/common/Expand';
import { DataTag } from '../../../../../components/common/DataTag/DataTag';
import AprColumn from '../../../common/columns/PoolsOrPositionsColumns/columns/AprColumn/AprColumn';
import { FarmColumn } from '../../../common/columns/PoolsOrPositionsColumns/columns/FarmColumn/FarmColumn';
import { PoolOrPositionDetails } from '../PoolOrPositionDetails/PoolOrPositionDetails';

// import { PoolOrPositionDetails } from '../PoolOrPositionDetails/PoolOrPositionDetails';

export interface PoolsOrPositionsTableViewProps<T extends AmmPool | Position> {
  readonly items: T[];
  readonly poolMapper: (item: T) => AmmPool;
  readonly expandComponent: FC<ExpandComponentProps<T>>;
}

export const PoolsOrPositionsTableView: FC<
  PropsWithChildren<PoolsOrPositionsTableViewProps<any>>
> = ({ children, poolMapper, items, expandComponent }) => (
  <>
    <TableContainer className="max-h-[440px] w-full">
      <Table stickyHeader aria-label="sticky table" className="pr-[25px]">
        <TableHead>
          <TableRow>
            <TableCell
              key="farm"
              align="left"
              className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
            >
              Pair
            </TableCell>
            <TableCell
              key="Total Stacked"
              align="left"
              className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
            >
              Action
            </TableCell>
            <TableCell
              className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
              key="Daily Emission"
              align="left"
            >
              Date & Time
            </TableCell>
            <TableCell
              key="fee"
              align="left"
              className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
            >
              Status
            </TableCell>
            <TableCell
              key="fee"
              align="left"
              className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
            >
              {null}
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>

    <TableContainer className="max-h-[440px] w-full">
      {items.map((ammPool, idx) => {
        return (
          <Accordion
            sx={{
              width: '100%',
              background: 'none',
              border: 'none',
              borderColor: 'transparent',
              boxShadow: 'none',
              borderImage: 'none',
              '&::before': {
                display: 'none',
              },
            }}
            key={idx}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    key="farm"
                    align="left"
                    className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                  >
                    {/* <FarmColumn ammPool={poolMapper(ammPool)} /> */}
                    <div className="flex flex-col">
                      <div className="flex">
                        <span>ADA</span>
                        <span className="ml-2">86.0</span>
                      </div>
                      <div className="flex">
                        <span>TEDY</span>
                        <span className="ml-2">356.24</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    key="tvl"
                    className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                  >
                    Swap
                  </TableCell>
                  <TableCell
                    className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                    key="volumeH24"
                    align="left"
                  >
                    January 3, 2023 11:00 AM
                  </TableCell>
                  <TableCell
                    className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                    key="volumeD7"
                    align="left"
                  >
                    Complete
                  </TableCell>
                  <TableCell
                    key="fee"
                    align="left"
                    className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                  >
                    <Flex>
                      {/* <Chip label={`${poolMapper(ammPool).poolFee}%`} /> */}
                      <MoreHorizIcon />
                    </Flex>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Accordion>
        );
      })}
    </TableContainer>
  </>
);
