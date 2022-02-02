import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  selector: {
    height: 45,
    flex: 1,
    borderColor: globalStyles.LIGHT_CANCEL_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  textWrapper: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    display: 'flex',
    height: 33,
    width: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    width: '100%',
    top: 43,
    left: 5,
    zIndex: 15,
    borderWidth: 1,
    borderColor: globalStyles.LIGHT_CANCEL_COLOR,
    borderRadius: 10,
    padding: 5,
  },
  dropdownItem: {
    width: '100%',
    height: 45,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownItemText: {
    textAlign: 'center',
  },
});

export default styles;
