import Templator from '../../utils/Templator';
import Main from '../../components/layouts/Main/Main';
import Links from '../../components/blocks/Links/Links';
import '../../assets/styles/global.scss';
import './index.scss';
import getElementFromString from '../../utils/getElementFromString';

function IndexPage() {
  IndexPage.context = {
    className: 'index-page',
    Main,
    Links,
    menu: [
      { name: 'Чат', to: '/chat.html' },
      { name: 'Логин', to: '/sign-in.html' },
      { name: 'Регистрация', to: '/sign-up.html' },
    ],
    links: [
      { name: 'Чат', to: '/chat.html' },
    ],
  };

  return `
    <div class="{{ className }}">
      <header class="{{ className }}__header">
        <h1 class="{{ className }}__title">Чат</h1>
      </header>
      <Main>
        <section>
          <h2 class="{{ className }}__section-title">Страницы приложения</h2>
          <Links links="{{ menu }}" />
        </section>
        <section>
          <h2 class="{{ className }}__section-title">Дополнительные ссылки</h2>
          <Links links="{{ links }}" />
        </section>
      </Main>
    </div>
  `;
}

const html = new Templator().compile(IndexPage);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
