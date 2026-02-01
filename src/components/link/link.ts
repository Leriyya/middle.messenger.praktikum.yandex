import Block from "../../utils/Block";
import { router } from "../../utils/router/Router";
import "./link.scss";

interface LinkProps {
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

          const href = this.props.href;

          if (href) {
            router.go(href);
          }

          this.changeStyles();
        },
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
