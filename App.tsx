/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import GameHeader from './src/components/GameHeader';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <GameHeader />
    </SafeAreaView>
  );
}

export default App;
