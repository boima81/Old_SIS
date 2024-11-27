import AcademicsAppConfig from "../academics/AcademicsAppConfig";
import AdmissionAppConfig from "../Admission/AdmissionAppConfig";
import FinanceAppConfig from "../Finance/FinanceAppConfig";
import GradAppConfig from "../Grad/GradAppConfig";
import SettingsAppConfig from "../settings/SettingsAppConfig";
import TranscriptAppConfig from "../Transcript/TranscriptAppConfig";
import ProfileAppConfig from "./profile/profileAppConfig";
import AgencyAppConfig from "../Agency/AgencyAppConfig";

const appsConfigs = [
  ProfileAppConfig,
  SettingsAppConfig,
  AdmissionAppConfig,
  AcademicsAppConfig,
  FinanceAppConfig,
  GradAppConfig,
  TranscriptAppConfig,
  AgencyAppConfig,
];

export default appsConfigs;
