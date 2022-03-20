import React, { Suspense, useContext, VFC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Todos } from '~screens/todos';
import { ThemeContext } from '~contexts';
import { Loading } from '~components/common/loading';
import * as TabNavigationKeys from './tab-navigation.keys';
import { todosScreenOptions } from './utils/todos-screen-options';
import { profileScreenOptions } from './utils/profile-screen-options';
import { allScreensOptions } from './utils/all-screens-options';

const Profile = React.lazy(() => import('~screens/profile/profile'));

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
      <Tab.Screen name={TabNavigationKeys.Profile} options={profileScreenOptions()}>
        {() => (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
