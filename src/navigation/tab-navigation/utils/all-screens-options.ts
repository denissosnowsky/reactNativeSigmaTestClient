import globalStyles from '~global/constants.style';

export const allScreensOptions = (theme: any) => {
  return {
    tabBarActiveTintColor: theme.textColor,
    tabBarInactiveTintColor: theme.shadowedColor,
    tabBarStyle: { backgroundColor: theme.tabBarBG },
    tabBarLabelStyle: { fontSize: globalStyles.TAB_BAR_FS },
    headerShown: false,
    tabBarHideOnKeyboard: true,
  };
};
