import Block from "../../utils/Block";
import "./button.scss";

interface ButtonProps {
  class?: string;
  id: string;
  type: string;
  text: string;
  onClick: (e: Event) => void;
}
export default class Button extends Block {
  constructor(props: ButtonProps) {
    const combinedClass = `button ${props.class || ""}`.trim();

    super({
      ...props,
      events: {
        click: (e: Event) => {
          props.onClick(e);
        },
      },
      attr: {
        class: combinedClass,
      },
    });
  }

  override render() {
    return `<button id="{{id}}" class="{{class}}" type="{{type}}"
    {{#if disabled}}
      disabled
    {{/if}}>{{text}}</button>`;
  }
}
