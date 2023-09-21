// store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import workspaceReducer from './workspaceReducer';

// Combine all your reducers here if you have multiple reducers
const rootReducer = combineReducers({
  workspace: workspaceReducer,
  workspaceId: workspaceReducer,
  workspaceName: workspaceReducer,
});

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
