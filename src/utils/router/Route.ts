import type Block from "../Block";

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export class Route {
  private _pathname: string;
  private _blockClass: typeof Block | string;
  private _block: Block | null;
  private _props: { [key: string]: object | string | (() => void) };

  constructor(
    pathname: string,
    view: typeof Block | string,
    props: { [key: string]: object | string | (() => void) }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    const container = document.getElementById("app")!;

    if (typeof this._blockClass === "string") {
      const template = Handlebars.compile(this._blockClass);
      container.textContent = template(this._props);
      return;
    }

    if (!this._block) {
      this._block = new this._blockClass(this._props);
    } else {
      this._block.setProps(this._props);
    }

    container.textContent = "";
    container.append(this._block.getContent()!);

    this._block.show();
  }
}
