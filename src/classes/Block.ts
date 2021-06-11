import { v4 as uuid } from 'uuid';
import EventBus from './EventBus';
import getElementsFromString from '../utils/getTemplateFromHTML';

type TProps = Record<string, unknown>

class Block {
  private _uuid: string;
  private _meta: {
    tagName: string;
    props: TProps;
  };
  private _element: HTMLElement;
  private eventBus: () => EventBus;
  public props: TProps;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(tagName: string = 'div', props: TProps = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this._uuid = uuid();

    this.props = this._makePropsProxy({ ...props, _uuid: this._uuid });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return oldProps !== newProps;
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _renderChildComponents(elements: NodeListOf<Element>) {
    elements.forEach((markerElement) => {
      if (markerElement instanceof HTMLElement) {
        const parent = markerElement.parentNode;
        if (parent && markerElement.dataset.uuid)  {
          const blockElement = window._components[markerElement.dataset.uuid];
          parent.replaceChild(blockElement, markerElement);
        }
      }
    });
  }

  _render() {
    const blockHTML = this.render();
    if (blockHTML) {
      const template = getElementsFromString(blockHTML);
      // Перенос атрибутов с <template> на обёртку блока
      if (template) {
        template.getAttributeNames()
        .forEach((name) => {
          this._element.setAttribute(name, template.getAttribute(name) || '');
        });
        const blockElements = template.content.cloneNode(true);
        this._element.innerHTML = '';
        this._element.append(blockElements);
        const markerElements = this._element.querySelectorAll('[data-uuid]');
        this._renderChildComponents(markerElements);
        this._element.removeAttribute('data-uuid');
      }
    }
  }

  render(): void | string {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: TProps) {
    return new Proxy(props, {
      set: (target: TProps, prop: string, value: unknown) => {
        target[prop] = value;
        this._meta.props = this.props;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this._meta.props, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-uuid', this._uuid);
    return element;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;