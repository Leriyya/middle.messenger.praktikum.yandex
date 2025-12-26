import SigninPage from "./pages/signin/signin";
import SignupPage from "./pages/signup/signup";
import MessengerPage from "./pages/messenger/messenger";
import ProfilePage from "./pages/profile/profile";
import ProfileChangePage from "./pages/profileChange/profileChange";
import ProfileChangePasswordPage from "./pages/profileChangePassword/profileChangePassword";
import { Page404, Page500 } from "./pages";

export type Page =
  | "signin"
  | "signup"
  | "profile"
  | "profileChange"
  | "profileChangePassword"
  | "messenger"
  | "404"
  | "500";

interface AppState {
  currentPage: Page;
}

export default class App {
  private state: AppState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: "signin",
    };
    this.appElement = document.getElementById("app");
    this.changePage = this.changePage.bind(this);
  }

  stringToDOM(html: string): DocumentFragment {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content;
  }

  public changePage(page: Page) {
    this.state.currentPage = page;
    this.render();
  }

  render(): string {
    if (!this.appElement) {
      this.appElement = document.getElementById("app");
      if (!this.appElement) {
        console.error("App element not found");
        return "";
      }
    }

    const props = {
      _app: this,
      changePage: this.changePage.bind(this),
    };

    let pageInstance;

    if (this.state.currentPage === "signin") {
      pageInstance = new SigninPage(props);
    } else if (this.state.currentPage === "signup") {
      pageInstance = new SignupPage(props);
    } else if (this.state.currentPage === "messenger") {
      pageInstance = new MessengerPage(props);
    } else if (this.state.currentPage === "profile") {
      pageInstance = new ProfilePage(props);
    } else if (this.state.currentPage === "profileChange") {
      pageInstance = new ProfileChangePage(props);
    } else if (this.state.currentPage === "profileChangePassword") {
      pageInstance = new ProfileChangePasswordPage(props);
    } else if (this.state.currentPage === "404") {
      pageInstance = new Page404(props);
    } else if (this.state.currentPage === "500") {
      pageInstance = new Page500(props);
    }

    if (pageInstance) {
      const content = pageInstance.getContent();

      this.appElement.innerHTML = "";
      this.appElement.appendChild(content);
    }

    return "";
  }
}
