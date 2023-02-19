import { Form, Modal } from '@ergolabs/ui-kit';
import {
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Observable } from 'rxjs';

import { panalytics } from '../../../../common/analytics';
import { PAnalytics } from '../../../../common/analytics/@types/types';
import { AssetInfo } from '../../../../common/models/AssetInfo';
import { AssetTitle } from '../../../AssetTitle/AssetTitle';
import { AssetListModal } from './AssetListModal/AssetListModal';

interface TokenSelectProps {
  readonly value?: AssetInfo | undefined;
  readonly onChange?: (value: AssetInfo) => void;
  readonly assets$?: Observable<AssetInfo[]>;
  readonly assetsToImport$?: Observable<AssetInfo[]>;
  readonly importedAssets$?: Observable<AssetInfo[]>;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly analytics?: PAnalytics;
  readonly loading?: boolean;
}

const AssetSelect: React.FC<TokenSelectProps> = ({
  value,
  onChange,
  disabled,
  readonly,
  assets$,
  assetsToImport$,
  importedAssets$,
  analytics,
  loading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const theme = useTheme();

  const handleSelectChange = (newValue: AssetInfo): void => {
    if (value?.id !== newValue?.id && onChange) {
      onChange(newValue);
    }
    if (analytics && analytics.operation && analytics.tokenAssignment) {
      panalytics.selectToken(analytics.operation, analytics.tokenAssignment, {
        tokenId: newValue.id,
        tokenName: newValue.ticker,
      });
    }

    setIsDialogOpen(false);
  };

  const openTokenModal = () => {
    if (readonly) {
      return;
    }
    Modal.open(({ close }) => (
      <AssetListModal
        assetsToImport$={assetsToImport$}
        assets$={assets$}
        importedAssets$={importedAssets$}
        close={close}
        value={value}
        onSelectChanged={handleSelectChange}
      />
    ));
  };
  return (
    <>
      {loading ? (
        <Skeleton width={80} height={36} />
      ) : (
        <Chip
          sx={{
            padding: '18px 0px',
            fontWeight: 'bold',
            background: theme.palette.secondary.dark,
          }}
          label={
            value !== undefined ? (
              <AssetTitle gap={2} asset={value} />
            ) : (
              'SELECT TOKEN'
            )
          }
          onClick={() => setIsDialogOpen(true)}
          disabled={disabled}
        />
      )}

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth={true}
      >
        <DialogTitle
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.secondary.dark,
            fontWeight: 'bold',
          }}
        >
          {'Select Token'}
        </DialogTitle>
        <DialogContent
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.secondary.dark,
            padding: 0,
          }}
        >
          <AssetListModal
            assetsToImport$={assetsToImport$}
            assets$={assets$}
            importedAssets$={importedAssets$}
            close={close}
            value={value}
            onSelectChanged={handleSelectChange}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

interface TokeSelectFormItem extends TokenSelectProps {
  name: string;
}

const AssetSelectFormItem: React.FC<TokeSelectFormItem> = ({
  name,
  ...rest
}) => {
  return (
    <Form.Item name={name}>
      {(params) => <AssetSelect {...{ ...rest, ...params }} />}
    </Form.Item>
  );
};

export { AssetSelect, AssetSelectFormItem };
