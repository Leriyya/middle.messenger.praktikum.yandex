import type { Page } from "../../App";
import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import Footer from "../../components/footer/footer";
import InputWithWarning from "../../components/inputWithError/inputWithWarning";
import Block from "../../framework/Block";
import { validatePassword } from "../../utils/validators";

interface ProfileChangePasswordPageProps {
  changePage: (page: Page) => void;
}

export default class ProfileChangePasswordPage extends Block {
  constructor(props: ProfileChangePasswordPageProps) {
    super({ ...props });
  }

  init() {
    const changePage = this.props.changePage;
    const onChangeOldPasswordBind = this.onChangeOldPassword.bind(this);
    const onChangeNewPasswordBind = this.onChangeNewPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.props = {
      events: {
        submit: this.onSubmit,
      },
    };

    const ProfileChangeFooter = new Footer({
      changePage: changePage,
    });
    const ProfileChangeAvatar = new Avatar({
      id: "avatar",
      src: "../../../public/dog.jpg",
      alt: "avatar",
    });
    const ProfileChangePasswordButton = new Button({
      text: "Сохранить",
      id: "enter",
      type: "submit",
      onClick: () => {
        console.log("save password change");
      },
    });
    const InputOldPassword = new InputWithWarning({
      type: "password",
      name: "oldPassword",
      class: "input",
      placeholder: "Введите старый пароль",
      onBlur: onChangeOldPasswordBind,
    });
    const InputNewPassword = new InputWithWarning({
      type: "password",
      name: "newPassword",
      class: "input",
      placeholder: "Введите новый пароль",
      onBlur: onChangeNewPasswordBind,
    });

    this.children = {
      ...this.children,
      ProfileChangeFooter,
      ProfileChangeAvatar,
      ProfileChangePasswordButton,
      InputOldPassword,
      InputNewPassword,
    };
    super.init();
  }

  onChangeOldPassword(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validatePassword(e.target.value);
    this.children.InputOldPassword.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  onChangeNewPassword(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validatePassword(e.target.value);
    this.children.InputNewPassword.setProps({
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
    console.log("profile change password data:", data);
  }

  render() {
    return `
    <div class="pageContainer">
      <main class="pageContent pageContent__profile">
        {{{ ProfileChangeAvatar }}}
        <form id="profileForm" class="form">
          <div>
            {{{ InputOldPassword }}}
            {{{ InputNewPassword }}}
          </div>
          {{{ ProfileChangePasswordButton }}}
        </form>
      </main>
      {{{ ProfileChangeFooter }}} 
    </div>
    `;
  }
}
