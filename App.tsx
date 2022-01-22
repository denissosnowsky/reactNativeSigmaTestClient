import React, { VFC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';

import { Todos } from '~screens/todos';
import store from './src/store';
import { ErrorBoundary } from './src/components/containers/error-boundary';

const App: VFC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ErrorBoundary>
          <Todos />
          <StatusBar style="auto" />
        </ErrorBoundary>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
