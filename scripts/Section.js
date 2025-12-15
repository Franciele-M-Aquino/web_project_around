export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // array de dados (ex: initialCards)
    this._renderer = renderer; // função que cria e renderiza cada item
    this._container = document.querySelector(containerSelector); // onde os itens entram
  }

  // Renderiza todos os itens iniciais
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Adiciona um item DOM ao contêiner
  addItem(element) {
    this._container.prepend(element);
  }
}
