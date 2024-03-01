import './styles.less';

import { Flex, Typography } from '@ergolabs/ui-kit';
import { FC } from 'react';

import { MyInfoTable } from './MyInfoTable';

export const MyInformation: FC = () => {
  return (
    <Flex col className="myInfo-container">
      <Typography.Title level={1}>My Information</Typography.Title>
      <MyInfoTable />
    </Flex>
  );
};
