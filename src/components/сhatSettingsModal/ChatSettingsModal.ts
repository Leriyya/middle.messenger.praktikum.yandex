import Block from "../../utils/Block";
import { validateMessage } from "../../utils/validators";
import { Button } from "../button";
import InputWithWarning from "../inputWithError/inputWithWarning";

interface Props {
  settingsMode: "add" | "delete" | null;
  onSelectMode: (mode: "add" | "delete") => void;
  onConfirm: (userId: string) => void;
  onClose: () => void;
  userIdInput?: string;
}

export default class ChatSettingsModal extends Block {
  init() {
    const onChangeUserIdBind = this.onChangeUserIdMessage.bind(this);

    const AddButton = new Button({
      id: "enter",
      type: "button",
      text: "Добавить пользователей",
      onClick: () => {
        console.log("add user");
        this.props.onSelectMode("add");
      },
    });

    const DeleteButton = new Button({
      id: "enter",
      type: "button",
      text: "Удалить пользователей",
      onClick: () => {
        console.log("delete user");
        this.props.onSelectMode("delete");
      },
    });

    const UserIdInput = new InputWithWarning({
      name: "userId",
      type: "text",
      placeholder: "ID пользователя",
      value: this.props.userIdInput || "",
      onBlur: onChangeUserIdBind,
    });

    const ConfirmButton = new Button({
      id: "enter",
      type: "button",
      text: "Подтвердить",
      onClick: () => {
        if (!this.props.userIdInput) return;
        this.props.onConfirm(this.props.userIdInput);
      },
    });

    const CloseButton = new Button({
      id: "enter",
      type: "button",
      text: "Отмена",
      onClick: this.props.onClose,
    });

    this.children = {
      ...this.children,
      AddButton,
      DeleteButton,
      UserIdInput,
      ConfirmButton,
      CloseButton,
    };

    super.init();
  }

  onChangeUserIdMessage(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      console.error("Target is not an input");
      return;
    }

    const errorText = validateMessage(e.target.value);
    this.children.UserIdInput.setProps({
      error: !!errorText,
      errorText: errorText,
    });
    this.setProps({ userIdInput: e.target.value });
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.userIdInput !== newProps.userIdInput) {
      this.children.UserIdInput.setProps({
        value: newProps.userIdInput || "",
      });
    }

    return true;
  }

  render() {
    return `
      <div>
        <h2>Действия в чате</h2>

        {{#if settingsMode}}
          {{{ UserIdInput }}}
          {{{ ConfirmButton }}}
        {{else}}
          {{{ AddButton }}}
          {{{ DeleteButton }}}
        {{/if}}

        {{{ CloseButton }}}
      </div>
    `;
  }
}
