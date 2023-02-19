import { Button, message, Tooltip } from '@ergolabs/ui-kit';
import { t } from '@lingui/macro';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, IconButton, Snackbar } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CopyButtonProps {
  text: string;
  children?: ReactNode | string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  return (
    <>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Your wallet address has been copied to clipboard.
        </Alert>
      </Snackbar>
      <CopyToClipboard text={text} onCopy={() => setIsSnackbarOpen(true)}>
        <IconButton aria-label="delete" onClick={(e) => e.stopPropagation()}>
          <ContentCopyIcon />
        </IconButton>
      </CopyToClipboard>
    </>
  );
};

export { CopyButton };
