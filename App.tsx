/* eslint-disable react-native/no-inline-styles */
import {ReactNode, useEffect} from 'react';
import React from 'react';
import {Button, Image, Platform, SafeAreaView, Text} from 'react-native';
import Instabug, {CrashReporting} from 'instabug-reactnative';

const throwHandled = () => {
  try {
    throw Error('This is a handled JS Crash');
  } catch (err) {
    if (err instanceof Error) {
      CrashReporting.reportError(err);
    }
  }
};

const throwUnhandled = () => {
  throw Error('This is an unhandled JS Crash');
};

const App: () => ReactNode = () => {
  useEffect(() => {
    const appToken = Platform.select({
      android: 'f163dafcad22d79fb3653d3b6458729e',
      ios: '848c06050b6d335fc4dca473c9a8a9d9',
    })!;

    console.log('Instabug-Hybrid', 'starting from RN');
    Instabug.start(appToken, [Instabug.invocationEvent.floatingButton]);
  }, []);

  return (
    <SafeAreaView
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
          height: 100,
          width: 100,
        }}
      />
      <Text style={{fontSize: 21, fontWeight: '700'}}>React Native App</Text>
      <Button title="Handled Crash" onPress={throwHandled} />
      <Button title="Unhandled Crash" onPress={throwUnhandled} />
    </SafeAreaView>
  );
};

export default App;
