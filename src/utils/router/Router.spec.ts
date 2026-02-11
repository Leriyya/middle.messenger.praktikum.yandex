import { expect } from "chai";
import { Router } from "./Router";
import sinon from "sinon";

describe("Router", () => {
  let router: Router;
  let pushSpy: sinon.SinonSpy;

  beforeEach(() => {
    router = new Router("#app");
    pushSpy = sinon.spy(window.history, "pushState");
  });

  afterEach(() => {
    pushSpy.restore();
  });

  it("use() должен добавлять маршрут", () => {
    class TestBlock {}

    router.use("/test", TestBlock as any);

    const route = router.getRoute("/test");

    expect(route).to.not.be.undefined;
  });

  it("getRoute() возвращает undefined для несуществующего пути", () => {
    const route = router.getRoute("/unknown");
    expect(route).to.be.undefined;
  });

  it("go() вызывает history.pushState и меняет путь", () => {
    class TestBlock {}
    router.use("/test", TestBlock as any);

    router.go("/test");

    expect(pushSpy.calledOnce).to.be.true;
    expect(window.location.pathname).to.equal("/test");
  });
});
