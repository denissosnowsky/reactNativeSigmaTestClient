import React, { useContext, VFC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Todos } from '~screens/todos';
import { Profile } from '~screens/profile';
import globalStyles from '~global/constants.style';
import { ThemeContext } from '~contexts';
import * as TabNavigationKeys from './tab-navigation.keys';

export type RootTabParamList = {
  [TabNavigationKeys.Main]: undefined;
  [TabNavigationKeys.Profile]: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigation: VFC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: theme.shadowedColor,
        tabBarStyle: { backgroundColor: theme.tabBarBG },
        tabBarLabelStyle: { fontSize: globalStyles.TAB_BAR_FS },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name={TabNavigationKeys.Main}
        component={Todos}
        options={{
          tabBarIcon: ({ focused, color }) => {
            const iconName = focused ? 'md-home' : 'md-home-outline';
            return <Ionicons name={iconName} size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={TabNavigationKeys.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => {
            const iconName = focused ? 'person' : 'person-outline';

            return <Ionicons name={iconName} size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
