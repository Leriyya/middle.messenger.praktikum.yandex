import type { Page } from "../../App";
import { Button } from "../../components/button";
import Footer from "../../components/footer/footer";
import InputWithWarning from "../../components/inputWithError/inputWithWarning";
import Block from "../../framework/Block";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from "../../utils/validators";

interface SignupPageProps {
  changePage: (page: Page) => void;
}

export default class SignupPage extends Block {
  constructor(props: SignupPageProps) {
    super({
      ...props,
    });
  }

  init() {
    const changePage = this.props.changePage;
    const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
    const onChangeSecondNameBind = this.onChangeSecondName.bind(this);
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangeEmailBind = this.onChangeEmail.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    const onChangePhoneBind = this.onChangePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.props = {
      events: {
        submit: this.onSubmit,
      },
    };

    const SignupFooter = new Footer({
      changePage: changePage,
    });
    const SignupButton = new Button({
      text: "Зарегистрироваться",
      id: "enter",
      type: "submit",
      onClick: () => {
        console.log("signup");
      },
    });
    const InputFirstName = new InputWithWarning({
      type: "text",
      name: "first_name",
      class: "input",
      placeholder: "Введите имя",
      required: true,
      onBlur: onChangeFirstNameBind,
    });
    const InputSecondName = new InputWithWarning({
      type: "text",
      name: "second_name",
      class: "input",
      placeholder: "Введите фамилию",
      required: true,
      onBlur: onChangeSecondNameBind,
    });
    const InputLogin = new InputWithWarning({
      type: "text",
      name: "login",
      class: "input",
      placeholder: "Логин",
      required: true,
      onBlur: onChangeLoginBind,
    });
    const InputEmain = new InputWithWarning({
      type: "text",
      name: "email",
      class: "input",
      placeholder: "Почта",
      required: true,
      onBlur: onChangeEmailBind,
    });
    const InputPassword = new InputWithWarning({
      type: "password",
      name: "password",
      class: "input",
      placeholder: "Пароль",
      required: true,
      onBlur: onChangePasswordBind,
    });
    const InputPhone = new InputWithWarning({
      type: "text",
      name: "phone",
      class: "input",
      placeholder: "Номер телефона",
      required: true,
      onBlur: onChangePhoneBind,
    });

    this.children = {
      ...this.children,
      SignupFooter,
      SignupButton,
      InputFirstName,
      InputSecondName,
      InputLogin,
      InputEmain,
      InputPassword,
      InputPhone,
    };
    super.init();
  }

  onChangeFirstName(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateName(e.target.value);

    this.children.InputFirstName.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  onChangeSecondName(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateName(e.target.value);

    this.children.InputSecondName.setProps({
      error: !!errorText,
      errorText: errorText,
    });
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

  onChangeEmail(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateEmail(e.target.value);

    this.children.InputEmain.setProps({
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

  onChangePhone(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validatePhone(e.target.value);

    this.children.InputPhone.setProps({
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
    console.log("register data:", data);
  }

  override render() {
    return `
    <div class="pageContainer">
      <main class="pageContent">
        <h1>Регистрация</h1>
        <form id="loginForm" class="form">
          {{{ InputFirstName }}}
          {{{ InputSecondName }}}
          {{{ InputLogin }}}
          {{{ InputEmain }}}
          {{{ InputPassword }}}
          {{{ InputPhone }}}
    
          {{{ SignupButton }}}
        </form>
        
      </main>

      {{{ SignupFooter }}}
    </div>`;
  }
}
