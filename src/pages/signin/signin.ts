import type { Page } from "../../App";
import { Button } from "../../components/button";
import Footer from "../../components/footer/footer";
import InputWithWarning from "../../components/inputWithError/inputWithWarning";
import Block from "../../framework/Block";
import { validateLogin, validatePassword } from "../../utils/validators";

interface SigninPageProps {
  changePage: (page: Page) => void;
}

export default class SigninPage extends Block {
  constructor(props: SigninPageProps) {
    super({ ...props });
  }

  init() {
    const changePage = this.props.changePage;
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.props = {
      events: {
        submit: this.onSubmit,
      },
    };

    const LoginFooter = new Footer({
      changePage: changePage,
    });
    const LoginButton = new Button({
      text: "Войти",
      id: "enter",
      type: "submit",
      onClick: () => {
        console.log("onclik");
      },
    });
    const InputLogin = new InputWithWarning({
      type: "text",
      name: "login",
      class: "input",
      placeholder: "Введите логин",
      onBlur: onChangeLoginBind,
    });
    const InputPassword = new InputWithWarning({
      class: "input",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
      onBlur: onChangePasswordBind,
    });

    this.children = {
      ...this.children,
      LoginFooter,
      LoginButton,
      InputLogin,
      InputPassword,
    };
    super.init();
  }

  onChangeLogin(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateLogin(e.target.value);

    this.children.InputLogin.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  onChangePassword(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validatePassword(e.target.value);

    this.children.InputPassword.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      console.error("");
      return;
    }
    const formData = new FormData(e.target);
    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("login data:", data);
  }

  render() {
    return `
      <div class="pageContainer">
        <main class="pageContent">
          <h1>Вход</h1>
          <form id="loginForm" class="form">
            <div>
              {{{ InputLogin }}}
              {{{ InputPassword }}}
            </div>
            {{{ LoginButton }}}
          </form>
          
        </main>

        {{{ LoginFooter }}}
      </div>`;
  }
}
