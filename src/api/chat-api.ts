import { HTTPTransport } from "../utils/HTTPTransport";
import { BASE_URL, BaseAPI } from "./base-api";

export interface ChatsRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  display_name: string;
  phone: string;
}

export interface Chat {
  title: string;
}
export interface ChatID {
  chatId: string;
}
export interface ChatUsers {
  chatId: number;
  users: Array<number>;
}

export class ChatsAPI extends BaseAPI {
  private transport = new HTTPTransport(`${BASE_URL}`);

  getChats() {
    return this.transport.get("chats");
  }
  createChat(data: Chat) {
    return this.transport.post("chats", { data });
  }
  deleteChat(data: ChatID) {
    return this.transport.delete("chats", { data });
  }
  addUser(data: ChatUsers) {
    return this.transport.put("chats/users", { data });
  }
  removeUser(data: ChatUsers) {
    return this.transport.delete("chats/users", { data });
  }
  getUsers(chatId: number) {
    return this.transport.get(`chats/${chatId}/users`);
  }
  getToken(chatId: number) {
    return this.transport.post(`chats/token/${chatId}`);
  }
}
