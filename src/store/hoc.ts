import type Block from "../utils/Block";
import type { Indexed } from "./store";
import store, { StoreEvents } from "./store";
import { isEqual } from "../utils/isEqual";

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}

export const withUser = connect((state) => ({ user: state.user }));
export const withChats = connect((state) => ({ chats: state.chats }));
