import { Button } from 'native-base';
import React, { useState, VFC } from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from './modal-photo-inner.style';

export const ModalPhotoInner: VFC<Props> = ({ setNewPhoto }) => {
  const [image, setImage] = useState<string>('');

  const pickImage = async () => {
    const result: ImagePicker.ExpandImagePickerResult<
      ImagePicker.ImagePickerOptions | ImagePicker.OpenFileBrowserOptions
    > = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setNewPhoto(result.uri);
    }
  };

  return (
    <View style={styles.wrapper}>
      {Boolean(image) && (
        <View style={styles.photoWrapper}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        </View>
      )}
      <Button style={styles.button} onPress={pickImage} size="lg" colorScheme="blue">
        Upload photo...
      </Button>
    </View>
  );
};

type Props = {
  setNewPhoto: (arg: string) => void;
};
