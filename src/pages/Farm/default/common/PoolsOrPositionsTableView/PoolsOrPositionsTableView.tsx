import { Flex } from '@ergolabs/ui-kit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
              Farm
            </TableCell>
            <TableCell
              key="Total Stacked"
              align="left"
              className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
            >
              Total Stacked
            </TableCell>
            <TableCell
              className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
              key="% of Emissions"
              align="left"
            >
              % of Emissions
            </TableCell>
            <TableCell
              className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
              key="Daily Emission"
              align="left"
            >
              Daily Emission
            </TableCell>
            <TableCell
              key="fee"
              align="left"
              className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
            >
              Your Stake
            </TableCell>
            <TableCell
              key="apr"
              align="left"
              className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
            >
              APR
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
    {items.length <= 0 && (
      <TableContainer className="max-h-[440px] w-full">
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
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            className="!px-0"
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    key="farm"
                    align="left"
                    className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                  >
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell
                    key="Total Stacked"
                    align="left"
                    className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                  >
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell
                    className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                    key="% of Emissions"
                    align="left"
                  >
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell
                    className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                    key="Daily Emission"
                    align="left"
                  >
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell
                    key="Your Stake"
                    align="left"
                    className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                  >
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell
                    key="apr"
                    align="left"
                    className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                  >
                    <Skeleton variant="rectangular" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {children}
          </AccordionSummary>
          <AccordionDetails>
            <MatTypography className="text-white">
              <Skeleton variant="rectangular" />
            </MatTypography>
          </AccordionDetails>
        </Accordion>
      </TableContainer>
    )}
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
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              className="!px-0"
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      key="farm"
                      align="left"
                      className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                    >
                      <FarmColumn ammPool={poolMapper(ammPool)} />
                    </TableCell>
                    <TableCell
                      key="tvl"
                      className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                    >
                      3,873,800,430 LP
                    </TableCell>
                    <TableCell
                      className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                      key="volumeH24"
                      align="left"
                    >
                      68.2%
                    </TableCell>
                    <TableCell
                      className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                      key="volumeD7"
                      align="left"
                    >
                      8,230,456 TEDY
                    </TableCell>
                    <TableCell
                      key="fee"
                      align="left"
                      className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                    >
                      <Flex>
                        {/* <Chip label={`${poolMapper(ammPool).poolFee}%`} /> */}
                        12,367 LP
                      </Flex>
                    </TableCell>
                    <TableCell
                      key="apr"
                      align="left"
                      className="w-[calc(100%/4)] lg:!w-[calc(100%/6)]"
                    >
                      <AprColumn
                        ammPool={poolMapper(ammPool)}
                        assetX={{
                          id: '',
                          name: undefined,
                          decimals: undefined,
                          description: undefined,
                        }}
                        assetY={{
                          id: '',
                          name: undefined,
                          decimals: undefined,
                          description: undefined,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionSummary>
            <AccordionDetails>
              <PoolOrPositionDetails
                item={ammPool}
                poolMapper={poolMapper}
                index={idx}
                collapse={() => {}}
                expandContentHeight={0}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </TableContainer>
  </>
);
