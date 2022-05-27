import firestore from '@react-native-firebase/firestore';
import { navigationRef } from '../router';
import { CommonActions } from '@react-navigation/native';

const middleware = (store: any) => (next: any) => (action: any) => {


  next(action);

  const { dispatch, getState } = store;
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_SCORES': {
      dispatch(async function fetch() {
        const snapshot = await firestore().collection('score').get();
        const data = snapshot.docs.map(doc => doc.data());
        const scoreList = data.map(el => {
          return {
            name: el.name,
            score: el.score,
          };
        });
        dispatch({
          type: 'FETCH_SCORES_SUCCESS',
          payload: scoreList,
        });
      });
      break;
    }
    case 'ADD_SCORE': {
      const { userName } = getState();
      dispatch(async function add() {
        firestore().collection('score').add({
          name: userName,
          score: payload,
          date: new Date(),
        });
      });
    }
      break;
    case 'USER_LOSE': {
      dispatch({ type: 'ADD_SCORE', payload });
      navigationRef?.current?.dispatch(
        CommonActions.reset({
          routes: [
            { name: 'Score' },
          ],
        }));
      break;
    }

  }
};

export default middleware;
