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
import DropDownSelect from '../../../../../../components/common/DropDownSelect/DropDownSelect';

export default function OrdersHeaderSection(
  props: PageHeaderProps,
): React.ReactElement {
  return (
    <div
      style={{  alignContent: 'center' }}
      className="flex flex-col"
    >
      <div className="text-[20px] font-semibold">Transaction History</div>

      <div className="mt-4 flex justify-between">
        <div>
          <label className="mb-2">Search by token</label>
          <Flex>
          <Input
            // value={value}
            // onChange={(e) => onChange(e.target.value)}
            size="large"
            placeholder={'Search by token name or policy id'}
            style={{
              width: '300px',
              paddingLeft: '45px',
              fontSize: '14px',
              marginTop: '8px',
              borderRadius:"10px",
              backgroundColor:"#3D505A",
            }}
          />

          <SearchIcon
            style={{
              position: 'relative',
              top: '15px',
              left: '-286px',
              color: '#7D7D7D',
            }}
          />
          </Flex>
        </div>
        <div style={{marginLeft:"-15px"}}>
          <label className="mb-2 ml-2">Search by action</label>
          <DropDownSelect label1="Swap" label2="Deposit" label3="Withdraw" />
        </div>
        <div>
          <label className="mb-2 ml-2">Search by status</label>
          <DropDownSelect label1="Complete" label2="Pending" label3="Canceled" />
        </div>
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
