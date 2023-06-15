import React from 'react';

import { Page } from '../../components/Page/Page';

export const Orders = (): JSX.Element => {
  return (
    <Page className="w-[448px] !p-0 relative" maxWidth={448}>
      <div className="h-[468px] grid justify-center content-center">
        <div className="font-bold text-[24px] text-center">
          Will be arriving in a few days
          <br />
          🧸🧸🧸
        </div>
      </div>
    </Page>
  );
};
