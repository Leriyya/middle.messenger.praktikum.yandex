import Block from "../../utils/Block";
import ChatItem from "../chatItem/chatItem";

interface ChatsListProps {
  chats?: any[];
  onDelete?: (chatId: string) => void;
  onChatClick?: (chatId: string) => void;
}

class ChatsList extends Block {
  constructor(props: ChatsListProps) {
    super(props);
    this.initChildren(props.chats);
  }

  private initChildren(chats?: any[]) {
    if (!chats) return;

    const chatItems: Record<string, Block> = {};
    chats.forEach((chat, index) => {
      chatItems[`chat_${index}`] = new ChatItem({
        id: chat.id,
        src: chat.avatar ?
          `https://ya-praktikum.tech/api/v2/resources${chat.avatar}` :
          "../../../public/user.svg",
        title: chat.title,
        message: chat.last_message?.content ?? "",
        time: chat.last_message?.time ?? "",
        label: chat.unread_count ?? "",
        onDelete: this.props.onDelete,
        onChatClick: this.props.onChatClick,
      });
    });
    this.children = chatItems;
  }

  protected componentDidUpdate(
    oldProps: ChatsListProps,
    newProps: ChatsListProps
  ): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.initChildren(newProps.chats);
    }
    return true;
  }

  render() {
    return `
      <div class="messenger__chat-list">
        ${Object.keys(this.children)
        .map((key) => `{{{ ${key} }}}`)
        .join("")}
      </div>
    `;
  }
}

export default ChatsList;
