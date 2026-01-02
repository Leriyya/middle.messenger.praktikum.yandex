import "./avatar.scss";
import Block from "../../framework/Block";

interface AvatarProps {
  class?: string;
  id: string;
  alt: string;
  src: string;
}
export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,

      attr: {
        class: "avatar",
      },
    });
  }

  override render() {
    return `
    <div class="avatar">
      <img id="{{id}}" src="{{src}}" alt="{{alt}}" class="avatar__img" />
      <div class="avatar-overlay">Поменять аватарку</div>
      <input type="file" name="avatar" class="avatar__input" />
    </div>
  `;
  }
}
