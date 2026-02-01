import EventBus from "../utils/EventBus";
import { set } from "../utils/set";

export enum StoreEvents {
  Updated = "updated",
}

export type Indexed = {
  [key: string]: any;
};

class Store extends EventBus {
  private state: Indexed = {
    user: null,
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
