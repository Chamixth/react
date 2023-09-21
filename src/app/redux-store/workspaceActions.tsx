// workspaceActions.js

// Define action types
export const SET_WORKSPACE_DATA = 'SET_WORKSPACE_DATA';
export const SET_WORKSPACE_ID = 'SET_WORKSPACE_ID';
export const SET_WORKSPACE_NAME = 'SET_WORKSPACE_NAME';
export const CLEAR_WORKSPACE_NAME = 'CLEAR_WORKSPACE_NAME';
export const CLEAR_WORKSPACE_ID = 'CLEAR_WORKSPACE_ID';

// Define action creators
export const setWorkspaceData = (data) => {
  return {
    type: SET_WORKSPACE_DATA,
    payload: data,
  };
};

export const setWorkspaceId = (id) => {
  return { type: SET_WORKSPACE_ID, payload: id };
};

export const clearWorkspaceId = () => {
  return { type: CLEAR_WORKSPACE_ID };
};

export const setWorkspaceName = (name) => {
  return { type: SET_WORKSPACE_NAME, payload: name };
};

export const clearWorkspaceName = () => {
  return { type: CLEAR_WORKSPACE_NAME };
};

export const getWorkspaceById = (state) => {
  const workspaceData = state.workspace.workspaceData;
  const workspaceId = state.workspace.workspaceId;
  if (!workspaceData || !workspaceId) {
    return null;
  }
  // Find and return the relevant object from workspaceData based on workspaceId
  return workspaceData.find((workspace) => workspace.workspaceId === workspaceId);
};