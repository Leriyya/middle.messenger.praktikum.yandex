import type { Page } from "../../App";
import { Button } from "../../components/button";
import ChatsList from "../../components/chatList/chatList";
import InputWithWarning from "../../components/inputWithError/inputWithWarning";
import { Link } from "../../components/link";
import { Modal } from "../../components/modal";
import ChatMessages from "../../components/сhatMessages/ChatMessages";
import ChatSettingsModal from "../../components/сhatSettingsModal/ChatSettingsModal";
import { ChatsController } from "../../controllers/chats";
import { UserController } from "../../controllers/user-profile";
import { withChats } from "../../store/hoc";
import store, { StoreEvents } from "../../store/store";
import Block from "../../utils/Block";
import { validateMessage } from "../../utils/validators";

interface MessengerPageProps {
  changePage: (page: Page) => void;
  selectedChatId?: string;
  isSettingsOpen?: boolean;
  settingsMode?: SettingMode;
  selectedUsers?: string[];
  userId?: string;
}

type SettingMode = "add" | "delete" | null;

class MessengerPage extends Block {
  private chatsController: ChatsController;

  constructor(props: MessengerPageProps) {
    super({ ...props });
    this.chatsController = new ChatsController();
    console.log("chatsController", this.chatsController);
  }

  init() {
    this.chatsController = new ChatsController();
    this.chatsController.fetchChats();

    const onChangeMessageBind = this.onChangeMessage.bind(this);
    // const onChangeUserIdBind = this.onChangeUserIdMessage.bind(this);
    console.log("init props", this.props);

    this.onSubmit = this.onSubmit.bind(this);

    this.setProps({
      ...this.props,
      events: {
        submit: this.onSubmit,
      },
    });

    const ChatMessageInputComponent = new InputWithWarning({
      name: "search",
      type: "text",
      placeholder: "Введите сообщение",
      onBlur: onChangeMessageBind,
    });
    const SendMessageButton = new Button({
      text: "Отправить",
      id: "enter",
      type: "submit",
      class: "messenger__btn",
      onClick: () => {
        console.log("send message");
      },
    });
    const ChatSettingsButton = new Button({
      text: "Настройки",
      id: "enter",
      type: "button",
      class: "messenger__btnSetting",
      onClick: () => {
        console.log("open settings modal");
        this.setProps({
          isSettingsOpen: true,
          settingsMode: null,
          selectedUsers: [],
        });
      },
    });

    this.children.ChatSettingsModal = new Modal({
      content: new ChatSettingsModal({
        settingsMode: this.props.settingsMode,
        onSelectMode: (mode: SettingMode) => {
          this.setProps({ settingsMode: mode });
        },
        onConfirm: async (userId: string) => {
          const data = {
            chatId: this.props.selectedChatId!,
            users: [Number(userId)],
          };

          if (this.props.settingsMode === "add") {
            await this.chatsController.addUser(data);
          } else {
            await this.chatsController.removeUser(data);
          }

          this.setProps({
            isSettingsOpen: false,
            settingsMode: null,
            userIdInput: "",
          });
        },
        onClose: () => {
          this.setProps({ isSettingsOpen: false });
        },
      }),
    });

    this.children.ChatMessages = new ChatMessages({
      messages: store.getState().messages ?? [],
    });

    store.on(StoreEvents.Updated, () => {
      const messages = store.getState().messages ?? [];

      (this.children.ChatMessages as ChatMessages).setProps({
        messages,
      });

      const el = this.children.ChatMessages.element;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });

    const LinkBack = new Link({
      href: "/profile",
      "data-page": "profile",
      text: "В профиль",
      class: "messenger__back",
    });
    const CreateChatButton = new Button({
      text: "Новый чат",
      id: "enter",
      type: "button",
      class: "messenger__newChat",
      onClick: () => {
        console.log("create chat");
        this.onCreateChat("Новый чат");
      },
    });

    this.children = {
      ...this.children,
      ChatsList: new ChatsList({
        chats: this.props.chats ?? [],
        onDelete: this.onDeleteChat.bind(this),
        onChatClick: this.onSelectChat.bind(this),
      }),
      ChatMessageInputComponent,
      SendMessageButton,
      CreateChatButton,
      ChatSettingsButton,
      LinkBack,
    };

    this.chatsController.fetchChats();
    super.init();
  }

  onChangeMessage(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateMessage(e.target.value);
    this.children.selectedUsers.setProps({
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

    this.chatsController.sendMessage(data.search as string);
    e.target.reset();
  }

  async onCreateChat(title: string) {
    try {
      await this.chatsController.createChat({ title });
      await this.chatsController.fetchChats();
    } catch (error) {
      console.log("create chat error", this.props, error);
    }
  }

  async onDeleteChat(chatId: string) {
    try {
      await this.chatsController.deleteChat({ chatId });
      await this.chatsController.fetchChats();
    } catch (e) {
      console.error("Delete chat error", e);
    }
  }

  async onSelectChat(chatId: string) {
    store.set("messages", []);

    let user = store.getState().user;
    if (!user) {
      const userController = new UserController();
      await userController.fetchUser();
      user = store.getState().user;
    }

    this.setProps({
      selectedChatId: Number(chatId),
    });
    // закрываем старый сокет
    this.chatsController.close();

    // подключаемся к новому чату
    await this.chatsController.connect(Number(chatId));

    // подписываемся на сообщения
    this.chatsController.onMessage((data) => {
      console.log("WS received:", data);
      if (Array.isArray(data)) {
        store.set("messages", data);
      } else if (data.type === "message") {
        const messages = store.getState().messages ?? [];
        store.set("messages", [data, ...messages]);
      }
    });

    // получаем первые сообщения
    this.chatsController.getOld(0);
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.children.ChatsList.setProps({
        chats: newProps.chats,
      });
    }

    if (oldProps.settingsMode !== newProps.settingsMode) {
      const modal = this.children.ChatSettingsModal as Modal;
      const content = modal.getChildren().content as ChatSettingsModal;

      content.setProps({
        settingsMode: newProps.settingsMode,
      });
    }

    return true;
  }

  render() {
    return `
      <div class="messenger">
        <div class="messenger__messages">
          <div class="messenger__profile">
            {{{ LinkBack }}}
            {{{ CreateChatButton }}}
          </div>
          
          {{{ ChatsList }}}
        </div>
        
        <div class="messenger__main">
          <div  class="messenger__header">
            {{#if selectedChatId}}
            {{{ ChatSettingsButton }}}
            {{/if}}
          </div>
          {{#unless selectedChatId}}
            <div class="messenger__main-label">
              Выберите чат чтобы отправить сообщение
            </div>
          {{/unless}}

          {{#if selectedChatId}}
            <div class="messenger__chat-window">
              {{{ ChatMessages }}}
            </div>
          {{/if}}

          {{#if wsStatus}}
            <div class="status">
              {{#ifEquals wsStatus "error"}}Соединение потеряно{{/ifEquals}}
              {{#ifEquals wsStatus "closed"}}Чат отключён{{/ifEquals}}
            </div>
          {{/if}}

          <div class="messenger__full-input">
            <form id="messenger" class="form">

              {{{ ChatMessageInputComponent }}}
              {{{ SendMessageButton }}}
            </form>
          </div>
        </div>
        
        {{#if isSettingsOpen}}
          {{{ ChatSettingsModal }}}
        {{/if}}
        
      </div>
    `;
  }
}

export default withChats(MessengerPage);
