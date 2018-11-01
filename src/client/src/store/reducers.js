import { combineReducers } from "redux";

import appReducer from "./app/reducers";
import authReducer from "./auth/reducers";
import liveDirectoryReducer from "./live-directory/reducers";
import projectDirectoryReducer from "./project-directory/reducers";
import nonEduDirectoryReducer from "./non-educational-directory/reducers";
import guidesDirectoryReducer from "./guides-directory/reducers";
import projectRequestsDirectoryReducer from "./project-requests/reducers";
import scheduleReducer from "./schedule/reducers";
import projectCreateReducer from "./project-create/reducers";

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  liveDirectory: liveDirectoryReducer,
  projectDirectory: projectDirectoryReducer,
  nonEduDirectory: nonEduDirectoryReducer,
  guidesDirectory: guidesDirectoryReducer,
  projectRequests: projectRequestsDirectoryReducer,
  schedule: scheduleReducer,
  projectCreate: projectCreateReducer
});
