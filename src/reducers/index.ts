import produce from 'immer';

const initialState = {
  scoresList: [],
  name: '',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_SCORES_SUCCESS':
      const { payload } = action;

      return produce(state, draftState => {
        draftState.scoresList = payload;
      });

    default:
      return state;
  }
};
export default reducer;
