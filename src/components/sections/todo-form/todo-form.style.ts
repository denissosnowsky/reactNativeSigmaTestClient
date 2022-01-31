import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapepr: {
    height: 110,
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  twoBtnEditBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  threeBtnEditBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 20,
  },
});

export default styles;
