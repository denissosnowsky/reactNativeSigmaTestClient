import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF69C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: globalStyles.MAIN_COLOR,
  },
  subtext: {
    textAlign: 'center',
    fontSize: 27,
    color: '#000',
    marginTop: 20,
  },
});

export default styles;
