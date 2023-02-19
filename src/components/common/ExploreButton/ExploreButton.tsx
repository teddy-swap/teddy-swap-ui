import { Address, TxId } from '@ergolabs/ergo-sdk';
import LinkIcon from '@mui/icons-material/Link';
import { IconButton } from '@mui/material';
import React from 'react';

import {
  exploreAddress,
  exploreTx,
} from '../../../gateway/utils/exploreAddress';
import { isTxId } from '../../../utils/string/txId';

interface ExploreButtonProps {
  to: Address | TxId;
}

const ExploreButton: React.FC<ExploreButtonProps> = ({ to }) => {
  const handleExplore = (t: string): void => {
    if (isTxId(t)) {
      exploreTx(t);
      return;
    }
    exploreAddress(t);
  };

  return (
    <IconButton
      aria-label="delete"
      onClick={(e) => {
        e.stopPropagation();
        handleExplore(to);
      }}
    >
      <LinkIcon />
    </IconButton>
  );
};

export { ExploreButton };
