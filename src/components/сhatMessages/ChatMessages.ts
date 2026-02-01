import Block from "../../utils/Block";
import { formatTime } from "../chatItem/chatItem";
import "./ChatMessages.scss";

export interface ChatMessage {
  id?: string;
  content: string;
  time: string;
  user_id?: string | number;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default class ChatMessages extends Block {
  constructor(props: ChatMessagesProps) {
    super({
      messages: props.messages ?? [],
    });
  }

  protected componentDidUpdate(
    oldProps: ChatMessagesProps,
    newProps: ChatMessagesProps
  ): boolean {
    return oldProps.messages !== newProps.messages;
  }

  render() {
    const messages: ChatMessage[] = this.props.messages ?? [];

    return `
      <div class="chatmes">
        ${messages
          .map(
            (msg) => `
          <div class="chatmes__message">
            <div class="chatmes__message-content">${msg.content}</div>
            <div class="chatmes__message-time">
            ${formatTime(msg.time)}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }
}
