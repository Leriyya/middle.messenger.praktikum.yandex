import "./button.scss";

export default `<button id="{{id}}" class="button"
{{#if disabled}}
  disabled
{{/if}}>{{text}}</button>`;