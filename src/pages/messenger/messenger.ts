import type { Page } from "../../App";
import { Button } from "../../components/button";
import ChatItem from "../../components/chatItem/chatItem";
import InputWithWarning from "../../components/inputWithError/inputWithWarning";
import { Link } from "../../components/link";
import Block from "../../framework/Block";
import { validateMessage } from "../../utils/validators";

interface MessengerPageProps {
  changePage: (page: Page) => void;
}

export default class MessengerPage extends Block {
  constructor(props: MessengerPageProps) {
    super({ ...props });
  }

  init() {
    const onChangeMessageBind = this.onChangeMessage.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.props = {
      ...this.props,
      events: {
        submit: this.onSubmit,
      },
    };

    const ChatMessageInputComponent = new InputWithWarning({
      name: "search",
      type: "text",
      placeholder: "Введите сообщение",
      onBlur: onChangeMessageBind,
    });
    const MessengerChatItem = new ChatItem({
      id: "chat",
      src: "../../../public/user.svg",
      name: "Саша",
      message: "Привет Лера!",
      time: "21:52",
      label: "2",
    });
    const SendMessageButton = new Button({
      text: "Сохранить",
      id: "enter",
      type: "submit",
      class: "messenger__btn",
      onClick: () => {
        console.log("send message");
      },
    });
    const LinkBack = new Link({
      href: "#",
      "data-page": "profile",
      text: "Вернуться в профиль",
      class: "messenger__back",
      onClick: (event: Event) => {
        event.preventDefault();
        this.props.changePage("profile");
      },
    });

    this.children = {
      ...this.children,
      ChatMessageInputComponent,
      MessengerChatItem,
      SendMessageButton,
      LinkBack,
    };

    super.init();
  }

  onChangeMessage(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateMessage(e.target.value);
    this.children.ChatMessageInputComponent.setProps({
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
    console.log("message data:", data);
  }

  render() {
    return `
      <div class="messenger">
        <div class="messenger__messages">
          <div class="messenger__profile">
            {{{ LinkBack }}}
          </div>
          
          {{{ MessengerChatItem }}}
        </div>
        
        <div class="messenger__main">
          <div class="messenger__main-label">
            Выберите чат чтобы отправить сообщение
          </div>
          <div class="messenger__full-input">
            <form id="messenger" class="form">
              {{{ ChatMessageInputComponent }}}
              {{{ SendMessageButton }}}
            </form>
          </div>
        </div>
      </div>
    `;
  }
}
