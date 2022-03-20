import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  photoWrapper: {
    height: 300,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: globalStyles.LIGHT_CANCEL_COLOR,
    borderBottomWidth: 1,
    marginTop: 50,
    marginBottom: 20,
  },
  photo: {
    width: '80%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
