import Block from "../../utils/Block";
import "./input.scss";

interface InputProps {
  type: string;
  name: string;
  class?: string;
  placeholder: string;
  required?: boolean;
  errorText?: string;
  value?: string;
  event: {
    onBlur: (e: Event) => void;
  };
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: (e: Event) => {
          props.event?.onBlur(e);
        },
      },
      attr: {
        class: "input",
      },
    });
  }

  override render(): string {
    return `
          <input
            class="{{ class }}"
            placeholder="{{ placeholder }}"
            type="{{ type }}"
            title="{{ title }}"
            name="{{ name }}"
            value="{{ value }}"
            required="{{ required }}"
          />      
    `;
  }
}
