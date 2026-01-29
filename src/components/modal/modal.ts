import Block from "../../utils/Block";
import "./modal.scss";

export default class Modal extends Block {
  getChildren() {
    return this.children;
  }
  render() {
    return `
        <div class="modal">
          <div class="modal__overlay"></div>
          <div class="modal__content">
            {{{ content }}}
          </div>
        </div>
      `;
  }
}
