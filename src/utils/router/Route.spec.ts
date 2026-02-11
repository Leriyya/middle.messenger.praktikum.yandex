import { expect } from "chai";
import * as sinon from "sinon";
import { Route } from "./Route";
import { router } from "./Router";

describe("Route", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it("match() возвращает true если путь совпадает", () => {
    const route = new Route("/test", "template", {});
    expect(route.match("/test")).to.be.true;
  });

  it("match() возвращает false если путь не совпадает", () => {
    const route = new Route("/test", "template", {});
    expect(route.match("/other")).to.be.false;
  });

  it("leave() вызывает hide у блока", () => {
    class MockBlock {
      hide = sinon.spy();
    }

    const route = new Route("/test", MockBlock as any, {});
    (route as any)._block = new MockBlock();

    route.leave();

    expect((route as any)._block.hide.calledOnce).to.be.true;
  });

  it("render() создаёт блок и вставляет его в DOM", async () => {
    class MockBlock {
      element = document.createElement("div");
      show = sinon.spy();
      setProps() {}

      constructor() {
        this.element.textContent = "Yoo";
      }

      getContent() {
        return this.element;
      }
    }

    const route = new Route("/test", MockBlock as any, {});
    await route.render();

    const app = document.getElementById("app")!;
    expect(app.textContent).to.equal("Yoo");
  });

  it("render() делает редирект если guard возвращает false", async () => {
    const replaceSpy = sinon.spy(window.history, "replaceState");
    const goSpy = sinon.spy(router, "go");

    const route = new Route("/private", "template", {
      guard: async () => false,
      redirect: "/login",
    });

    await route.render();

    expect(replaceSpy.calledOnce).to.be.true;
    expect(goSpy.calledWith("/login")).to.be.true;

    replaceSpy.restore();
    goSpy.restore();
  });
});
