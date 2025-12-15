export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; // armazena o callback
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._likeButton.classList.toggle("card__like-button_active")
    );

    this._deleteButton.addEventListener("click", () => this._element.remove());

    // Aqui conecta o clique da imagem ao callback passado do index.js
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
