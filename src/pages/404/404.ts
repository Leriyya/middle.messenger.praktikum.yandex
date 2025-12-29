import type { Page } from "../../App";
import { Link } from "../../components/link";
import Block from "../../framework/Block";

interface Page404Props {
  changePage: (page: Page) => void;
}

export default class Page404 extends Block {
  constructor(props: Page404Props) {
    super({ ...props });
  }

  init() {
    const LinkBack = new Link({
      href: "#",
      datapage: "profile",
      text: "Вернуться в профиль",
      class: "container-error__link",
      onClick: (event: Event) => {
        event.preventDefault();
        this.props.changePage("profile");
      },
    });

    this.children = {
      ...this.children,
      LinkBack,
    };
    super.init();
  }

  override render() {
    return `
    <div class="page-container">
        <main class="page-center">
            <div class="container-error">
                <h1 class="container-error__title">404</h1>
                <p class="container-error__text">Страница не найдена</p>
                {{{ LinkBack }}}
            </div>
        </main>
    </div>`;
  }
}
