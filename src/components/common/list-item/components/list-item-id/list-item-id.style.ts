import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  idText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateY: -7 }, { translateX: -15 }],
    zIndex: 1,
    elevation: 2,
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
});

export default styles;
