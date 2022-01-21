import React, { VFC } from 'react';
import { Button, View } from 'react-native';
import { Modal } from 'native-base';

import globalStyles from '~global/constants.style';
import styles from './modal.style';
import { BlueText } from '../text';

export const ModalFC: VFC<Props> = ({ itemsQuantity, confirm, decline, showModal, closeModal }) => {
  const IS_ONE_QUANTITY = itemsQuantity === 1;
  return (
    <>
      <Modal isOpen={showModal} onClose={closeModal} testID="wrapper">
        <Modal.Content maxWidth={globalStyles.MODAL_WD} style={styles.wrapper}>
          <View style={styles.textWrapper}>
            <BlueText fs={globalStyles.MAIN_FS}>{`Delete ${itemsQuantity} ${
              IS_ONE_QUANTITY ? 'todo' : 'todos'
            }?`}</BlueText>
          </View>
          <View style={styles.buttonsWrapper}>
            <Button onPress={confirm} title="Yes" testID="yes" />
            <Button onPress={decline} title="No" testID="no" />
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
