import { Button } from 'native-base';
import React, { useContext, useState, VFC } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '~components/common/input';
import { Theme } from '~components/containers/theme';
import { Header } from '~components/header';
import { ThemeContext } from '~contexts';
import globalStyles from '~global/constants.style';
import authSelectors from '~store/auth/auth.selectors';
import { useKeybord } from '~hooks/useKeybord';
import styles from './auth.style';
import { ButtonQuestion } from './components/button-question/button-question';
import { onEraseAll } from './utils/onEraseAll';
import { onSignIn } from './utils/onSignIn';
import { onSignUp } from './utils/onSignUp';
import { ButtonTry } from './components/button-try/button-try';
import { onTestMode } from './utils/onTestMode';
import { ButtonSubmit } from './components/button-submit/button-submit';

export const Auth: VFC = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isInputsFocused, setIsInputsFocused] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);
  const isLoading = useSelector(authSelectors.isLoading);

  const isKeyBoardOpened = useKeybord(setIsInputsFocused);

  const onPressChangeAuth = () => {
    setHaveAccount(!haveAccount);
    onEraseAll(setEmail, setPassword, setName, setConfirmPassword);
  };

  const onSignInHandler = () => {
    onSignIn(email, password, dispatch);
  };

  const onSignUpHandler = () => {
    onSignUp(name, email, password, confirmPassword, dispatch);
  };

  const onTestModeHandler = () => {
    onTestMode(dispatch);
  };

  return (
    <Theme scaleAndOpacity={1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <Header style={styles.logo} />
          <View style={styles.form}>
            {!haveAccount && (
              <Input
                value={name}
                onChange={setName}
                placeholder="Enter name"
                isUnderlined
                style={styles.input}
                onFocus={() => setIsInputsFocused(true)}
              />
            )}
            <Input
              value={email}
              onChange={setEmail}
              placeholder="Enter email"
              isUnderlined
              style={styles.input}
              onFocus={() => setIsInputsFocused(true)}
            />
            <Input
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
              isUnderlined
              style={styles.input}
              onFocus={() => setIsInputsFocused(true)}
              secureTextEntry
            />
            {!haveAccount && (
              <Input
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirms password"
                isUnderlined
                style={styles.input}
                onFocus={() => setIsInputsFocused(true)}
                secureTextEntry
              />
            )}
            <ButtonSubmit
              isLoading={isLoading}
              haveAccount={haveAccount}
              onSignInHandler={onSignInHandler}
              onSignUpHandler={onSignUpHandler}
            />
          </View>
          <ButtonTry onPress={onTestModeHandler} isHide={isKeyBoardOpened || isInputsFocused} />
          <ButtonQuestion
            isHide={isKeyBoardOpened || isInputsFocused}
            onPress={onPressChangeAuth}
            haveAccount={haveAccount}
          />
        </View>
      </TouchableWithoutFeedback>
    </Theme>
  );
};
