export default class Card {
  // Agora recebemos funções de callback para lidar com Likes e Deletar
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; // ID único do cartão vindo do servidor
    this._ownerId = data.owner._id || data.owner; // ID de quem criou o cartão
    this._isLiked = data.isLiked; // Estado inicial da curtida
    this._userId = userId; // Seu ID de usuário para comparação

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // Método público para atualizar a cor do coração e o estado interno
  updateLikes(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  // Remove o elemento do DOM após confirmação do servidor
  removeCard() {
    this._element.remove();
    this._element = null;
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

    // Se o cartão não for seu, removemos o ícone da lixeira
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    // Define o estado inicial do like na renderização
    this.updateLikes(this._isLiked);
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      // Aqui chamamos a função que veio do index.js via construtor
      this._handleLikeClick(this._id, this._isLiked);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
