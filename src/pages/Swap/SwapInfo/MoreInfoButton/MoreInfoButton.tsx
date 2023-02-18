import { Flex, Typography } from '@ergolabs/ui-kit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

export interface MoreInfoButton {
  readonly onClick?: () => void;
  readonly className?: string;
  readonly opened?: boolean;
}

const _MoreInfoButton: FC<MoreInfoButton> = ({
  onClick,
  opened,
  className,
}) => (
  <Flex
    justify="center"
    align="center"
    width="100%"
    className={className}
    onClick={onClick}
  >
    <Flex.Item>
      <Typography.Body size="small" secondary hint>
        {opened ? (
          <IconButton>
            <KeyboardArrowUpIcon />
          </IconButton>
        ) : (
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        )}
      </Typography.Body>
    </Flex.Item>
  </Flex>
);

export const MoreInfoButton = styled(_MoreInfoButton)`
  cursor: pointer;
  user-select: none;
`;
