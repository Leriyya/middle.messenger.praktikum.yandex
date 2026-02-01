import type { Page } from "../../App";
import { Button } from "../../components/button";
import Footer from "../../components/footer/footer";
import InputWithWarning from "../../components/inputWithError/inputWithWarning";
import { ChatsController } from "../../controllers/chats";
import { UserLoginController } from "../../controllers/user-login";
import { UserLogoutController } from "../../controllers/user-logout";
import Block from "../../utils/Block";
import { validateLogin, validatePassword } from "../../utils/validators";

interface SigninPageProps {
  changePage: (page: Page) => void;
  errorText?: string;
}

export default class SigninPage extends Block {
  private loginController: UserLoginController;
  private logoutController: UserLogoutController;
  private chatsController: ChatsController;

  constructor(props: SigninPageProps) {
    super({ ...props });
    this.loginController = new UserLoginController();
    this.logoutController = new UserLogoutController();
    this.chatsController = new ChatsController();
  }

  init() {
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.setProps({
      events: {
        submit: this.onSubmit,
      },
    });

    const LoginFooter = new Footer();
    const LoginButton = new Button({
      text: "Войти",
      id: "enter",
      type: "submit",
      onClick: () => {
        console.log("onclik");
      },
    });
    const LogoutButton = new Button({
      text: "Выйти",
      id: "exit",
      type: "button",
      onClick: () => {
        console.log("exit");
        this.onLogout();
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
      LogoutButton,
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

  async onSubmit(e: Event) {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      console.error("");
      return;
    }
    const formData = new FormData(e.target);

    const data = {
      login: formData.get("login") as string,
      password: formData.get("password") as string,
    };

    try {
      await this.loginController.login(data);
      await this.chatsController.fetchChats();
    } catch (error) {
      console.log("error", error, this.props);

      this.setProps({
        errorText: this.props.error?.reason || "Ошибка авторизации",
      });
    }
  }

  async onLogout() {
    try {
      await this.logoutController.logout();
      this.setProps({
        errorText: "",
      });
    } catch (error) {
      console.log("logout error", error, this.props);
    }
  }

  render() {
    return `
      <div class="page-container">
      <div class="logout">{{{ LogoutButton }}}</div>
        <main class="page-content">
          <h1>Вход</h1>
          <form id="loginForm" class="form">
            <div>
              {{{ InputLogin }}}
              {{{ InputPassword }}}
            </div>
            <div>
            {{{ LoginButton }}}
            {{#if errorText}}
              <div class="form__error">{{ errorText }}</div>
            {{/if}}
            </div>
          </form>
          
        </main>

        {{{ LoginFooter }}}
      </div>`;
  }
}
