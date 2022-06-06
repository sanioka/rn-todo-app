import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';

import * as Font from 'expo-font';
import { View } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screen/ScreenState";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });

        // Artificially delay for two seconds to simulate a slow loading experience.
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }
    loadResources();
  }, []);

  // TODO: Learn how it works
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately!
      // If we call this after `setIsReady`, then we may see a blank screen while the app is loading its initial state
      // and rendering its first pixels. So instead, we hide the splash screen once we know the root view has already performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  // See ./images/prototype* for details about this useContext() hierarchy
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ScreenState>
        <TodoState>
          <MainLayout />
        </TodoState>
      </ScreenState>
      <StatusBar style="dark"/>
    </View>
  );
}