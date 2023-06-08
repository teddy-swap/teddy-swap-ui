import { Flex, Typography } from '@ergolabs/ui-kit';
import { Button } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
// import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';
import { AssetInfo } from '../../common/models/AssetInfo';
import { AssetIconPair } from '../AssetIconPair/AssetIconPair';
import { Truncate } from '../Truncate/Truncate';
import { ReactComponent as TickMarkIcon } from './TickMark.svg';

// import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} 
  placement="top"
  arrow
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#03466C',
    color: 'white',
    maxWidth: 611,
    padding: 15,
    fontSize: theme.typography.pxToRem(12),
    borderRadius:"15px"
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#03466C', // Change the arrow color here
  },
}));

export interface TokenTitleProps {
  readonly assetX: AssetInfo;
  readonly assetY: AssetInfo;
  readonly size?: 'large' | 'small';
  readonly level?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 'body'
    | 'body-secondary'
    | 'body-strong'
    | undefined;
  readonly bodySize?: 'large';
  readonly gap?: number;
}

export const AssetPairTitle: FC<TokenTitleProps> = ({
  assetX,
  assetY,
  size,
  level = 5,
  gap = 1,
  bodySize,
}) => (
  <Flex align="center">
    <Flex.Item marginRight={gap}>
      <AssetIconPair size={size} assetX={assetX} assetY={assetY} />
    </Flex.Item>
    {level === 'body' ||
    level === 'body-secondary' ||
    level === 'body-strong' ? (
      <>
        <Typography.Body
          secondary={level === 'body-secondary'}
          size={bodySize}
          strong={level === 'body-strong'}
        >
          <Truncate>{assetX.ticker || assetX.name}</Truncate> /{' '}
          <Truncate>{assetY.ticker || assetY.name}</Truncate>
        </Typography.Body>
        <div>
          <TickMarkIcon />
        </div>
      </>
    ) : (
      <>
        <HtmlTooltip
          title={
            <React.Fragment>
              <div color="inherit" className="flex flex-col items-center">
                <span>Policy ID:</span>
                <span>b34b3ea80060ace9427bda98690a73d</span>
                <span>33840e27aaa8d6edb7f0c757a</span>
                <span
                  style={{
                    padding: '10px',
                  }}
                >
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      backgroundColor: '#198FA3',
                      borderRadius: '5px',
                    }}
                  >
                    <Trans>Token Info</Trans>
                  </Button>
                </span>
              </div>
            </React.Fragment>
          }
        >
          <Typography.Title level={level}>
            <Truncate>{assetX.ticker || assetX.name}</Truncate> /{' '}
            <Truncate>{assetY.ticker || assetY.name}</Truncate>
          </Typography.Title>
          {/* </MatTooltip> */}
        </HtmlTooltip>

        <div>
          <TickMarkIcon />
        </div>
      </>
    )}
  </Flex>
);
