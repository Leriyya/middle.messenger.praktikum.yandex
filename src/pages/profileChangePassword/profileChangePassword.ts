import { resourcesUrl } from "../../api/base-api";
import type { Page } from "../../App";
import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import Footer from "../../components/footer/footer";
import InputWithWarning from "../../components/inputWithError/inputWithWarning";
import { UserController } from "../../controllers/user-profile";
import { withUser } from "../../store/hoc";
import Block from "../../utils/Block";
import { validatePassword } from "../../utils/validators";

interface ProfileChangePasswordPageProps {
  changePage: (page: Page) => void;
}

class ProfileChangePasswordPage extends Block {
  private profileChangePasswordController: UserController;

  constructor(props: ProfileChangePasswordPageProps) {
    super({ ...props });
    this.profileChangePasswordController = new UserController();
  }

  init() {
    const avatarSrc = this.props.user?.avatar
      ? `${resourcesUrl}${this.props.user.avatar}`
      : "/public/default-avatar.png";

    const userController = new UserController();

    const onChangeOldPasswordBind = this.onChangeOldPassword.bind(this);
    const onChangeNewPasswordBind = this.onChangeNewPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.setProps({
      events: {
        submit: this.onSubmit,
      },
    });

    const ProfileChangeFooter = new Footer();
    const ProfileChangeAvatar = new Avatar({
      id: "avatar",
      src: avatarSrc,
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

    userController.fetchUser();
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
    const data = {
      oldPassword: formData.get("oldPassword") as string,
      newPassword: formData.get("newPassword") as string,
    };

    this.profileChangePasswordController.changePassword(data);
    console.log("profile change password data:", data);
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.user !== newProps.user && newProps.user) {
      this.children.ProfileChangeAvatar.setProps({
        src: newProps.user?.avatar
          ? `${resourcesUrl}${newProps.user.avatar}`
          : "/public/default-avatar.png",
      });
    }

    return false;
  }

  render() {
    return `
    <div class="page-container">
      <main class="page-content page-content__profile">
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

export default withUser(ProfileChangePasswordPage);
