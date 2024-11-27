import { combineReducers } from "@reduxjs/toolkit";
import users from "./usersSlice";
import emails from "./emailsSlice";
import user from "./userSlice";
import email from "./emailSlice";
import applicationSetting from "./applicationSettingSlice";
import applicationSettingSemester from "./applicationSettingSemesterSlice";

import bankInformationSetting from "./bankInformationSettingSlice";

const reducer = combineReducers({
  users,
  user,
  emails,
  email,
  applicationSetting,
  applicationSettingSemester,
  bankInformationSetting
});

export default reducer;
