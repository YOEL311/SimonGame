import firestore from '@react-native-firebase/firestore';

const fetchMiddleware = (store: any) => (next: any) => (action: any) => {
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
      dispatch(async function add() {
        firestore().collection('score').add({
          name: 'Elior',
          score: 80,
          date: new Date(),
        });
      });
    }
  }
};

export default fetchMiddleware;
