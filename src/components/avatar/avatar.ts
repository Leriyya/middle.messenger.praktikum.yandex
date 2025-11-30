import "./avatar.scss";

export default `
  <div class="avatar">
    <img id="{{id}}" src="{{src}}" alt="{{alt}}" class="avatar__img" />
    <div class="avatar__overlay">Поменять аватарку</div>
    <input type="file" name="avatar" class="avatar__input" />
  </div>
`;
