// import closeIcon from "../../../../../../assets/images/close.png"
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { ReactComponent as TickIcon } from '../../../../../../assets/icons/popUp/tick.svg';

const Popup = ({ Icon, Label, Text }: any) => {
  return (
    <>
      <CloseIcon style={{ marginLeft: 'auto', display: 'flex' }} />
      <div className="flex items-center">
        <div>{Icon}</div>
        <div className="flex flex-col ml-4">
          <div>{Text}</div>
          <div
            className="border !border-gray-300 !text-[16px] text-center flex justify-center rounded-md mt-2"
            style={{ color: '#42A2D7', padding: '3px' }}
          >
            {Label}
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
