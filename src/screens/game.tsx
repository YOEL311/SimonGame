import * as React from 'react';
import {useRef} from 'react';
import {View, Text, Button} from 'react-native';

import Circle from '../components/circle';
// import {useNavigation} from '@react-navigation/native';
// import {ProfileScreenNavigationProp} from '../@types/navigation';

function GameScreen() {
  const onColorPress = (index: number) => {
    console.log('🚀 ~ file: game.tsx ~ line 11 ~ GameScreen ~ index', index);
  };

  const refShowColor = useRef<(arr: number[]) => void>(() => {});
  const colors = ['blue', 'red', 'green', 'yellow'];

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>GameScreen</Text>
      <View style={{padding: 40}}>
        <Button
          title="sowh"
          onPress={() => {
            refShowColor?.current?.([1, 2, 3, 2, 1]);
          }}
        />
      </View>
      <Circle
        refShowColor={refShowColor}
        onColorPress={onColorPress}
        colors={colors}
      />
    </View>
  );
}
export default GameScreen;
