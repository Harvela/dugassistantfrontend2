import React from 'react';

import MainLayout from './MainLayout';

export default function withMainLayout<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithMainLayout(props: P) {
    return (
      <MainLayout>
        <WrappedComponent {...props} />
      </MainLayout>
    );
  };
}
