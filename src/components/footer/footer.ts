import type { Page } from "../../App";
import Block from "../../framework/Block";
import { Link } from "../link";
import "./footer.scss";

interface FooterProps {
  changePage: (page: Page) => void;
}
export default class Footer extends Block {
  constructor(props: FooterProps) {
    super({
      LinkSignin: new Link({
        href: "#",
        "data-page": "signup",
        text: "Ещё не зарегистрированы?",
        class: "footer__link",
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage("signup");
        },
      }),
      LinkLogin: new Link({
        href: "#",
        "data-page": "signin",
        text: "Вход",
        class: "footer__link",
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage("signin");
        },
      }),
      LinkProfile: new Link({
        href: "#",
        "data-page": "profile",
        text: "В профиль",
        class: "footer__link",
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage("profile");
        },
      }),
      LinkProfileChange: new Link({
        href: "#",
        "data-page": "profileChange",
        text: "Редактировать профиль",
        class: "footer__link",
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage("profileChange");
        },
      }),
      LinkProfileChangePassword: new Link({
        href: "#",
        "data-page": "profileChangePassword",
        text: "Изменить пароль",
        class: "footer__link",
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage("profileChangePassword");
        },
      }),
      LinkMessenger: new Link({
        href: "#",
        "data-page": "messenger",
        text: "К чатам",
        class: "footer__link",
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage("messenger");
        },
      }),
      Link404: new Link({
        href: "#",
        "data-page": "404",
        text: "404",
        class: "footer__link",
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage("404");
        },
      }),
      Link500: new Link({
        href: "#",
        "data-page": "500",
        text: "500",
        class: "footer__link",
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage("500");
        },
      }),
    });
  }

  override render(): string {
    return `
    <footer class="footer">
      <nav>
        <ul>
          <li>
            {{{ LinkSignin }}}
          </li>
          <li>
            {{{ LinkLogin }}}
          </li>
          <li>
            {{{ LinkProfile }}}
          </li>
          <li>
            {{{ LinkProfileChange }}}
          </li>
          <li>
            {{{ LinkProfileChangePassword }}}
          </li>
          <li>
            {{{ LinkMessenger }}}
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            {{{ Link404 }}}
          </li>
          <li>
            {{{ Link500 }}}
          </li>
        </ul>
      </nav>
    </footer>`;
  }
}
