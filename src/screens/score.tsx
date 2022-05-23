import * as React from 'react';
import {Text, View} from 'react-native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function ScoreScreen() {
  const scoreList = useSelector((store: any) => store.scoresList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'FETCH_SCORES',
    });
  }, [dispatch]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {scoreList?.map((el: any) => {
        return (
          <Text key={`${el.name}${el.score}`}>
            {el.name} - {el.score}
          </Text>
        );
      })}
    </View>
  );
}

export default ScoreScreen;
