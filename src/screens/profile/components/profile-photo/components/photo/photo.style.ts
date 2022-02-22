import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: undefined,
    aspectRatio: 1 / 1,
    height: 250,
    borderRadius: 250,
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  edit: {
    width: 250,
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editText: {
    fontSize: 25,
    marginRight: 10,
  },
});

export default styles;
