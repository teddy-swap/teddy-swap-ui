import { AssetInfo } from '@ergolabs/ergo-sdk';
import { Flex } from '@ergolabs/ui-kit';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';
import { AmmPool } from '../../../../../../../common/models/AmmPool';
import { AssetIconPair } from '../../../../../../../components/AssetIconPair/AssetIconPair';
import { AssetPairTitle } from '../../../../../../../components/AssetPairTitle/AssetPairTitle';
import { Button } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';

export interface AprColumn {
  readonly ammPool: AmmPool;
  readonly assetX: AssetInfo;
  readonly assetY: AssetInfo;
  readonly size?: 'large' | 'small';
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top" arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#03466C',
    color: 'white',
    maxWidth: 611,
    padding: 15,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: '15px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#03466C', // Change the arrow color here
  },
}));

const AprColumn: FC<AprColumn> = ({ assetX, ammPool, size }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <span style={{ width: '20px', height: '20px' }}>🐻</span>
        <span className="ml-2">Teddy Farm</span>
      </div>
      <div className="flex">
        <div style={{ color: '#0084FF' }}>98.63%</div>
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
        <Flex align="center">
          <Flex.Item>
            <AssetIconPair
              size={size}
              assetX={ammPool.x.asset}
              assetY={ammPool.y.asset}
            />
          </Flex.Item>
        </Flex>
        </HtmlTooltip>
      </div>
    </div>
  );
};

export default AprColumn;
