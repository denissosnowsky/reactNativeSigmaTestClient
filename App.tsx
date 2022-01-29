import React, { VFC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Screens } from '~screens/screens';
import store from './src/store';
import { ErrorBoundary } from './src/components/containers/error-boundary';

const App: VFC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <ErrorBoundary>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ display: 'flex', height: '100%' }}
            >
              <Screens />
              <StatusBar style="auto" />
            </KeyboardAvoidingView>
          </ErrorBoundary>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
