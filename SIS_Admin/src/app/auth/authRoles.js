/**
 * Authorization Roles
 */
const authRoles = {
  // Always put first position is the they own role name
  admin: ["admin"],
  student: ["student"],
  admission: ["admission", "admin"],
  academics: ["academics", "admin"],
  finance: ["finance", "admin"],
  instructors: ["instructors", "admin"],
  dashboardRole: [
    "student",
    "admission",
    "academics",
    "finance",
    "instructors",
    "admin",
  ],
  onlyGuest: [],
};

export default authRoles;
