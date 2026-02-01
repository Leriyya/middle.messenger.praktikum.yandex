import { resourcesUrl } from "../../api/base-api";
import type { UserProfileRequest } from "../../api/user-api";
import type { Page } from "../../App";
import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import Footer from "../../components/footer/footer";
import InputWithWarning from "../../components/inputWithError/inputWithWarning";
import { UserController } from "../../controllers/user-profile";
import { withUser } from "../../store/hoc";
import Block from "../../utils/Block";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from "../../utils/validators";

interface ProfileChangePageProps {
  changePage: (page: Page) => void;
  user?: UserProfileRequest;
}

class ProfileChangePage extends Block {
  private profileChangeController: UserController;

  constructor(props: ProfileChangePageProps) {
    super({ ...props });
    this.profileChangeController = new UserController();
  }

  init() {
    const avatarSrc = this.props.user?.avatar
      ? `${resourcesUrl}${this.props.user.avatar}`
      : "/public/default-avatar.png";

    const userController = new UserController();

    const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
    const onChangeSecondNameBind = this.onChangeSecondName.bind(this);
    const onChangeEmailBind = this.onChangeEmail.bind(this);
    const onChangeDisplayName = this.onChangeDisplayName.bind(this);
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangePhoneBind = this.onChangePhone.bind(this);
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
    const ProfileChangeButton = new Button({
      text: "Сохранить",
      id: "enter",
      type: "submit",
      onClick: () => {
        console.log("save profile change");
      },
    });
    const InputFirstName = new InputWithWarning({
      type: "text",
      name: "first_name",
      placeholder: "Введите имя",
      value: this.props.user?.first_name ?? "",
      onBlur: onChangeFirstNameBind,
    });
    const InputSecondName = new InputWithWarning({
      type: "text",
      name: "second_name",
      placeholder: "Введите фамилию",
      value: this.props.user?.second_name ?? "",
      onBlur: onChangeSecondNameBind,
    });
    const InputEmail = new InputWithWarning({
      type: "text",
      name: "email",
      placeholder: "Введите почту",
      value: this.props.user?.email ?? "",
      onBlur: onChangeEmailBind,
    });
    const InputDisplayName = new InputWithWarning({
      type: "text",
      name: "display_name",
      placeholder: "Введите ник",
      value: this.props.user?.display_name ?? "",
      onBlur: onChangeDisplayName,
    });
    const InputLogin = new InputWithWarning({
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      value: this.props.user?.login ?? "",
      onBlur: onChangeLoginBind,
    });
    const InputPhone = new InputWithWarning({
      type: "text",
      name: "phone",
      placeholder: "Введите номер",
      value: this.props.user?.phone ?? "",
      onBlur: onChangePhoneBind,
    });

    this.children = {
      ...this.children,
      ProfileChangeFooter,
      ProfileChangeAvatar,
      ProfileChangeButton,
      InputFirstName,
      InputSecondName,
      InputEmail,
      InputDisplayName,
      InputLogin,
      InputPhone,
    };

    userController.fetchUser();
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

  onChangeEmail(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateEmail(e.target.value);
    this.children.InputEmail.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  onChangeDisplayName(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateName(e.target.value);
    this.children.InputDisplayName.setProps({
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

    const data = {
      login: formData.get("login") as string,
      first_name: formData.get("first_name") as string,
      display_name: formData.get("display_name") as string,
      email: formData.get("email") as string,
      second_name: formData.get("second_name") as string,
      phone: formData.get("phone") as string,
    };

    console.log("profile change data:", data);
    this.profileChangeController.updateProfile(data);
  }

  protected componentDidUpdate(
    oldProps: ProfileChangePageProps,
    newProps: ProfileChangePageProps
  ): boolean {
    if (oldProps.user !== newProps.user && newProps.user) {
      this.children.ProfileChangeAvatar.setProps({
        src: newProps.user?.avatar
          ? `${resourcesUrl}${newProps.user.avatar}`
          : "/public/default-avatar.png",
      });

      this.children.InputFirstName.setProps({
        value: newProps.user?.first_name ?? "",
      });

      this.children.InputSecondName.setProps({
        value: newProps.user?.second_name ?? "",
      });

      this.children.InputEmail.setProps({
        value: newProps.user?.email ?? "",
      });

      this.children.InputDisplayName.setProps({
        value: newProps.user?.display_name ?? "",
      });

      this.children.InputLogin.setProps({
        value: newProps.user?.login ?? "",
      });

      this.children.InputPhone.setProps({
        value: newProps.user?.phone ?? "",
      });
    }

    return false;
  }

  render() {
    return `
    <div class="page-container">
      <main class="page-content page-content__profile">
        {{{ ProfileChangeAvatar }}}
        <form id="profile-form" class="form">
          <div>
            {{{ InputFirstName }}}
            {{{ InputSecondName }}}
            {{{ InputEmail }}}
            {{{ InputDisplayName }}}
            {{{ InputLogin }}}
            {{{ InputPhone }}}
          </div>
          {{{ ProfileChangeButton }}}
        </form>
      </main>
      {{{ ProfileChangeFooter }}} 
    </div>
    `;
  }
}

export default withUser(ProfileChangePage);
