import Templator from '../../utils/Templator';
import getElementFromString from '../../utils/getElementFromString';
import Main from '../../components/layouts/Main/Main';
import ErrorInfo from '../../components/blocks/ErrorInfo/ErrorInfo';
import '../../assets/styles/global.scss';
import './404.scss';

function Error404Page() {
  Error404Page.context = {
    className: 'error-404-page',
    Main,
    ErrorInfo,
  };

  return `
    <div class="{{ className }}">
      <Main
        parentBlock="{{ className }}"
        mix="main"
      >
        <ErrorInfo
          statusCode="404"
          message="Такой страницы нет"
          returnLink="/chat.html"
          returnLinkText="Вернуться к чатам"
        />
      </Main>
    </div>
  `;
}

const html = new Templator().compile(Error404Page);
const pageElement = getElementFromString(html);
const root = document.body;
root.append(pageElement);
