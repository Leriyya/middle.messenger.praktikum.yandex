import "./footer.scss";

export default `
<footer class='footer'>
    <nav>
        <ul>
            <li>
                {{> Link class="footer__link" data-page="signup" href='/signup' text='Ещё не зарегистрированы?'}}
            </li>
            <li>
                {{> Link class="footer__link" data-page="login" href='/login' text='Вход'}}
            </li>
            <li>
                {{> Link class="footer__link" data-page="profile" href='#' text='В профиль'}}
            </li>
            <li>
                {{> Link class="footer__link" data-page="profileChange" href='#' text='Редактировать профиль'}}
            </li>
            <li>
                {{> Link class="footer__link" data-page="profileChangePassword" href='#' text='Изменить пароль'}}
            </li>
            <li>
                {{> Link class="footer__link" data-page="messenger" href='#' text='К чатам'}}
            </li>
        </ul>
    </nav>
    <nav>
        <ul>
        <li>
            {{> Link class="footer__link" data-page="404" href='#' text='404'}}
        </li>
        <li>
            {{> Link class="footer__link" data-page="500" href='#' text='500'}}
        </li>
        </ul>
    </nav>
</footer>`;
