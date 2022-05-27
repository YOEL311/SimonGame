import produce from 'immer';

interface IState {
  scoresList: string[];
  userName: string;
}

interface IActionFetchSuccess {
  type: 'FETCH_SCORES_SUCCESS';
  payload: string[];
}

interface IActionSetUserName {
  type: 'SET_USER_NAME';
  payload: string;
}

type IActions = IActionFetchSuccess | IActionSetUserName

const initialState = {
  scoresList: [],
  userName: '',
};

const reducer = (state: IState = initialState, action: IActions) => {
  const { payload } = action;
  switch (action.type) {
    case 'FETCH_SCORES_SUCCESS':
      return produce(state, draftState => {
        draftState.scoresList = payload as IActionFetchSuccess['payload'];
      });
    case 'SET_USER_NAME':
      return produce(state, draftState => {
        draftState.userName = payload as IActionSetUserName['payload'];
      });
    default:
      return state;
  }
};
export default reducer;
