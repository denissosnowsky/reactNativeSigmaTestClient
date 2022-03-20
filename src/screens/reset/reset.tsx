import { Button } from 'native-base';
import React, { useContext, useEffect, useState, VFC } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '~components/common/input';

import { Theme } from '~components/containers/theme';
import { Header } from '~components/header';
import { ThemeContext } from '~contexts';
import globalStyles from '~global/constants.style';
import authSelectors from '~store/auth/auth.selectors';
import { authThunks } from '~store/auth/thunks';
import styles from './reset.style';

export const Reset: VFC<Props> = ({ onPress }) => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const isLoading = useSelector(authSelectors.isResetPasswordLoading);

  const onSendActivationLink = () => {
    if (email) {
      dispatch(authThunks.authNewPasswordThunk(email));
    }
  };

  useEffect(() => {
    if (isLoading === false) {
      setEmail('');
    }
  }, [isLoading]);

  return (
    <Theme scaleAndOpacity={1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
          <Header style={styles.logo} />
          <View style={styles.form}>
            <Input
              value={email}
              onChange={setEmail}
              placeholder="Enter email"
              isUnderlined
              style={styles.input}
            />
            <Button
              size="lg"
              _text={{
                fontSize: globalStyles.MAIN_FS,
              }}
              colorScheme="blue"
              onPress={onSendActivationLink}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Send new password
            </Button>
            <Button
              variant="link"
              _text={{
                color: theme.button,
                fontSize: globalStyles.MAIN_FS,
              }}
              style={styles.question}
              onPress={onPress}
              size="lg"
            >
              Sign in
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Theme>
  );
};

type Props = {
  onPress: () => void;
};
