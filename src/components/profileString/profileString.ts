import "./profileString.scss";

import Block from "../../framework/Block";
import "./profileString.scss";

interface ProfileStringProps {
  class?: string;
  id: string;
  name: string;
  value?: string;
}
export default class ProfileString extends Block {
  constructor(props: ProfileStringProps) {
    super({
      ...props,

      attr: {
        class: "profileString",
      },
    });
  }

  override render() {
    return `
    <div id="{{id}}" class="profileString">
        <div>{{name}}</div>
        <div class="profileString__value">{{value}}</div>
    </div>`;
  }
}
