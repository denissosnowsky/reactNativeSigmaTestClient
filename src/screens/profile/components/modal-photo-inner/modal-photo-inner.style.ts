import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  button: {
    width: '70%',
    padding: 10,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  photoWrapper: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    backgroundColor: '#ddd',
  },
  active: {
    borderWidth: 2,
    borderColor: globalStyles.LIGHT_MAIN_COLOR,
  },
  chosen: {
    borderWidth: 2,
    borderColor: 'red',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});

export default styles;
