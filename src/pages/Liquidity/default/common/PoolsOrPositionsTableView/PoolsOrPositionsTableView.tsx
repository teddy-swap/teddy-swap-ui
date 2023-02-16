import { Flex } from '@ergolabs/ui-kit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { DataTag } from '../../../../../components/common/DataTag/DataTag';
import { ExpandComponentProps } from '../../../../../components/TableView/common/Expand';
import { AprColumn } from '../../../common/columns/PoolsOrPositionsColumns/columns/AprColumn/AprColumn';
import { PairColumn } from '../../../common/columns/PoolsOrPositionsColumns/columns/PairColumn/PairColumn';
import { TvlOrVolume24Column } from '../../../common/columns/PoolsOrPositionsColumns/columns/TvlOrVolume24Column/TvlOrVolume24Column';
import { PoolOrPositionDetails } from '../PoolOrPositionDetails/PoolOrPositionDetails';

export interface PoolsOrPositionsTableViewProps<T extends AmmPool | Position> {
  readonly items: T[];
  readonly poolMapper: (item: T) => AmmPool;
  readonly expandComponent: FC<ExpandComponentProps<T>>;
}

export const PoolsOrPositionsTableView: FC<
  PropsWithChildren<PoolsOrPositionsTableViewProps<any>>
> = ({ children, poolMapper, items, expandComponent }) => (
  <>
    <TableContainer className="max-h-[440px] min-w-[944px]">
      <Table stickyHeader aria-label="sticky table" className="pr-[25px]">
        <TableHead>
          <TableRow>
            <TableCell key="pair" align="left" sx={{ minWidth: '230px' }}>
              Pair
            </TableCell>
            <TableCell key="tvl" align="left" sx={{ minWidth: '100px' }}>
              TVL
            </TableCell>
            <TableCell key="volumeH24" align="left" sx={{ minWidth: '100px' }}>
              Volume 24H
            </TableCell>
            <TableCell key="volumeD7" align="left" sx={{ minWidth: '100px' }}>
              Volume 7D
            </TableCell>
            <TableCell key="fee" align="left" sx={{ minWidth: '100px' }}>
              Fee
            </TableCell>
            <TableCell key="apr" align="left" sx={{ minWidth: '100px' }}>
              APR
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
    {items.length <= 0 && (
      <TableContainer className="max-h-[440px] min-w-[944px]">
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
                  <TableCell key="pair" align="left" sx={{ minWidth: '230px' }}>
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell key="tvl" align="left" sx={{ minWidth: '100px' }}>
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell
                    key="volumeH24"
                    align="left"
                    sx={{ minWidth: '100px' }}
                  >
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell
                    key="volumeD7"
                    align="left"
                    sx={{ minWidth: '100px' }}
                  >
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell key="fee" align="left" sx={{ minWidth: '100px' }}>
                    <Skeleton variant="rectangular" />
                  </TableCell>
                  <TableCell key="apr" align="left" sx={{ minWidth: '100px' }}>
                    <Skeleton variant="rectangular" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionSummary>
          <AccordionDetails>
            <MatTypography className="text-white">
              <Skeleton variant="rectangular" />
            </MatTypography>
          </AccordionDetails>
        </Accordion>
      </TableContainer>
    )}
    <TableContainer className="max-h-[440px] min-w-[944px]">
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
                      key="pair"
                      align="left"
                      sx={{ minWidth: '230px' }}
                    >
                      <PairColumn ammPool={poolMapper(ammPool)} />
                    </TableCell>
                    <TableCell
                      key="tvl"
                      align="left"
                      sx={{ minWidth: '100px' }}
                    >
                      <TvlOrVolume24Column usd={poolMapper(ammPool).tvl} />
                    </TableCell>
                    <TableCell
                      key="volumeH24"
                      align="left"
                      sx={{ minWidth: '100px' }}
                    >
                      <TvlOrVolume24Column usd={poolMapper(ammPool).tvl} />
                    </TableCell>
                    <TableCell
                      key="volumeD7"
                      align="left"
                      sx={{ minWidth: '100px' }}
                    >
                      <TvlOrVolume24Column usd={poolMapper(ammPool).tvl} />
                    </TableCell>
                    <TableCell
                      key="fee"
                      align="left"
                      sx={{ minWidth: '100px' }}
                    >
                      <Flex>
                        <DataTag content={`${ammPool.poolFee}%`} />
                      </Flex>
                    </TableCell>
                    <TableCell
                      key="apr"
                      align="left"
                      sx={{ minWidth: '100px' }}
                    >
                      <AprColumn ammPool={poolMapper(ammPool)} />
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
    {/* <TableView
      items={items}
      itemKey="id"
      itemHeight={80}
      maxHeight={376}
      gap={1}
      tableHeaderPadding={[0, 6]}
      tableItemViewPadding={[0, 4]}
      expand={{ height: 96, accordion: true, component: expandComponent }}
    >
      <TableView.Column
        width={311}
        headerWidth={303}
        title={<Trans>Pair</Trans>}
      >
        {(ammPool) => <PairColumn ammPool={poolMapper(ammPool)} />}
      </TableView.Column>
      <TableView.Column width={158} title={<Trans>TVL</Trans>}>
        {(ammPool) => <TvlOrVolume24Column usd={poolMapper(ammPool).tvl} />}
      </TableView.Column>
      <TableView.Column width={200} title={<Trans>Volume 24H</Trans>}>
        {(ammPool) => <TvlOrVolume24Column usd={poolMapper(ammPool).volume} />}
      </TableView.Column>
      <TableView.Column width={200} title={<Trans>Volume 7D</Trans>}>
        {(ammPool) => <TvlOrVolume24Column usd={poolMapper(ammPool).volume} />}
      </TableView.Column>
      <TableView.Column width={200} title={<Trans>Fee</Trans>}>
        {(ammPool) => (
          <Flex>
            <DataTag content={`${ammPool.poolFee}%`} />
          </Flex>
        )}
      </TableView.Column>
      <TableView.Column
        width={158}
        title={
          <InfoTooltip
            width={300}
            placement="top"
            content={
              <>
                <Trans>
                  Annual Percentage Rate. Average estimation of how much you may
                  potentially earn providing liquidity to this pool.
                </Trans>
                <br />
                <Typography.Link
                  target="_blank"
                  href="https://docs.spectrum.fi/docs/protocol-overview/analytics#apr"
                >
                  <Trans>Read more</Trans>
                </Typography.Link>
              </>
            }
          >
            <Trans>APR</Trans>
          </InfoTooltip>
        }
      >
        {(ammPool: AmmPool) => <AprColumn ammPool={poolMapper(ammPool)} />}
      </TableView.Column>
      {children}
      <TableView.State name="search" condition={!items.length}>
        <LiquiditySearchState />
      </TableView.State>
    </TableView> */}
  </>
);
