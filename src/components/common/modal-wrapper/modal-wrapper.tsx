import React, { useContext, FC } from 'react';
import { Button, Platform, View } from 'react-native';
import { Modal } from 'native-base';

import globalStyles from '~global/constants.style';
import { ThemeContext } from '~contexts';
import styles from './modal-wrapper.style';
import { BlueText } from '../text';
import { ButtonIcon } from '../button-icon';

export const ModalWrapper: FC<Props> = ({ confirm, decline, showModal, text, children }) => {
  const theme = useContext(ThemeContext);
  const isIos = Platform.OS === 'ios';

  return (
    <>
      <Modal isOpen={showModal} testID="wrapper">
        <Modal.Content
          maxWidth={globalStyles.MODAL_WD}
          style={[styles.wrapper, { backgroundColor: theme.modal }]}
        >
          <Modal.Header style={styles.textWrapper}>
            <BlueText fs={globalStyles.MAIN_FS} style={styles.text}>
              {text}
            </BlueText>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer style={styles.buttonsWrapper}>
            <ButtonIcon onPress={confirm} variant="save" size={globalStyles.ICON_SM_SIZE} />
            <ButtonIcon onPress={decline} variant="cancel" size={globalStyles.ICON_SM_SIZE} />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

type Props = {
  text: string;
  showModal: boolean;
  confirm: () => void;
  decline: () => void;
};
