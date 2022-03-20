import React, { useEffect, useState, VFC } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '~components/common/loading';
import { authThunks } from '~store/auth/thunks';
import { authActions } from '~store/auth';
import authSelectors from '~store/auth/auth.selectors';
import styles from './modal-photo-inner.style';

export const ModalPhotoInner: VFC<Props> = ({ setNewPhoto }) => {
  const dispatch = useDispatch();
  const avatars = useSelector(authSelectors.avatars);
  const userPhoto = useSelector(authSelectors.user).photo;
  const [chosenPhoto, setChosenPhoto] = useState('');

  useEffect(() => {
    dispatch(authThunks.userGetPhotosThunk());
    return () => {
      dispatch(authActions.userGetPhotosErase());
    };
  }, []);

  const onChosePhotoHandler = (photo: string) => {
    setChosenPhoto(photo);
    setNewPhoto(photo);
  };

  if (!avatars) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {avatars.map((avatar) => (
        <TouchableWithoutFeedback key={avatar._id} onPress={() => onChosePhotoHandler(avatar._id)}>
          <View style={styles.photoWrapper}>
            <Image
              source={{
                uri: avatar.url,
              }}
              style={[
                styles.image,
                avatar.url === userPhoto && styles.chosen,
                avatar._id === chosenPhoto && styles.active,
              ]}
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

type Props = {
  setNewPhoto: (arg: string) => void;
};
