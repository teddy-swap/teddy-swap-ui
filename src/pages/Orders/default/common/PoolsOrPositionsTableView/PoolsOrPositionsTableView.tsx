import { Flex } from '@ergolabs/ui-kit';
// import { PoolOrPositionDetails } from '../PoolOrPositionDetails/PoolOrPositionDetails';
import { Button } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import React, { FC, PropsWithChildren, useState } from 'react';
import { ReactComponent as EmptyRobotIcon } from '../../../../../assets/icons/Robot.svg';
import { ReactComponent as ADA } from '../../../../../assets/icons/tokens/token-ada.svg';
import { ReactComponent as TEDY } from '../../../../../assets/icons/tokens/token-erdoge.svg';
import { AmmPool } from '../../../../../common/models/AmmPool';
import { Position } from '../../../../../common/models/Position';
import { ExpandComponentProps } from '../../../../../components/TableView/common/Expand';
import { DataTag } from '../../../../../components/common/DataTag/DataTag';
import PairColumn from '../../../common/Columns/PairColumn';
import { PoolOrPositionDetails } from '../PoolOrPositionDetails/PoolOrPositionDetails';

export interface PoolsOrPositionsTableViewProps<T extends AmmPool | Position> {
  readonly items: T[];
  readonly poolMapper: (item: T) => AmmPool;
  readonly expandComponent: FC<ExpandComponentProps<T>>;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    color: 'white',
    maxWidth: 611,
    padding: 15,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: '10px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#03466C', // Change the arrow color here
  },
}));

// eslint-disable-next-line react-hooks/rules-of-hooks

export const PoolsOrPositionsTableView: FC<
  PropsWithChildren<PoolsOrPositionsTableViewProps<any>>
> = ({ children, poolMapper, items, expandComponent }) => {
  const [empty, setEmpty] = useState<any>(false);

  const toggleButton = () => {
    setEmpty(true);
  };
  return (
    <>
      <TableContainer className="max-h-[440px] w-full">
        <Table stickyHeader aria-label="sticky table" className="pr-[25px]">
          <TableHead>
            <TableRow>
              <TableCell
                key="farm"
                align="left"
                className="w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
              >
                Pair
              </TableCell>
              <TableCell
                key="Total Stacked"
                align="left"
                className="w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
              >
                Action
              </TableCell>
              <TableCell
                className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
                key="Daily Emission"
                align="left"
              >
                Date & Time
              </TableCell>
              <TableCell
                key="fee"
                align="left"
                className="w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
              >
                Status
              </TableCell>
              <TableCell
                key="fee"
                align="left"
                className="w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
              >
                {null}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      {empty ? (
        <div className="max-h-[440px] w-full flex flex-col items-center justify-center py-10">
          <EmptyRobotIcon style={{ height: '150px' }} />
          <div className="mt-2">No orders found</div>
          <Button
            type="primary"
            size="large"
            // onClick={() => addLiquidityOperation()}
            style={{ width: '150px', marginTop: '8px' }}
          >
            <Trans>Swap</Trans>
          </Button>
        </div>
      ) : (
        <TableContainer className="max-h-[440px] w-full">
          {items.map((ammPool, idx) => {
            const getContentByIndex = (idx: number) => {
              const contentIndex = idx % 3;
              if (contentIndex === 0) {
                return 'Completed';
              } else if (contentIndex === 1) {
                return 'Pending';
              } else {
                return 'Canceled';
              }
            };
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
                        className="w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
                      >
                        <PairColumn
                          Icon={
                            idx % 2 === 0 ? (
                              <AddIcon
                                style={{
                                  borderRadius: '7px',
                                  backgroundColor: '#3D505A',
                                }}
                              />
                            ) : (
                              <ArrowDownwardIcon
                                style={{
                                  borderRadius: '7px',
                                  backgroundColor: '#3D505A',
                                }}
                              />
                            )
                          }
                        />
                      </TableCell>
                      <TableCell
                        key="action"
                        className="w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
                      >
                        {idx % 2 === 0 ? 'Swap' : 'Deposit'}
                      </TableCell>
                      <TableCell
                        className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
                        key="date"
                        align="left"
                      >
                        <div className="flex flex-col">
                          <span>January 3, 2023</span>
                          <span> 11:00 AM</span>
                        </div>
                      </TableCell>
                      <TableCell
                        className="!hidden lg:!table-cell w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
                        key="status"
                        align="left"
                      >
                        <div
                          className="border rounded-md !py-2 !px-4 w-full flex justify-center"
                          style={{ borderColor: '#606060' }}
                        >
                          {getContentByIndex(idx)}
                        </div>
                      </TableCell>
                      <TableCell
                        key="fee"
                        align="left"
                        className="w-[calc(100%/4)] lg:!w-[calc(100%/5)]"
                      >
                        <Flex>
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <div color="inherit" className="flex flex-col">
                                  <span>View on Explorer</span>
                                  <span>Copy Transaction ID</span>
                                </div>
                              </React.Fragment>
                            }
                          >
                            <div
                              className="border rounded-md"
                              style={{ borderColor: '#606060' }}
                              onClick={toggleButton}
                            >
                              <MoreHorizIcon />
                            </div>
                          </HtmlTooltip>
                        </Flex>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Accordion>
            );
          })}
        </TableContainer>
      )}
    </>
  );
};
