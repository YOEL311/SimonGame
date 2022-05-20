export type RootStackParamList = {
  Game: undefined;
  Score: undefined;
  Intro: undefined;
};

import type {StackNavigationProp} from '@react-navigation/stack';

export type ProfileScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;
