import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../@types/navigation';

function ScoreScreen() {
  const scoreList = useSelector((store: any) => store.scoresList);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
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
        backgroundColor: '#EEEE9B',
      }}>
      {scoreList?.map((el: any, i: number) => {
        return (
          <Text key={`${el.name}${el.score} - ${i}`}>
            {el.name} - {el.score}
          </Text>
        );
      })}
      <View style={{margin: 20}}>
        <Button
          title="new game"
          onPress={() => {
            navigation.navigate('Game');
          }}
        />
      </View>
    </View>
  );
}

export default ScoreScreen;
