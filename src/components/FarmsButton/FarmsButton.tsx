import { Button } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { FC, MouseEvent } from 'react';
import styled from 'styled-components';

export interface FarmsButtonProps {
  readonly className?: string;
  readonly onClick?: (e: MouseEvent) => void;
}

const _FarmsButton: FC<FarmsButtonProps> = ({ className, onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="small"
      type="primary"
      htmlType="button"
      className={className}
    >
      <Trans>Farms</Trans>
    </Button>
  );
};

export const FarmsButton = styled(_FarmsButton)`
  border-color: transparent;
  background: var(--teddy-box-color-dark) !important;
  color: var(--spectrum-text-white) !important;
`;
