import React, { VFC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';

import { Todos } from '~screens/todos';
import store from './src/store';
import { ErrorBoundary } from './src/components/containers/error-boundary';

const App: VFC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ErrorBoundary>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ display: 'flex', height: '100%' }}
          >
            <Todos />
            <StatusBar style="auto" />
          </KeyboardAvoidingView>
        </ErrorBoundary>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
