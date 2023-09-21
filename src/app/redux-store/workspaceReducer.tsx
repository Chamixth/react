// workspaceReducer.js

import { CLEAR_WORKSPACE_ID, CLEAR_WORKSPACE_NAME, SET_WORKSPACE_DATA, SET_WORKSPACE_ID, SET_WORKSPACE_NAME } from './workspaceActions';

const initialState = {
  workspaceData: null,
};

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKSPACE_DATA:
      return {
        ...state,
        workspaceData: action.payload,
      };
      case SET_WORKSPACE_ID:
        return {
          ...state,
          workspaceId: action.payload,
        };
      case CLEAR_WORKSPACE_ID:
        return {
          ...state,
          workspaceId: null,
        };
      case SET_WORKSPACE_NAME:
        return {
          ...state,
          workspaceName: action.payload,
        };
      case CLEAR_WORKSPACE_NAME:
        return {
          ...state,
          workspaceName: null,
        };
    default:
      return state;
  }
};

export default workspaceReducer;
