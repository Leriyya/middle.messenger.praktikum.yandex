import {
  ChatsAPI,
  type Chat,
  type ChatID,
  type ChatUsers,
} from "../api/chat-api";
import store from "../store/store";
import { WSTransport, WSTransportEvents } from "../utils/WSTransport";

const chatsApi = new ChatsAPI();

export class ChatsController {
  private ws: WSTransport | null = null;

  constructor(chatId?: number) {
    this.ws = new WSTransport(`/chats/${chatId}`);
  }

  async connect(chatId: number) {
    try {
      const userId = store.getState().user.id;

      const tokenResponse = await chatsApi.getToken(chatId);
      const { token } = JSON.parse(tokenResponse as string);

      const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;

      this.ws = new WSTransport(url);

      this.ws.on(WSTransportEvents.Close, () => {
        store.set("wsStatus", "closed");
      });

      this.ws.on(WSTransportEvents.Error, () => {
        store.set("wsStatus", "error");
        store.set("error", "Соединение с чатом потеряно");
      });

      this.ws.on(WSTransportEvents.Connected, () => {
        store.set("wsStatus", "connected");
      });

      await this.ws.connect();
    } catch (e) {
      store.set("wsStatus", "error");
      store.set("error", `Не удалось подключиться к чату: ${e}`);
    }
  }

  getOld(offset: number) {
    try {
      this.ws?.send({
        type: "get old",
        content: String(offset),
      });
    } catch (e) {
      store.set("error", `Сообщение не отправлено: ${e}`);
    }
  }

  sendMessage(text: string) {
    this.ws?.send({
      type: "message",
      content: text,
    });
  }

  onMessage(cb: (data: any) => void) {
    this.ws?.on(WSTransportEvents.Message, cb);
  }

  close() {
    this.ws?.close();
    this.ws = null;
  }

  async fetchChats() {
    const result = await chatsApi.getChats();
    store.set("chats", JSON.parse(result as string));
  }

  async createChat(data: Chat) {
    try {
      const result = await chatsApi.createChat(data);
      const newChat = JSON.parse(result as string);
      const currentChats = store.getState().chats || [];
      store.set("chats", [...currentChats, newChat]);
    } catch (error) {
      console.error("create chat error", error);
    }
  }

  async deleteChat(data: ChatID) {
    try {
      await chatsApi.deleteChat(data);
    } catch (error) {
      console.error("delete chat error", error);
    }
  }

  async addUser(data: ChatUsers) {
    const result = await chatsApi.addUser(data);
    if (result && result !== "OK") {
      store.set("chat", JSON.parse(result as string));
    } else {
      console.log("Пользователь успешно добавлен");
    }
  }

  async removeUser(data: ChatUsers) {
    const result = await chatsApi.removeUser(data);
    store.set("chat", JSON.parse(result as string));
  }

  async getUsers(chatId: number) {
    const result = await chatsApi.getUsers(chatId);
    store.set("chatUsers", JSON.parse(result as string));
  }
}
