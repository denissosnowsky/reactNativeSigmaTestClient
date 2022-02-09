import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export const profileScreenOptions = () => {
  return {
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
      const iconName = focused ? 'person' : 'person-outline';
      return <Ionicons name={iconName} size={30} color={color} />;
    },
  };
};
