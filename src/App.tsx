import * as React from 'react';
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import Router from './router';
import rootReducer from './reducers';
import middleware from './middlewares';

const middlewareEnhancer = applyMiddleware(thunkMiddleware, middleware);

const store = createStore(rootReducer, middlewareEnhancer);

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
