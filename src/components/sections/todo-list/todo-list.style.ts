import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: -2,
    elevation: -1,
  },
  nonListWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    zIndex: -2,
    elevation: -1,
  },
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});

export default styles;
