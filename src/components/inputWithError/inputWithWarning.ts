import Block from "../../framework/Block";
import Input from "../input/input";
import "./inputWithWarning.scss";

interface InputWithWarningProps {
  type: string;
  name: string;
  class?: string;
  placeholder: string;
  required?: boolean;
  errorText?: string;
  value?: string;
  onBlur: (e: Event) => void;
}

export default class InputWithWarning extends Block {
  constructor(props: InputWithWarningProps) {
    props.errorText = "";

    super({
      ...props,
      Input: new Input({
        class: props.class,
        type: props.type,
        name: props.name,
        placeholder: props.placeholder,
        value: props.value,
        event: {
          onBlur: props.onBlur || (() => {}),
        },
      }),
      attr: {
        class: "input-warning",
      },
    });
  }

  override render(): string {
    const errorText = this.props.errorText;

    return ` 
    <div class='input-warning'>
      <div>
        {{{ Input }}}
        <div class='input-warning__text'>${errorText}</div>
      </div>   
    </div>
    `;
  }
}
