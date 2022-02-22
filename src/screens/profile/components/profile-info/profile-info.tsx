import React, { useEffect, useState, VFC } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~components/common/button';
import { BlueText } from '~components/common/text';
import authSelectors from '~store/auth/auth.selectors';
import { authThunks } from '~store/auth/thunks';
import { ModalWrapper } from '~components/common/modal-wrapper';
import { authActions } from '~store/auth';
import { UserDAO } from '~types/auth.types';
import { ButtonIcon } from '~components/common/button-icon';
import globalStyles from '~global/constants.style';
import styles from './profile-info.style';
import { ModalNameInner } from '../modal-name-inner/modal-name-inner';
import { ModalPassInner } from '../modal-pass-inner/modal-pass-inner';
import { ModalEmailInner } from '../modal-email-inner/modal-email-inner';

export const ProflieInfo: VFC = () => {
  const dispatch = useDispatch();

  const user: Omit<UserDAO, 'token'> = useSelector(authSelectors.user);

  const [newName, setNewName] = useState<string>(user.name);
  const [newEmail, setNewEmail] = useState<string>(user.email);
  const [oldPass, setOldPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [isNameModalOpened, setIsNameModalOpened] = useState(false);
  const [isEmailModalOpened, setIsEmailModalOpened] = useState(false);
  const [isPasswordModalOpened, setIsPasswordModalOpened] = useState(false);

  useEffect(() => {
    setNewName(user.name);
  }, [user.name]);

  useEffect(() => {
    setNewEmail(user.email);
  }, [user.email]);

  const openNameModal = () => {
    setIsNameModalOpened(true);
  };

  const closeNameModal = () => {
    setIsNameModalOpened(false);
    setNewName(user.name);
  };

  const openEmailModal = () => {
    setIsEmailModalOpened(true);
  };

  const closeEmailModal = () => {
    setIsEmailModalOpened(false);
    setNewEmail(user.email);
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpened(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpened(false);
    setOldPass('');
    setNewName('');
    setConfirmPass('');
  };

  const onNameModalConfirm = () => {
    if (user.name !== newName && newName.trim()) {
      dispatch(authThunks.userChangeNameThunk(newName));
    }
    closeNameModal();
  };

  const onEmailModalConfirm = () => {
    if (user.email !== newEmail && newEmail.trim()) {
      dispatch(authThunks.userChangeEmailThunk(newEmail));
    }
    closeEmailModal();
  };

  const onPassModalConfirm = () => {
    if (newPass !== confirmPass) {
      dispatch(authActions.authAddError('Password mismatch'));
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
      return;
    }
    if (newPass.length < 6) {
      dispatch(authActions.authAddError('Minimum password length - 6 symbols'));
      setTimeout(() => dispatch(authActions.authEmptifyError()), 2000);
      return;
    }
    if (newPass.trim()) {
      dispatch(authThunks.userChangePassThunk(oldPass, newPass));
    }
  };

  return (
    <>
      <View style={styles.infoWrapper}>
        <View style={styles.buttons}>
          <View style={styles.textWrapper}>
            <BlueText style={styles.text}>Name: {user.name ?? 'User'}</BlueText>
            <ButtonIcon
              variant="pencil"
              onPress={openNameModal}
              size={globalStyles.ICON_EXSM_SIZE}
              style={styles.icon}
            />
          </View>
          <View style={styles.textWrapper}>
            <BlueText style={styles.text}>Email: {user.email ?? 'Email'}</BlueText>
            <ButtonIcon
              variant="pencil"
              onPress={openEmailModal}
              size={globalStyles.ICON_EXSM_SIZE}
              style={styles.icon}
            />
          </View>
          <Button name="Change password" style={styles.button} onPress={openPasswordModal} />
        </View>
      </View>
      <ModalWrapper
        showModal={isNameModalOpened}
        confirm={onNameModalConfirm}
        decline={closeNameModal}
        text="Changing name"
      >
        <ModalNameInner name={newName} onChange={setNewName} />
      </ModalWrapper>
      <ModalWrapper
        showModal={isEmailModalOpened}
        confirm={onEmailModalConfirm}
        decline={closeEmailModal}
        text="Changing email"
      >
        <ModalEmailInner name={newEmail} onChange={setNewEmail} />
      </ModalWrapper>
      <ModalWrapper
        showModal={isPasswordModalOpened}
        confirm={onPassModalConfirm}
        decline={closePasswordModal}
        text="Changing password"
      >
        <ModalPassInner
          newPass={newPass}
          oldPass={oldPass}
          confirmPass={confirmPass}
          onChangeNewPass={setNewPass}
          onChangeOldPass={setOldPass}
          onChangeConfirmPass={setConfirmPass}
        />
      </ModalWrapper>
    </>
  );
};
