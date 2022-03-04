import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  addAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: globalStyles.LIGHT_CANCEL_COLOR,
    borderWidth: 1,
    width: undefined,
    aspectRatio: 1 / 1,
    height: 250,
    borderRadius: 250,
  },
  addButton: {
    marginTop: 10,
  },
  text: {
    fontSize: 30,
    color: globalStyles.LIGHT_MAIN_COLOR,
  },
});

export default styles;
