import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export const todosScreenOptions = () => {
  return {
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
      const iconName = focused ? 'list' : 'list';
      return <Ionicons name={iconName} size={30} color={color} />;
    },
  };
};
