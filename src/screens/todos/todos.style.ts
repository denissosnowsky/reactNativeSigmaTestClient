import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  body: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  alert: {
    position: 'absolute',
    top: 50,
    zIndex: 2,
  },
  showAlert: {
    display: 'flex',
  },
  hideAlert: {
    display: 'none',
    height: 0,
  },
});

export default styles;
