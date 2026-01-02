import type { Page } from "../../App";
import Block from "../../framework/Block";
import "./link.scss";

interface LinkProps {
  onClick: (e: Event, page: Page) => void;
  href?: string;
  "data-page"?: string;
  text: string;
  class?: string;
}
export default class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();

          if (props.onClick) {
            const page = this.props["data-page"];
            props.onClick(e, page);
          }

          this.changeStyles();
        },
      },
      attr: {
        // class: "footer__link",
      },
    });
  }

  changeStyles() {}

  override render() {
    return `
    <a href="{{href}}" 
      {{#if class}} 
      class="{{class}} 
      link"{{else}}class="link"{{/if}} 
      data-page="{{data-page}}">
        {{text}}
    </a>`;
  }
}
