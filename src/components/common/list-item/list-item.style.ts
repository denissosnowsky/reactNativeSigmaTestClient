import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 5,
    marginTop: 15,
    marginBottom: 7,
    padding: 10,
  },
  active: {
    borderColor: globalStyles.MAIN_COLOR,
    borderWidth: 2,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowColor: globalStyles.MAIN_COLOR,
    elevation: 15,
  },
  id: {
    width: 45,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  complete: {
    width: 55,
    display: 'flex',
    alignItems: 'center',
  },
});

export default styles;
