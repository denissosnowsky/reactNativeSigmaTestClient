import React from 'react';

export const connectComponentWithPropsCallback = (
  props: Record<string, unknown>,
  Component: React.FC<any> | React.VFC<any>,
) => <Component {...props} />;
