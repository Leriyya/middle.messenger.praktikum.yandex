import Block from "../../utils/Block";
import { formatTime } from "../chatItem/chatItem";
import "./ChatMessages.scss";

interface ChatMessagesProps {
  messages: Array<any>;
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
    const messages = this.props.messages ?? [];

    return `
      <div class="chatMes">
        ${messages
          .map(
            (msg: any) => `
          <div class="chatMes__message">
            <div class="chatMes__message-content">${msg.content}</div>
            <div class="chatMes__message-time">
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
