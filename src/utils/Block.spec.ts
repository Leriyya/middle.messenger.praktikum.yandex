import * as sinon from "sinon";
import { expect } from "chai";
import Block from "./Block";

describe("Block", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  class TestComponent extends Block {
    protected render(): string {
      return `<div class="test">{{text}}</div>`;
    }
  }

  it("рендерит переданные props", () => {
    const component = new TestComponent({ text: "yoo" });

    const element = component.getContent();

    expect(element).to.be.instanceOf(HTMLElement);
    expect(element.textContent).to.equal("yoo");
  });

  it("вызывает обработчик события", () => {
    const handler = sinon.stub();

    const component = new TestComponent({
      text: "Click me",
      events: {
        click: handler,
      },
    });

    const event = new MouseEvent("click");
    component.getContent().dispatchEvent(event);

    expect(handler.calledOnce).to.be.true;
  });

  it("setProps должен обновлять содержимое", () => {
    const component = new TestComponent({ text: "yoo" });

    component.setProps({ text: "wow" });

    const element = component.getContent();

    expect(element.textContent).to.equal("wow");
  });

  it("show() и hide() управляют отображением", () => {
    const component = new TestComponent({ text: "yoo" });

    component.hide();
    expect(component.getContent().style.display).to.equal("none");

    component.show();
    expect(component.getContent().style.display).to.equal("block");
  });

  it("getContent() выбрасывает ошибку если элемент не создан", () => {
    const component = new TestComponent({ text: "yoo" });

    (component as any)._element = null;

    expect(() => component.getContent()).to.throw("Element is not created");
  });
});
