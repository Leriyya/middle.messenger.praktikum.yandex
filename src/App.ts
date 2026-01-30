import SigninPage from "./pages/signin/signin";
import SignupPage from "./pages/signup/signup";
import MessengerPage from "./pages/messenger/messenger";
import ProfilePage from "./pages/profile/profile";
import ProfileChangePage from "./pages/profileChange/profileChange";
import ProfileChangePasswordPage from "./pages/profileChangePassword/profileChangePassword";
import { Page404, Page500 } from "./pages";
import { router } from "./utils/router/Router";
import { onlyAuth, onlyGuest } from "./utils/guards";

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
      .use("/", SigninPage, { guard: onlyGuest, redirect: "/messenger" })
      .use("/signin", SigninPage, { guard: onlyGuest, redirect: "/messenger" })
      .use("/signup", SignupPage, { guard: onlyGuest, redirect: "/messenger" })
      .use("/messenger", MessengerPage, { guard: onlyAuth, redirect: "/signin" })
      .use("/profile", ProfilePage, { guard: onlyAuth, redirect: "/signin" })
      .use("/profileChange", ProfileChangePage, { guard: onlyAuth, redirect: "/signin" })
      .use("/profileChangePassword", ProfileChangePasswordPage, { guard: onlyAuth, redirect: "/signin" })
      .use("/404", Page404)
      .use("/500", Page500)
      .start();
  }
}
