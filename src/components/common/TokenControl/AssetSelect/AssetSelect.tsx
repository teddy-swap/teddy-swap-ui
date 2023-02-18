import { Button, DownOutlined, Form, Modal, useDevice } from '@ergolabs/ui-kit';
import { Chip, Skeleton } from '@mui/material';
import React from 'react';
import { Observable } from 'rxjs';
import styled from 'styled-components';

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
          }}
          label={
            value !== undefined ? (
              <AssetTitle gap={2} asset={value} />
            ) : (
              'Select Token'
            )
          }
          onClick={openTokenModal}
          disabled={disabled}
        />
      )}
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
