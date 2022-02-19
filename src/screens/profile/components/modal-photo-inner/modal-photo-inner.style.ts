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
    height: 150,
    width: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});

export default styles;
