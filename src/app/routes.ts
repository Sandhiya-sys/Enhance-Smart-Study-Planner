import { createBrowserRouter } from "react-router";
import { LoginSignup } from "./components/LoginSignup";
import { Dashboard } from "./components/Dashboard";
import { Profile } from "./components/Profile";
import { SubjectInput } from "./components/SubjectInput";
import { StudyPlanner } from "./components/StudyPlanner";
import { SyllabusUpload } from "./components/SyllabusUpload";
import { Quiz } from "./components/Quiz";
import { Result } from "./components/Result";
import { Leaderboard } from "./components/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginSignup,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/subject-input",
    Component: SubjectInput,
  },
  {
    path: "/planner",
    Component: StudyPlanner,
  },
  {
    path: "/syllabus",
    Component: SyllabusUpload,
  },
  {
    path: "/quiz",
    Component: Quiz,
  },
  {
    path: "/result",
    Component: Result,
  },
  {
    path: "/leaderboard",
    Component: Leaderboard,
  },
]);
