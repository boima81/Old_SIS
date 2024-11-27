import { selectUser } from "app/store/userSlice";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ApplicantsWaitingApproval from "./widgets/ApplicantsWaitingApproval";
import ApplicationFees from "./widgets/ApplicationFees";
import BalanceFees from "./widgets/BalanceFees";
import CourseWidget from "./widgets/CourseWidget";
import CreditWidget from "./widgets/CreditWidget";
import GPAWidget from "./widgets/GPAWidget";
import ProgramWidget from "./widgets/ProgramWidget";
import RegiseredProgram from "./widgets/RegiseredProgram";
import RegisteredCoursesStudent from "./widgets/RegisterdCourses";
import RegisteredCourses from "./widgets/RegisteredCourses";
import RegisteredCreditHours from "./widgets/RegisteredCreditHours";
import RegisteredStudentApproval from "./widgets/RegisteredStudentApproval";
import RegistrationFees from "./widgets/RegistrationFees";
import StudentWidget from "./widgets/StudentWidget";
import WhatNext from "./widgets/WhatNext";
import authRoles from "../../../../../auth/authRoles";
import ApplicationFeesWaitingApproval from "./widgets/ApplicationFeesWaitingApproval";
import RegistrationFeesWaitingApproval from "./widgets/RegistrationFeesWaitingApproval";
import TotalRegistrationBalance from "./widgets/TotalRegistrationBalance";
import TotalStudentsAssignCoursesWidget from "./widgets/TotalStudentsAssignCoursesWidget";
import TotalAssignCoursesWidget from "./widgets/TotalAssignCoursesWidget";
import TotalStudentWaitingForGradeWidget from "./widgets/TotalStudentWaitingForGradeWidget";
import BalanceOverageWidget from "./widgets/BalanceOverageWidget";

function HomeTab() {
  const user = useSelector(selectUser);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const isStudentRole = user?.role?.includes("student");
  const currentUserRole = user?.role?.[0];

  const admissionRole = currentUserRole === authRoles?.admission?.[0];
  const academicRole = currentUserRole === authRoles?.academics?.[0];
  const financeRole = currentUserRole === authRoles?.finance?.[0];
  const instructorsRole = currentUserRole === authRoles?.instructors?.[0];
  const adminRole = currentUserRole === authRoles?.admin?.[0];

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {isStudentRole ? (
        <>
          {/* <motion.div variants={item}>
            <ProcessWidget user={user} />
          </motion.div> */}

          <motion.div variants={item}>
            <WhatNext user={user} />
          </motion.div>
          <motion.div variants={item}>
            <CourseWidget user={user} />
          </motion.div>
          <motion.div variants={item}>
            <CreditWidget user={user} />
          </motion.div>
          {/* <motion.div variants={item} /> */}
          <motion.div variants={item}>
            <RegiseredProgram user={user} />
          </motion.div>
          <motion.div variants={item}>
            <RegisteredCoursesStudent user={user} />
          </motion.div>
          <motion.div variants={item}>
            <BalanceFees user={user} />
          </motion.div>
          <motion.div variants={item}>
            <GPAWidget user={user} />
          </motion.div>
          <motion.div  variants={item}>
            <BalanceOverageWidget user={user} />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div hidden={!admissionRole && !adminRole} variants={item}>
            <ApplicantsWaitingApproval user={user} />
          </motion.div>
          <motion.div hidden={!admissionRole && !adminRole} variants={item}>
            <RegisteredStudentApproval user={user} />
          </motion.div>
          <motion.div
            hidden={!admissionRole && !adminRole && !academicRole}
            variants={item}
          >
            <StudentWidget user={user} />
          </motion.div>
          <motion.div hidden={!academicRole && !adminRole} variants={item}>
            <ProgramWidget user={user} />
          </motion.div>
          {/* <motion.div hidden={!financeRole && !adminRole} variants={item}>
            <ApplicationFees user={user} />
          </motion.div> */}
          {/* <motion.div hidden={!financeRole && !adminRole} variants={item}>
            <RegistrationFees user={user} />
          </motion.div> */}
          <motion.div hidden={!academicRole && !adminRole} variants={item}>
            <RegisteredCourses user={user} />
          </motion.div>
          <motion.div hidden={!academicRole && !adminRole} variants={item}>
            <RegisteredCreditHours user={user} />
          </motion.div>
          {/* <motion.div hidden={!financeRole && !adminRole} variants={item}>
            <ApplicationFeesWaitingApproval user={user} />
          </motion.div> */}
          <motion.div hidden={!financeRole && !adminRole} variants={item}>
            <RegistrationFeesWaitingApproval user={user} />
          </motion.div>
          {/* <motion.div hidden={!financeRole && !adminRole} variants={item}>
            <TotalRegistrationBalance user={user} />
          </motion.div> */}
          <motion.div hidden={!instructorsRole && !adminRole} variants={item}>
            <TotalStudentsAssignCoursesWidget user={user} />
          </motion.div>
          <motion.div hidden={!instructorsRole} variants={item}>
            <TotalAssignCoursesWidget user={user} />
          </motion.div>
          <motion.div hidden={!instructorsRole} variants={item}>
            <TotalStudentWaitingForGradeWidget user={user} />
          </motion.div>
          <motion.div hidden={!adminRole} variants={item}>
            <BalanceOverageWidget user={user} />
          </motion.div>

        </>
      )}
      {/* <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
        <GithubIssuesWidget />
      </motion.div> */}
      {/* TODO: Don't remove below part */}
      {/* {isStudentRole ? (
        <>
          <motion.div variants={item} className="sm:col-span-2 md:col-span-4 lg:col-span-2">
            <AnnouncementWidget user={user} />
          </motion.div>
          <motion.div variants={item} className="sm:col-span-2 md:col-span-4 lg:col-span-2">
            <EventWidget user={user} />
          </motion.div>
        </>
      ) : (
        <></>
      )} */}
    </motion.div>
  );
}

export default HomeTab;
