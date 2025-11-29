import s from "./login.module.scss";
import templateSrc from "./login.hbs?raw";

const template = Handlebars.compile(templateSrc);

export default template({
  pageContainer: s.pageContainer,
  pageContent: s.pageContent,
});
