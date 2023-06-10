import React from 'react'
import { ReactComponent as ADA } from '../../../../assets/icons/tokens/token-ada.svg';
import { ReactComponent as TEDY } from '../../../../assets/icons/tokens/token-tedy.svg';
import AddIcon from '@mui/icons-material/Add';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PairColumn = ({Icon}:any) => {
  return (
    <div className="flex flex-col">
    <div
      className="border rounded-md flex justify-between items-center !px-4 !py-2"
      style={{ borderColor: '#606060' }}
    >
      <div className="flex items-center">
        <span>
          <ADA />
        </span>
        <span className="ml-2">ADA</span>
      </div>
      <div>86.0</div>
    </div>
    <div className="flex justify-center"
      >
      {Icon}</div>
    <div
      className="border rounded-md flex justify-between !px-4 !py-2"
      style={{ borderColor: '#606060' }}
    >
      <div className="flex items-center">
        <span>
          <TEDY />
        </span>
        <span className="ml-2">TEDY</span>
      </div>
      <div>356.24</div>
    </div>
  </div>
  )
}

export default PairColumn