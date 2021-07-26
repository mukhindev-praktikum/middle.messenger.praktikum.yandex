Текущий Pull Request https://github.com/mukhindev-praktikum/middle.messenger.praktikum.yandex/pull/4

# Чат

* Макет в Figma: [https://www.figma.com/file/nMKeQd1eOiWN27uZpuzREb/mukhin-chat?node-id=0%3A1](https://www.figma.com/file/nMKeQd1eOiWN27uZpuzREb/mukhin-chat?node-id=0%3A1)
* Опубликованное в Netlify приложение: [https://frosty-poincare-ded0e8.netlify.app](https://frosty-poincare-ded0e8.netlify.app)
* Опубликованное в Heroku (через контейнер docker) приложение: [https://praktikum-chat.herokuapp.com/](https://praktikum-chat.herokuapp.com/)

## Что это?

Cамостоятельная практическая работа, выполняемая в рамках обучения на курсе [Мидл фронтенд-разработчик](https://praktikum.yandex.ru/middle-frontend/) от [Яндекс.Практикум](https://praktikum.yandex.ru) на спринтах №1-4.

## Текущий этап

Спринт 4 из 4

## Спринт 1

https://github.com/mukhindev-praktikum/middle.messenger.praktikum.yandex/pull/1

* Свёрстан макет приложения чат в Figma. [Ссылка на макет](https://www.figma.com/file/nMKeQd1eOiWN27uZpuzREb/mukhin-chat?node-id=0%3A1)
* Разработан собственный [шаблонизатор](#шаблонизатор)
* Настроена сборка с использованием [Parcel](https://parceljs.org/) и раздача статики сервером на Express
* Свёрстаны основные страницы приложения с использованием шаблонизатора
* Приложение автоматически деплоится на [Netlify](https://www.netlify.com/) из ветки `deploy`. [Ссылка на приложение](https://frosty-poincare-ded0e8.netlify.app)

## Спринт 2

https://github.com/mukhindev-praktikum/middle.messenger.praktikum.yandex/pull/2

* Переход на TypeScript
* Реализация шины событий (`classes/EventBus.ts`)
* Реализация компонента (`classes/Block.ts`) с собственными пропсами, жизненным циклом и реактивным ререндером при изменении пропсов (использованы `Proxy`)
* [Шаблонизатор](#шаблонизатор) переписан с учётом применения в компонентах
* Реализован [BemHandler](#bemhandler), утилита для удобного присвоения классам имен по BEM.
* Приложение переписано с учётом новых компонентов
* На основных формах реализована клиентская валидация
* Реализация аналога fetch для запросов к серверу (`classes/HTTPTransport.ts`)

## Спринт 3

https://github.com/mukhindev-praktikum/middle.messenger.praktikum.yandex/pull/3

* Реализация клиентского роутера (`classes/Route.ts`, `classes/Router.ts`)
* Добавлен слой `api`
* Добавлен слой `controllers`
* Реализация центрального хранилища (`Store.ts`)
* Использован `WebSocket` для сообщений чата
* Реализован виртуальный список для сообщений чата (подгрузка сообщений по частям)
* Частично покрыто тестами (`Mocha`, `Chai`)
* В приложении реализованы следующее возможности:
  * Регистрация
  * Логин
  * Выход
  * Обновление данных профиля
  * Изменение аватара
  * Создание и удаление чата
  * Поиск, добавление и удаление пользователей в чате
  * Отправка и получение текстовых сообщений
* Добавлены правила `Content-Security-Policy`
* Для сервера раздачи статики добавлен rate-limit

## Спринт 4

https://github.com/mukhindev-praktikum/middle.messenger.praktikum.yandex/pull/4

* Переход с Parcel на Webpack
* Dockerfile для создания docker-контейнера с дистрибутивом и сервером на Express
* Деплой контейнера на Heroku

## TODO

- [ ] Пересмотреть Store
- [ ] Оптимизировать кол-во рендеров
- [ ] Аватары в сообщениях
- [ ] Отправка файлов в сообщениях
- [ ] Поиск сообщений

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

Запуск тестов

```bash
npm run test
```

## Шаблонизатор `v2`

Элементарный шаблонизатор.

> Вторая версия шаблонизатора, написанная с учётом применения в новых "живых" компонентах (`Block.ts`) введённых на спринте 2.
> Первая версия имела компонентный подход, основанных на функциях и рекурсии, но компоненты были неживые. Ререндер был возможен вручную и всего шаблона целиком.
> Посмотреть `v1` можно [здесь](https://github.com/mukhindev-praktikum/middle.messenger.praktikum.yandex/pull/1).

### Зачем нужен свой шаблонизатор?

Существует множество шаблонизаторов. Особого смысла делать очередной нет.
Данный шаблонизатор разрабатывается для саморазвития. Он не идеален. Хотя возможно вам он понравиться 😉.

### Использование с `Block.ts`

Смотрите комментарии к коду примера (Внимание! Структура папок в примере упрощена и не соответствует применённой в практической работе):

#### `./index.html`

```html
...
<body class="body">
  <!-- index.ts — скрипт с инициализацией шаблонизатора -->
  <script src="./index.ts"></script>
</body>
...
```

#### Шаблон корневого компонента (Страница) `./index.tmpl.ts`

* `<template></template>`: Разметка шаблона должна быть заключена в тег `template`. Атрибуты с данного тега будут перенесены на обёртку компонента.
* `{{key}}`: Значения будут заменены на соответствующий контекст из props компонента
* `<Components />`: Теги с большой буквы считаются компонентами. Их контекстом должны быть экземпляры `Block.ts`
* `<Components>children</Components>`: Переданное между тегами компонента присваивается в props.children компонента
* `<Components prop1="hello" prop2={{message}} prop3={{true}} />`: У компонентов атрибуты это пропсы, они будут установлены в props компонента. Внимание! Очередь присваивания props: сначала экземпляр Block.ts, затем атрибуты из шаблона.

```ts
export const template = () => `
  <template class="{{ className }}">
    <header class="{{ className }}__header">
      <h1 class="{{ className }}__title">Hello, world!</h1>
    </header>
    <main class="{{ className }}__main">
      <MyButton />
    </main>
  </template>
`;
```

#### Корневой компонент (Страница) `./index.ts`

```ts
import Block from './classes/Block';
import { compile } from './utils/templator';
// Импорт шаблона
import { template } from './index.tmpl';
// Импорт вложенного компонента
import Button from './components/Button';
// Стили корневого компонента
import './index.scss';

// Наследуем класс от Block.ts
class IndexPage extends Block {
  constructor() {
    // 'div' обёртка компонента (корневой элемент) 
    super('div', {
      // Данные свойства попадут в props компонента Button
      className: 'index-page',
      // Соответствует <MyButton /> в шаблоне
      MyButton: new Button({
        label: 'Моя кнопка',
        color: 'success',
        // Данная функция будет вызвана событием внутри Button
        onClick: () => {},
      }),
    });
  }

  render() {
    // Компиляция шаблона, вторым параметром текущего компонента
    // Компилятор будет использовать пропсы как контекст
    return compile(template, this.props);
  }
}

// Вставляем контент компонента на страницу
document.body.prepend(new IndexPage().getContent());
```

#### Шаблон вложенного компонент `./components/Button.tmpl.ts`

В шаблоне доступны props компонента компилирующего данный шаблон. Это можно задействовать для итераций и выводу по условиям.

```ts
import { TProps } from '../../../classes/Block';

// В шаблоне доступны props компонента компилирующего данный шаблон
export const template = (props: TProps) => `
  <template
    class="{{ className }}"
    ${props.title ? 'title="{{ title }}"' : ''}
  >
    {{ label }}
  </template>
`;

```

#### Вложенный компонент `./components/Button.ts`

```ts
import Block from '../../../classes/Block';
import { compile } from '../../../utils/templator';
import { template } from './Button.tmpl';
// Стили компонента
import './Button.scss';

// Описание интерфейса компонента
interface IButton {
  label?: string,
  color?: string,
  title?: string,
  onClick: () => void,
}

class Button extends Block {
  constructor(props: IButton) {
    // 'button' обёртка компонента (корневой элемент) 
    super('button', {
      className: 'button',
      color: props.color ?? 'primary',
      label: props.label ?? 'Лейбл по-умолчанию',
      title: props.title ?? '',
      // Объект событий, названия соответствуют названиям браузерных событий
      events: {
        // По клику вызывается функция onClick переданная в props
        click: props.onClick,
      },
    });
  }

  render() {
    return compile(template, this.props);
  }
}

// Экспортируем класс компонента
export default Button;
```

## BemHandler

Утилита для удобного присвоения классам имен по BEM

### Использование

```ts
import BemHandler from './utils/BemHandler';
// Создание экземпляра, в конструктор передаётся название блока
const bem = new BemHandler('input');
```

Если не передать параметров, вернётся имя блока:

```ts
bem.get() // input
```

Если передать строку в первый парамер, вернётся имя элемента блока:

```ts
bem.get('label') // input__label
```

Если передать во второй параметр строку, она будет считаться модификатором:

```ts
bem.get('label', 'active') // input__label_active
```

Если передать во второй параметр массив строк, получим несколько модификаторов:

```ts
bem.get('label', ['active', 'large']) // input__label_active input__label_large
```

Если передать во второй параметр объект, получим несколько модификаторов.
Если значение свойства строка — получим модификатор типа ключ_значение.
Если значение свойства true — получим модификатор типа значение.
Если значение свойства false — модификатор не вернётся.

```ts
bem.get('label', { color: 'red', large: false, active: true }) // input__label_color_red input__label_active
```

Если нужны модификаторы для блока, оставьте пустую строку в первом значении:

```ts
bem.get('', { color: 'red', large: false, active: true }) // input_color_red input_active
```

Третий параметр микс — будет добавлен как есть:

```ts
bem.get('', '', 'main-page') // input main-page
```

Пример со всеми тремя параметрами:

```ts
bem.get('label', { color: 'red'}, 'main-page') // input__label input__label_color_red main-page
```
