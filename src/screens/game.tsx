import * as React from 'react';
import {useRef} from 'react';
import {View, Text, Button} from 'react-native';

import Circle from '../components/circle';
// import {useNavigation} from '@react-navigation/native';
// import {ProfileScreenNavigationProp} from '../@types/navigation';

function GameScreen() {
  const onColorPress = (index: number) => {};

  // const navigation = useNavigation<ProfileScreenNavigationProp>();
  const refShowColor = useRef<(arr: number[]) => void>(null);
  const colors = ['blue', 'red', 'green', 'yellow'];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>GameScreen</Text>
      <Button
        title="sowh"
        onPress={() => {
          refShowColor?.current?.([1, 2, 3, 2, 1]);
        }}
      />
      <Circle
        refShowColor={refShowColor}
        onColorPress={onColorPress}
        colors={colors}
      />
    </View>
  );
}
export default GameScreen;
