import {
  Alert,
  Animation,
  Box,
  Control,
  Flex,
  Typography,
} from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { Button, Paper, TextField, useTheme } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

import { MIN_NITRO } from '../../../common/constants/erg';
import { Currency } from '../../../common/models/Currency';

export type NitroInputProps = Control<number> & {
  readonly className?: string;
  readonly minExFee: Currency;
  readonly maxExFee: Currency;
};

const _NitroInput: FC<NitroInputProps> = ({
  onChange,
  value,
  message,
  state,
  className,
  minExFee,
  maxExFee,
}) => {
  const isMinimumNitro = value === MIN_NITRO;

  const handleClickNitroAuto = () => {
    if (onChange) {
      onChange(MIN_NITRO);
    }
  };

  const handleNitroChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(Number(e.target.value));
    }
  };
  const theme = useTheme();
  return (
    <Flex col>
      <Flex.Item marginBottom={1}>
        <div className="p-2">
          <Flex align="center">
            <Flex.Item marginRight={2}>
              <Button
                sx={{
                  color: theme.palette.text.primary,
                }}
                className="!normal-case"
                variant={isMinimumNitro ? 'contained' : 'outlined'}
                onClick={handleClickNitroAuto}
              >
                <Trans>Minimum</Trans>
              </Button>
            </Flex.Item>
            <Flex.Item flex={1}>
              <TextField
                className="!rounded-md"
                variant="outlined"
                inputMode="decimal"
                value={value}
                onChange={handleNitroChange}
                InputProps={{
                  className: '!text-right',
                  endAdornment: <>ADA</>,
                }}
                inputProps={{
                  className: '!text-right !pr-2',
                }}
              />
            </Flex.Item>
          </Flex>
        </div>
      </Flex.Item>
      <Flex.Item marginBottom={message ? 2 : 0}>
        <Typography.Body className={className}>
          <Trans>
            Execution Fee Range {minExFee.toString()} - {maxExFee.toString()}{' '}
            {maxExFee.asset.ticker || maxExFee.asset.name}
          </Trans>
        </Typography.Body>
      </Flex.Item>
      <Animation.Expand expanded={!!message}>
        <Alert showIcon type={state} message={message} />
      </Animation.Expand>
    </Flex>
  );
};

export const NitroInput = styled(_NitroInput)`
  font-size: 12px !important;
  line-height: 20px !important;
`;
