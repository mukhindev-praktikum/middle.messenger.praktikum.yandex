# Чат

* Макет в Figma: [https://www.figma.com/file/nMKeQd1eOiWN27uZpuzREb/mukhin-chat?node-id=0%3A1](https://www.figma.com/file/nMKeQd1eOiWN27uZpuzREb/mukhin-chat?node-id=0%3A1)
* Опубликованное в Netlify приложение: [https://frosty-poincare-ded0e8.netlify.app](https://frosty-poincare-ded0e8.netlify.app)

## Что это?

Cамостоятельная практическая работа, выполняемая в рамках обучения на курсе [Мидл фронтенд-разработчик](https://praktikum.yandex.ru/middle-frontend/) от [Яндекс.Практикум](https://praktikum.yandex.ru) на спринтах №1-4.

## Текущий этап

Спринт 1 из 4

## Спринт 1

* Свёрстан макет приложения чат в Figma. [Ссылка на макет](https://www.figma.com/file/nMKeQd1eOiWN27uZpuzREb/mukhin-chat?node-id=0%3A1)
* Разработан собственный [шаблонизатор](#шаблонизатор)
* Настроена сборка с использованием [Parcel](https://parceljs.org/) и раздача статики сервером на Express
* Свёрстаны основные страницы приложения с использованием шаблонизатора
* Приложение автоматически деплоится на [Netlify](https://www.netlify.com/) из ветки `deploy`. [Ссылка на приложение](https://frosty-poincare-ded0e8.netlify.app)

## Установка и запуск

### Установка

Установка зависимостей проекта:

```bash
npm i
```

### Сборка и запуск

Сборка проекта. Используемый сборщик [Parcel](https://parceljs.org/):

```bash
npm run build
```

Сборка проекта с наблюдением за файлами (пересобирается при изменении файлов):

```bash
npm run watch
```

Выполняется сборка и запуск статического сервера на Express, на порту 3000. http://localhost:3000:

```bash
npm run start
```

Сборка проекта с наблюдением за файлами и запуск статического сервера на Express, на порту 3000. http://localhost:3000:

```bash
npm run dev
```

Проверка на стилистические и типовые ошибки. Используются правила Airbnb.

```bash
npm run lint
```

## Шаблонизатор

Элементарный шаблонизатор с компонентами-функциями.

### Зачем нужен свой шаблонизатор?

Существует множество шаблонизаторов. Особого смысла делать очередной нет.
Данный шаблонизатор разрабатывается для саморазвития. Он не идеален. Хотя возможно вам он понравиться 😉.

### Использование

Смотрите комментарии к коду примера:

`./index.html`

```html
...
<body class="body">
  <!-- #app — элемент в который будет выводиться результат -->
  <div id="app"></div>
  <!-- index.js — скрипт с инициализацией шаблонизатора -->
  <script src="./index.js"></script>
</body>
...
```

`./index.js`

```js
// Импорт шаблонизатора
import Templator from './utils/Templator';
// Импорт индексного компонента
import App from './components/App';

// Результат шаблонизации
const html = new Templator().compile(App);
// Dom-элемент для вывода
const app = document.getElementById('app');
// Вывод на страницу
app.innerHTML = html;
```

`./components/App.js`

```js
// Импорт одного компонента в другой
import Header from './Header';
// Стили компонента
import './App.css';

function App() {
  // Добавляется контекст
  App.context = {
    // Импортированый компонент регистрируется к контексте
    Header,
    className: 'app',
    // В контексте могут быть объекты, доступ через точку {{ user.name }}
    user: {
      name: 'Sergey',
    },
    // Метод
    handleClick(target) {
      console.log('Клик по кнопке', target);
    },
  };

  /* 
    Компоненты определяются по заглавной букве
    У компонентов атрибуты это пропсы, они прокинутся внутрь при вызове компонента
    prop="text" — будет передано текстовое значение
    prop="{{ contextKey }}" — прокинется соответствующий контекст из родителя
    prop="{{ true }}" — будет сконвертировано в соответствующее булевое значение
  */
  return `
    <main class="{{ className }}">
      <Header title="Hello World!">
        <nav>Навигация</nav>
      </Header>
      <h2 class="{{ className }}__title">User: {{ user.name }}</h2>
      <button onclick="{{ handleClick(this) }}">Кнопка</button>
    </main>
  `;
}

export default App;
```

`./components/Header.js`

```js
// Стили компонента
import './Header.css';

// Извлекаются пропсы children и title переданные в компонент в App.js
// children зарезервированный пропс, в него попадает контент переданный между тегами компонента
function Header({ children, title }) {
  Header.context = {
    className: 'header',
    children,
    title,
  };

  return `
    <header class="{{ className }}">
      <h1 class="{{ className }}__title">{{ title }}</h1>
      {{ children }}
    </header>
  `;
}

export default Header;
```

