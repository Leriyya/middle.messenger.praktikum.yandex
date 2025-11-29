import "./link.scss";

export default `<a href="{{href}}" {{#if class}} class="{{class}} link"{{else}}class="link"{{/if}} data-page="{{data-page}}">{{text}}</a>`;