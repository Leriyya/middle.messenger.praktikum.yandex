import Block from "../../utils/Block";
import { Button } from "../button";
import "./chatItem.scss";

interface ChatItemProps {
  class?: string;
  id: string;
  src: string;
  title: string;
  message: string;
  time: string;
  label: string;
  onClick?: (e: Event) => void;
  onDelete?: (chatId: string) => void;
  onChatClick?: (chatId: string) => void;
}

export function formatTime(time: string): string {
  const date = new Date(time);

  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: () => {
          this.props.onChatClick?.(this.props.id);
        },
      },
      time: props.time ? formatTime(props.time) : false,
      attr: {
        class: "chat",
      },
    });
  }

  init() {
    const DeleteChatButton = new Button({
      text: "x",
      id: "delete",
      type: "button",
      class: "chat__btn",
      onClick: (e) => {
        e.stopPropagation();
        this.props.onDelete?.(this.props.id);
      },
    });

    this.children = {
      ...this.children,
      DeleteChatButton,
    };

    super.init();
  }

  override render() {
    return `
    <div class="chat" id="{{id}}">
        <div class="chat__img">
            <img id="{{id}}" src="{{src}}" />
        </div>
        <div>
            <div>{{title}}</div>
            <div>{{message}}</div>
        </div>
        <div class="chat__info">
          {{#if time}}
            <div>{{time}}</div>
          {{/if}}
          <div class="chat__label">
            <div>{{label}}</div>
          </div>
        </div>
        <div>{{{ DeleteChatButton }}}</div>
    </div>
    `;
  }
}
