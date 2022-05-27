import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {ProfileScreenNavigationProp} from '../@types/navigation';

function IntroScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'FETCH_SCORES',
    });
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#93CAED',
      }}>
      <Text style={{fontSize: 50}}>Simon Game</Text>
      <Text style={{fontSize: 20}}>Enter your name to start</Text>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={setName}
        value={name}
        placeholder="your name"
      />
      <Button
        title="Start New Game"
        disabled={name.length === 0}
        onPress={() => {
          dispatch({type: 'SET_USER_NAME', payload: name});
          navigation.navigate('Game');
        }}
      />
      <View style={{marginTop: 20}}>
        <Button
          title="got to list score"
          onPress={() => {
            navigation.navigate('Score');
          }}
        />
      </View>
    </View>
  );
}
export default IntroScreen;
