import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  wrapepr: {
    height: 60,
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    zIndex: 999,
  },
  twoBtnEditBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  fourBtnEditBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  letterWrapper: {
    height: 70,
    marginRight: 15,
  },
  priorityWrapper: {
    position: 'relative',
  },
  priorityDropdown: {
    position: 'absolute',
    width: '100%',
    top: '100%',
    display: 'flex',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: globalStyles.LIGHT_BORDER_COLOR,
  },
});

export default styles;
