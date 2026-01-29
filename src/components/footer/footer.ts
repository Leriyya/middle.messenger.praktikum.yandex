import Block from "../../utils/Block";
import { Link } from "../link";
import "./footer.scss";

export default class Footer extends Block {
  constructor() {
    super({
      LinkSignin: new Link({
        href: "/signup",
        "data-page": "signup",
        text: "Ещё не зарегистрированы?",
        class: "footer__link",
      }),
      LinkLogin: new Link({
        href: "/signin",
        "data-page": "signin",
        text: "Вход",
        class: "footer__link",
      }),
      LinkProfile: new Link({
        href: "/profile",
        "data-page": "profile",
        text: "В профиль",
        class: "footer__link",
      }),
      LinkProfileChange: new Link({
        href: "/profileChange",
        "data-page": "profileChange",
        text: "Редактировать профиль",
        class: "footer__link",
      }),
      LinkProfileChangePassword: new Link({
        href: "/profileChangePassword",
        "data-page": "profileChangePassword",
        text: "Изменить пароль",
        class: "footer__link",
      }),
      LinkMessenger: new Link({
        href: "/messenger",
        "data-page": "messenger",
        text: "К чатам",
        class: "footer__link",
      }),
      Link404: new Link({
        href: "/404",
        "data-page": "404",
        text: "404",
        class: "footer__link",
      }),
      Link500: new Link({
        href: "/500",
        "data-page": "500",
        text: "500",
        class: "footer__link",
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
