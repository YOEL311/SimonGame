import * as React from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ScoreScreen from '../screens/score';
import GameScreen from '../screens/game';
import IntroScreen from '../screens/intro';
import {RootStackParamList} from '../@types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = React.createRef() as React.Ref<
  NavigationContainerRef<ReactNavigation.RootParamList>
>;

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
