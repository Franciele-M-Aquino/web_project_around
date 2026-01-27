export default class Section {
  // Remova o 'items' do construtor se quiser, ou deixe como opcional
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Agora o renderItems recebe o array 'items' como argumento!
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element); // Use .append para manter a ordem do servidor
  }
}
