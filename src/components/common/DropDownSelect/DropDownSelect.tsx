import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Interface } from 'readline';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function DropDownSelect({label1,label2,label3}:any) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 300 ,borderRadius:10}}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <div>All</div>
          </MenuItem>
          <MenuItem value={label1}>{label1}</MenuItem>
          <MenuItem value={label2}>{label2}</MenuItem>
          <MenuItem value={label3}>{label3}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

