import React, { VFC } from 'react';
import { Button, View } from 'react-native';
import { Modal } from 'native-base';

import globalStyles from '~global/constants.style';
import styles from './modal.style';
import { BlueText } from '../text';

export const ModalFC: VFC<Props> = ({ itemsQuantity, confirm, decline, showModal, closeModal }) => {
  return (
    <>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content maxWidth="400px" style={styles.wrapper}>
          <View style={styles.textWrapper}>
            <BlueText fs={globalStyles.MAIN_FS}>{`Delete ${itemsQuantity} ${
              itemsQuantity === 1 ? 'todo' : 'todos'
            }?`}</BlueText>
          </View>
          <View style={styles.buttonsWrapper}>
            <Button onPress={confirm} title="Yes" />
            <Button onPress={decline} title="No" />
          </View>
        </Modal.Content>
      </Modal>
    </>
  );
};

type Props = {
  itemsQuantity: number;
  showModal: boolean;
  closeModal: () => void;
  confirm: () => void;
  decline: () => void;
};
