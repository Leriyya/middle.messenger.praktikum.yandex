import Block from "../../framework/Block";
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
          this.changeStyles();
          props.onClick(e);
        },
      },
      attr: {
        class: combinedClass,
      },
    });
  }

  changeStyles() {
    // this.setProps({
    //   attr: {
    //     class: "",
    //   },
    // });
  }

  override render() {
    return `<button id="{{id}}" class="{{class}}" type="{{type}}"
    {{#if disabled}}
      disabled
    {{/if}}>{{text}}</button>`;
  }
}
