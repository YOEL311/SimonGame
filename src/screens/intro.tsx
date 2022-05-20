import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {ProfileScreenNavigationProp} from '../@types/navigation';

function IntroScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Game"
        onPress={() => {
          navigation.navigate('Game');
        }}
      />
      <Button
        title="Intro"
        onPress={() => {
          navigation.navigate('Intro');
        }}
      />
      <Button
        title="scores"
        onPress={() => {
          navigation.navigate('Game');
        }}
      />
    </View>
  );
}

export default IntroScreen;
