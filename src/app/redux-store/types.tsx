import { WorkspaceModel } from "../models/workspace_model";

// types.ts
export interface RootState {
    workspace: {
      workspaceData: WorkspaceModel[] | null;
      workspaceId:string | null;
      workspaceName:string | null;
      // Add other properties of the workspace state if any
    }
  
  }
  