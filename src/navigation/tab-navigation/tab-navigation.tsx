import React, { useContext, VFC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Todos } from '~screens/todos';
import { Profile } from '~screens/profile';
import { ThemeContext } from '~contexts';
import * as TabNavigationKeys from './tab-navigation.keys';
import { todosScreenOptions } from './utils/todos-screen-options';
import { profileScreenOptions } from './utils/profile-screen-options';
import { allScreensOptions } from './utils/all-screens-options';

export type RootTabParamList = {
  [TabNavigationKeys.List]: undefined;
  [TabNavigationKeys.Profile]: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigation: VFC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator screenOptions={allScreensOptions(theme)}>
      <Tab.Screen name={TabNavigationKeys.List} component={Todos} options={todosScreenOptions()} />
      <Tab.Screen
        name={TabNavigationKeys.Profile}
        component={Profile}
        options={profileScreenOptions()}
      />
    </Tab.Navigator>
  );
};
