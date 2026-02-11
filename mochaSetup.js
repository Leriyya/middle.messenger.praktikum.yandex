import { JSDOM } from "jsdom";

const jsdom = new JSDOM("<body></body>", {
  url: "https://example.org/",
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = jsdom.window.navigator;
global.FormData = jsdom.window.FormData;
global.HTMLElement = jsdom.window.HTMLElement;
global.MouseEvent = jsdom.window.MouseEvent;
