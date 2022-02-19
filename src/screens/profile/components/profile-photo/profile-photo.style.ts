import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  photoWrapper: {
    flex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: globalStyles.LIGHT_CANCEL_COLOR,
    borderBottomWidth: 1,
  },
  photo: {
    width: '100%',
    height: '100%',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  image: {
    height: undefined,
    aspectRatio: 1 / 1,
    width: '80%',
    borderRadius: 15,
  },
  addAvatar: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: globalStyles.LIGHT_CANCEL_COLOR,
    borderWidth: 1,
  },
  addButton: {
    marginTop: 10,
  },
});

export default styles;
