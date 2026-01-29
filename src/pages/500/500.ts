import type { Page } from "../../App";
import { Link } from "../../components/link";
import Block from "../../utils/Block";

interface Page500Props {
  changePage: (page: Page) => void;
}

export default class Page500 extends Block {
  constructor(props: Page500Props) {
    super({
      ...props,
    });
  }

  init() {
    const LinkBack = new Link({
      href: "/profile",
      "data-page": "profile",
      text: "Вернуться в профиль",
      class: "container-error__link",
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
                <h1 class="container-error__title">500</h1>
                <p class="container-error__text">Страница не найдена</p>
                {{{ LinkBack }}}
            </div>
        </main>
    </div>`;
  }
}
