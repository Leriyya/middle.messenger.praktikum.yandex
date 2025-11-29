import "./chat.scss";

export default `
<div class="chat" id="{{id}}">
    <div class="chat__img">
        <img id="{{id}}" src="{{src}}" />
    </div>
    <div>
        <div>{{name}}</div>
        <div>{{message}}</div>
    </div>
    <div class="chat__info">
        <div>{{time}}</div>
        <div class="chat__label">
            <div>{{label}}</div>
        </div>
    </div>
</div>`;
