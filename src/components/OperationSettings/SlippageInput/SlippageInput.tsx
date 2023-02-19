import { Animation, Control, Flex } from '@ergolabs/ui-kit';
import { Alert, Button, Paper, TextField, useTheme } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

import {
  defaultSlippage,
  MAX_SLIPPAGE,
  MIN_SLIPPAGE,
} from '../../../common/constants/settings';

export type NitroInputProps = Control<number> & { className?: string };

const SLIPPAGE_OPTIONS = [1, defaultSlippage, 7];

const _SlippageInput: FC<NitroInputProps> = ({
  value,
  onChange,
  state,
  message,
  className,
}) => {
  const isCustomSlippage = !SLIPPAGE_OPTIONS.some((val) => val === value);

  const handleClickSlippage = (percentage: number) => {
    if (onChange) {
      onChange(percentage);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.valueAsNumber);
    }
  };

  const theme = useTheme();

  return (
    <Flex col>
      <Flex.Item marginBottom={message ? 2 : 0}>
        <div className="p-2">
          <Flex justify="space-between">
            {SLIPPAGE_OPTIONS.sort().map((val, index) => (
              <Flex.Item key={index} marginRight={1} style={{ width: '100%' }}>
                <Button
                  className="!rounded-full"
                  variant={val == value ? 'contained' : 'text'}
                  sx={{ color: theme.palette.text.primary }}
                  onClick={() => handleClickSlippage(val)}
                >
                  {val} %
                </Button>
              </Flex.Item>
            ))}
            <Flex.Item>
              <TextField
                inputMode="decimal"
                className={className}
                style={{ width: '128px' }}
                value={value}
                placeholder="1"
                type="number"
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: <>%</>,
                  className: '!rounded-md',
                }}
              />
            </Flex.Item>
          </Flex>
        </div>
      </Flex.Item>
      <Animation.Expand expanded={!!message}>
        <Alert severity="warning">{message}</Alert>
      </Animation.Expand>
    </Flex>
  );
};

export const SlippageInput = styled(_SlippageInput)`
  input {
    text-align: right;

    /* stylelint-disable-next-line */
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      /* stylelint-disable-next-line */
      -webkit-appearance: none;
    }
  }
`;
