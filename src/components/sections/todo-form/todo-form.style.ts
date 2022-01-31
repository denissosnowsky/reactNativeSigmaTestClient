import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapepr: {
    height: 70,
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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
});

export default styles;
