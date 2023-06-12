import { Flex, Input, Typography } from '@ergolabs/ui-kit';
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import { ReactComponent as ClockIcon } from './Clock.svg';

export default function PageHeaderSection(
  props: PageHeaderProps,
): React.ReactElement {
  return (
    <div
      style={{ alignContent: 'center' }}
      className="flex flex-col w-[991px] max-lg"
    >
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <div className="text-[24px] font-semibold">Farm</div>
        <div className="flex">
          <div>
            <ClockIcon />
          </div>
          <div className="flex flex-col ml-4">
            <span style={{ fontSize: '15px', color: '#DBDBDB' }}>
              Total Daily Emission
            </span>
            <span className="!text-[16px]">15,904,363.86 TEDY</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex">
        <div>
          <Input
            // value={value}
            // onChange={(e) => onChange(e.target.value)}
            size="large"
            placeholder={'Search by token name or id'}
            style={{ width: '300px', paddingLeft: '45px', fontSize: '15px' }}
          />

          <SearchIcon
            style={{
              position: 'relative',
              top: '1px',
              left: '-286px',
              color: '#7D7D7D',
            }}
          />
        </div>
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Staked Only" />
        </FormGroup>
      </div>
    </div>
  );
}

interface PageHeaderProps {
  className?: string;
  maxWidth?: number;
  padding?: number;
  titleChildren?: Element;
}
