import "./avatar.scss";
import Block from "../../utils/Block";
import { UserController } from "../../controllers/user-profile";

interface AvatarProps {
  class?: string;
  id: string;
  alt: string;
  src: string;
}
export default class Avatar extends Block {
  private avatarController: UserController;

  constructor(props: AvatarProps) {
    super({
      ...props,

      attr: {
        class: "avatar",
      },
    });

    this.avatarController = new UserController();
  }

  init() {
    this.setProps({
      events: {
        change: (e: Event) => this.onFileChange(e),
      },
    });
  }

  private onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    this.avatarController.updateAvatar(formData);
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
