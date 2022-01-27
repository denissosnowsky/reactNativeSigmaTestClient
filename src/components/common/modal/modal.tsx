import React, { useContext, VFC } from 'react';
import { Button, View } from 'react-native';
import { Modal } from 'native-base';

import globalStyles from '~global/constants.style';
import { ThemeContext } from '~contexts';
import styles from './modal.style';
import { BlueText } from '../text';

export const ModalFC: VFC<Props> = ({ itemsQuantity, confirm, decline, showModal, closeModal }) => {
  const IS_ONE_QUANTITY = itemsQuantity === 1;
  const theme = useContext(ThemeContext);
  return (
    <>
      <Modal isOpen={showModal} onClose={closeModal} testID="wrapper">
        <Modal.Content
          maxWidth={globalStyles.MODAL_WD}
          style={[styles.wrapper, { backgroundColor: theme.modal }]}
        >
          <View style={styles.textWrapper}>
            <BlueText fs={globalStyles.MAIN_FS}>{`Delete ${itemsQuantity} ${
              IS_ONE_QUANTITY ? 'todo' : 'todos'
            }?`}</BlueText>
          </View>
          <View style={styles.buttonsWrapper}>
            <Button onPress={confirm} title="Yes" testID="yes" color={theme.button} />
            <Button onPress={decline} title="No" testID="no" color={theme.button} />
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
