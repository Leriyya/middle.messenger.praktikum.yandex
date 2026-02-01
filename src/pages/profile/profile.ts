import { resourcesUrl } from "../../api/base-api";
import type { UserProfileRequest } from "../../api/user-api";
import type { Page } from "../../App";
import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import Footer from "../../components/footer/footer";
import { ProfileString } from "../../components/profileString";
import { UserLogoutController } from "../../controllers/user-logout";
import { UserController } from "../../controllers/user-profile";
import { withUser } from "../../store/hoc";
import Block from "../../utils/Block";
import { Router } from "../../utils/router";

interface ProfilePageProps {
  changePage: (page: Page) => void;
  user?: UserProfileRequest;
}

class ProfilePage extends Block {
  private logoutController: UserLogoutController;

  constructor(props: ProfilePageProps) {
    super({ ...props });
    this.logoutController = new UserLogoutController();
  }

  init() {
    console.log("1 profile this.props.user", this.props.user);
    const avatarSrc = this.props.user?.avatar
      ? `${resourcesUrl}${this.props.user.avatar}`
      : "/public/default-avatar.png";

    const router = new Router("#app");
    const userController = new UserController();
    const ProfileFooter = new Footer();
    const ProfileChangeAvatar = new Avatar({
      id: "avatar",
      src: avatarSrc,
      alt: "avatar",
    });
    const ProfileButton = new Button({
      text: "Редактировать",
      id: "enter",
      type: "button",
      onClick: (event: Event) => {
        console.log("go edit");
        event.preventDefault();
        router.go("/profileChange");
      },
    });
    const ExitButton = new Button({
      text: "Выйти",
      id: "exit",
      type: "button",
      onClick: (event: Event) => {
        console.log("exit");
        event.preventDefault();
        this.onLogout();
        router.go("/signin");
      },
    });
    const EmailField = new ProfileString({
      id: "email",
      name: "Почта",
      value: this.props.user?.email ?? "",
    });
    const FirstNameField = new ProfileString({
      id: "first_name",
      name: "Имя",
      value: this.props.user?.first_name ?? "",
    });
    const SecondNameField = new ProfileString({
      id: "second_name",
      name: "Фамилия",
      value: this.props.user?.second_name ?? "",
    });
    const DisplayNameField = new ProfileString({
      id: "display_name",
      name: "Ник",
      value: this.props.user?.display_name ?? "",
    });
    const LoginField = new ProfileString({
      id: "login",
      name: "Логин",
      value: this.props.user?.login ?? "",
    });
    const PhoneField = new ProfileString({
      id: "phone",
      name: "Номер телефона",
      value: this.props.user?.phone ?? "",
    });

    this.children = {
      ...this.children,
      ProfileFooter,
      ProfileChangeAvatar,
      ProfileButton,
      ExitButton,
      EmailField,
      FirstNameField,
      SecondNameField,
      DisplayNameField,
      LoginField,
      PhoneField,
    };

    userController.fetchUser();

    super.init();
  }

  protected componentDidUpdate(
    oldProps: ProfilePageProps,
    newProps: ProfilePageProps
  ): boolean {
    if (oldProps.user !== newProps.user) {
      this.children.ProfileChangeAvatar.setProps({
        src: newProps.user?.avatar
          ? `${resourcesUrl}${newProps.user.avatar}`
          : "/public/default-avatar.png",
      });

      this.children.EmailField.setProps({
        value: newProps.user?.email ?? "",
      });

      this.children.FirstNameField.setProps({
        value: newProps.user?.first_name ?? "",
      });

      this.children.SecondNameField.setProps({
        value: newProps.user?.second_name ?? "",
      });

      this.children.DisplayNameField.setProps({
        value: newProps.user?.display_name ?? "",
      });

      this.children.LoginField.setProps({
        value: newProps.user?.login ?? "",
      });

      this.children.PhoneField.setProps({
        value: newProps.user?.phone ?? "",
      });
    }

    return false;
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
      <main class="page-content page-content__profile">
        {{{ ProfileChangeAvatar }}}
       
        <form id="login-form" class="form">
          {{{ EmailField }}}
          {{{ FirstNameField }}}
          {{{ SecondNameField }}}
          {{{ DisplayNameField }}}
          {{{ LoginField }}}
          {{{ PhoneField }}}
    
          {{{ ProfileButton }}}
          {{{ ExitButton }}}
        </form>
      </main>
      {{{ ProfileFooter }}}
   </div>`;
  }
}

export default withUser(ProfilePage);
