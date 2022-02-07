import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  selector: {
    height: 40,
    flex: 1,
    borderColor: globalStyles.LIGHT_CANCEL_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  textWrapper: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownItemText: {
    textAlign: 'center',
    marginLeft: 15,
  },
  iconWrapper: {
    display: 'flex',
    height: '100%',
    width: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
