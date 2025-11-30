import Handlebars from "handlebars";
import * as Pages from "./pages";

import { Input } from "./components/input";
import { Button } from "./components/button";
import { Link } from "./components/link";
import { ProfileString } from "./components/profileString";
import { Avatar } from "./components/avatar";
import { Chat } from "./components/chat";
import { Footer } from "./components/footer";

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("ProfileString", ProfileString);
Handlebars.registerPartial("Avatar", Avatar);
Handlebars.registerPartial("Chat", Chat);
Handlebars.registerPartial("Footer", Footer);

type Page =
  | "login"
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

const PAGES_MAP: Record<Page, string> = {
  login: Pages.Login,
  signup: Pages.Signup,
  profile: Pages.Profile,
  profileChange: Pages.ProfileChange,
  profileChangePassword: Pages.ProfileChangePassword,
  messenger: Pages.Messenger,
  "404": Pages.Page404,
  "500": Pages.Page500,
};

export default class App {
  private state: AppState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: "login",
    };
    this.appElement = document.getElementById("app");
  }

  stringToDOM(html: string): DocumentFragment {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content;
  }

  render() {
    if (!this.appElement) return;

    const templateString = PAGES_MAP[this.state.currentPage];
    const template = Handlebars.compile(templateString);

    const html = template({});

    this.appElement.replaceChildren(this.stringToDOM(html));

    this.attachEventListeners();
  }

  attachEventListeners() {
    const footerLinks = document.querySelectorAll("[data-page]");

    footerLinks.forEach((link) => {
      link.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement | null;

        if (!(target instanceof HTMLElement)) return;

        const linkElement = target?.closest("[data-page]");

        if (!(linkElement instanceof HTMLElement)) return;

        e.preventDefault();

        const page = linkElement.dataset.page;
        if (page) {
          this.changePage(page);
        }
      });
    });
  }

  changePage(page: any) {
    this.state.currentPage = page;
    this.render();
  }
}
