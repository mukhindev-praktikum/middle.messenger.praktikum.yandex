class Templator {
  constructor() {
    this.context = null;
    this.components = {};
    this._handleFound = this._handleFound.bind(this);
    this.compile = this.compile.bind(this);
  }

  // Обработчик получения значения из контекста
  _getValueFromContext(key) {
    // Если ключ без точки
    if (!key.includes('.')) {
      // Вернуть значение из корня контекста
      return this.context[key];
    }
    // Иначе, поделить ключ по точке и ...
    const path = key.split('.');
    // Использовать как путь для извлечения из контекста
    return path.reduce((acc, k) => acc[k], this.context);
  }

  // Обработчик усов
  _handleFound(found) {
    // Извлекаем текст
    const [key] = found.match(/[\w.]+/);
    // Получаем значение из контекста
    const value = this._getValueFromContext(key);
    // Если значение не определено
    if (value === undefined) {
      return `{{ Контекст "${key}" не определён }}`;
    }
    // Если ключ с большой буквы, считать компонентом
    if (key[0] === key[0].toUpperCase()) {
      window['tmpl'] = value.getContent();
      return '<div id="tmpl">%tmpl%</div>';
    }
    return value;
  }

  compile(template, context) {
    this.context = context;
    return template
      .replace(/{{(?<key>.*?)}}/gs, this._handleFound)
      .trim();
  }
}

export const { compile } = new Templator();
