import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 5,
    marginTop: 15,
    marginBottom: 7,
  },
  active: {
    borderColor: globalStyles.LIGHT_MAIN_COLOR,
    borderWidth: 2,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowColor: globalStyles.LIGHT_MAIN_COLOR,
    elevation: 15,
  },
  id: {
    width: 55,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  idTextWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    flex: 1,
    padding: 5,
  },
  complete: {
    width: 55,
    display: 'flex',
    alignItems: 'center',
  },
  idText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateY: -7 }, { translateX: -15 }],
    zIndex: 1,
  },
});

export default styles;
