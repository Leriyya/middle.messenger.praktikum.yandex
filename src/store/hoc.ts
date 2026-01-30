import type Block from "../utils/Block";
import type { Indexed } from "./store";
import store, { StoreEvents } from "./store";
import { isEqual } from "../utils/isEqual";

function connect<TStateProps extends Indexed>(
  mapStateToProps: (state: Indexed) => TStateProps
) {
  return function <TProps extends Indexed>(
    Component: new (props: TProps) => Block & { constructor: any }
  ) {
    class WithStore extends Component {
      static EVENTS = (Component as typeof Block).EVENTS;

      constructor(props: TProps) {
        const stateProps = mapStateToProps(store.getState());
        super({ ...props, ...stateProps });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(stateProps, newState)) {
            this.setProps({ ...newState });
          }
        });
      }
    }

    return WithStore;
  };
}

export const withUser = connect((state) => ({ user: state.user }));
export const withChats = connect((state) => ({ chats: state.chats }));
