import Block from "../../framework/Block";
import "./chatItem.scss";

interface ChatItemProps {
  class?: string;
  id: string;
  src: string;
  name: string;
  message: string;
  time: string;
  label: string;
  onClick?: (e: Event) => void;
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,

      attr: {
        class: "chat",
      },
    });
  }

  override render() {
    return `
    <div class="chat" id="{{id}}">
        <div class="chat__img">
            <img id="{{id}}" src="{{src}}" />
        </div>
        <div>
            <div>{{name}}</div>
            <div>{{message}}</div>
        </div>
        <div class="chat__info">
            <div>{{time}}</div>
            <div class="chat__label">
                <div>{{label}}</div>
            </div>
        </div>
    </div>
    `;
  }
}
