// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Footer from '@/components/Footer';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index" // Change to match your new HomeScreen file
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Footer.FooterButton icon={"🏠"} label={"Home"}></Footer.FooterButton>
          ),
        }}
      />
      <Tabs.Screen
        name="courses" // Change to match your new HomeScreen file
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Footer.FooterButton icon={"📚"} label={"Courses"}></Footer.FooterButton>
          ),
        }}
      />
      <Tabs.Screen
        name="progress" // Change to match your new HomeScreen file
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Footer.FooterButton icon={"📈"} label={"Progress"}></Footer.FooterButton>
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // Change to match your new HomeScreen file
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Footer.FooterButton icon={"👤"} label={"Profile"}></Footer.FooterButton>
          ),
        }}
      />
    </Tabs>
  );
}
