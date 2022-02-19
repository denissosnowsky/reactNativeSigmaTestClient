import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  button: {
    height: 50,
    fontSize: 20,
    borderColor: globalStyles.LIGHT_CANCEL_COLOR,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default styles;
