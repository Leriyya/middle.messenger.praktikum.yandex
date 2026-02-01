import "./profileString.scss";
import Block from "../../utils/Block";

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
        class: "profile-string",
      },
    });
  }

  override render() {
    return `
    <div id="{{id}}" class="profile-string">
        <div>{{name}}</div>
        <div class="profile-string__value">{{value}}</div>
    </div>`;
  }
}
