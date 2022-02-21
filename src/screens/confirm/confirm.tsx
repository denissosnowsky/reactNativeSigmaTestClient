import { Button } from 'native-base';
import React, { useContext, VFC } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '~components/containers/theme';
import { Header } from '~components/header';
import { ThemeContext } from '~contexts';
import globalStyles from '~global/constants.style';
import authSelectors from '~store/auth/auth.selectors';
import { authThunks } from '~store/auth/thunks';
import styles from './confirm.style';

export const Confirm: VFC<Props> = ({ onPress }) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const isLoading = useSelector(authSelectors.isActivationLinkLoading);

  const onSendActivationLink = () => {
    dispatch(authThunks.authSendActivationLinkThunk());
  };

  return (
    <Theme scaleAndOpacity={1}>
      <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
        <Header style={styles.logo} />
        <Text style={styles.text}>
          Please, confirm the email by the link that we have sent you. After confirmation sign in
          with your credentials.
        </Text>
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
          Send email confirmation again
        </Button>
      </View>
    </Theme>
  );
};

type Props = {
  onPress: () => void;
};
