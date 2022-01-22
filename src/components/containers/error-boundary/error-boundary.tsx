import React from 'react';
import { Text, View } from 'react-native';

import styles from './error-boundary.style';

export class ErrorBoundary extends React.Component<unknown, { hasError: boolean }> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Oops, Something went wrong.</Text>
          <Text style={styles.subtext}>Please, reload the app</Text>
        </View>
      );
    }
    return children;
  }
}
