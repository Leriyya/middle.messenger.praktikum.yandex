import SigninPage from "./pages/signin/signin";
import SignupPage from "./pages/signup/signup";
import MessengerPage from "./pages/messenger/messenger";
import ProfilePage from "./pages/profile/profile";
import ProfileChangePage from "./pages/profileChange/profileChange";
import ProfileChangePasswordPage from "./pages/profileChangePassword/profileChangePassword";
import { Page404, Page500 } from "./pages";
import { router } from "./utils/router/Router";

export type Page =
  | "signin"
  | "signup"
  | "profile"
  | "profileChange"
  | "profileChangePassword"
  | "messenger"
  | "404"
  | "500";

export default class App {
  constructor() {
    router
      .use("/", SigninPage)
      .use("/signin", SigninPage)
      .use("/signup", SignupPage)
      .use("/messenger", MessengerPage)
      .use("/profile", ProfilePage)
      .use("/profileChange", ProfileChangePage)
      .use("/profileChangePassword", ProfileChangePasswordPage)
      .use("/404", Page404)
      .use("/500", Page500)
      .start();
  }
}
