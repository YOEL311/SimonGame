import * as React from 'react';
import {View, Text, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

function ScoreScreen() {
  // firestore().collection('score').add({
  //   name: 'Elior',
  //   score: 80,
  //   date: new Date(),
  // });
  const [score, setScore] = useState([]);
  // firestore()
  //   .collection('score')
  //   .get()
  //   .then(snapshot => {
  //     console.log(
  //       '🚀 ~ file: App.tsx ~ line 24 ~ HomeScreen ~ snapshot',
  //       snapshot,
  //     );
  //     snapshot.forEach(doc => {
  //       setScore(doc.data());
  //       console.log(doc.data());
  //       // console.log(doc.data().mail);
  //     });
  //   });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <Text>ScoreScreen</Text>
      {score?.map(el => {
        console.log('🚀 ~ file: score.tsx ~ line 34 ~ ScoreScreen ~ el', el);
        return <Text>el?.name</Text>;
      })} */}
    </View>
  );
}

export default ScoreScreen;
