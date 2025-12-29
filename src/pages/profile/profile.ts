import type { Page } from "../../App";
import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import Footer from "../../components/footer/footer";
import { ProfileString } from "../../components/profileString";
import Block from "../../framework/Block";

interface ProfilePageProps {
  changePage: (page: Page) => void;
}

export default class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super({ ...props });
  }

  init() {
    const ProfileFooter = new Footer({
      changePage: this.props.changePage,
    });
    const ProfileChangeAvatar = new Avatar({
      id: "avatar",
      src: "../../../public/dog.jpg",
      alt: "avatar",
    });
    const ProfileButton = new Button({
      text: "Редактировать",
      id: "enter",
      type: "button",
      onClick: (event: Event) => {
        console.log("go edit");
        event.preventDefault();
        this.props.changePage("profileChange");
      },
    });
    const EmailField = new ProfileString({
      id: "email",
      name: "Почта",
      value: "bajieri@gmail.com",
    });
    const FirstNameField = new ProfileString({
      id: "first_name",
      name: "Имя",
      value: "Валерия",
    });
    const SecondNameField = new ProfileString({
      id: "second_name",
      name: "Фамилия",
      value: "Ехно",
    });
    const DisplayNameField = new ProfileString({
      id: "display_name",
      name: "Ник",
      value: "Leriyyaa",
    });
    const LoginField = new ProfileString({
      id: "login",
      name: "Логин",
      value: "Lera",
    });
    const PhoneField = new ProfileString({
      id: "phone",
      name: "Номер телефона",
      value: "+79786978375",
    });

    this.children = {
      ...this.children,
      ProfileFooter,
      ProfileChangeAvatar,
      ProfileButton,
      EmailField,
      FirstNameField,
      SecondNameField,
      DisplayNameField,
      LoginField,
      PhoneField,
    };
    super.init();
  }

  render() {
    return `
    <div class="page-container">
      <main class="page-content page-content__profile">
        {{{ ProfileChangeAvatar }}}
        <h1>Лерия</h1>
        <form id="loginForm" class="form">
          {{{ EmailField }}}
          {{{ FirstNameField }}}
          {{{ SecondNameField }}}
          {{{ DisplayNameField }}}
          {{{ LoginField }}}
          {{{ PhoneField }}}
    
          {{{ ProfileButton }}}
        </form>
      </main>
      {{{ ProfileFooter }}}
   </div>`;
  }
}
