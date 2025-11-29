import "./footer.scss";

export default `<footer class='footer'>
{{> Link class="footer__link" data-page="signup" href='/signup' text='Ещё не зарегистрированы?'}}
{{> Link class="footer__link" data-page="login" href='/login' text='Вход'}}
{{> Link class="footer__link" data-page="profile" href='#' text='В профиль'}}
{{> Link class="footer__link" data-page="profileChange" href='#' text='Редактировать профиль'}}
{{> Link class="footer__link" data-page="profileChangePassword" href='#' text='Изменить пароль'}}
{{> Link class="footer__link" data-page="messenger" href='#' text='К чатам'}}
{{> Link class="footer__link" data-page="404" href='#' text='404'}}
{{> Link class="footer__link" data-page="500" href='#' text='500'}}
</footer>`;
