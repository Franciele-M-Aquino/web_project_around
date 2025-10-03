import { enableValidation } from "./validate.js";

// ------------------ CARTÕES INICIAIS ------------------
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// ------------------ TEMPLATE ------------------
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsWrap = document.querySelector(".elements__list");

// ------------------ MODAIS ------------------
const profileEditButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const newPlaceModal = document.getElementById("add-place-modal");
const editProfileModal = document.getElementById("edit-profile-modal");
const modalCloseButtons = document.querySelectorAll(".modal__close-button");

// ------------------ FORMULÁRIOS ------------------
const profileFormElement = document.getElementById("profile-form");
const nameInput = profileFormElement.querySelector(".modal__input-name");
const descriptionInput = profileFormElement.querySelector(
  ".modal__input-description"
);
const placeFormElement = document.getElementById("place-form");
const placeInput = placeFormElement.querySelector("#new-place");
const linkInput = placeFormElement.querySelector("#add-link");

const profileUser = document.querySelector(".profile__user");
const profileBio = document.querySelector(".profile__bio");

const imagePopup = document.getElementById("modalImage");
const popupImage = document.getElementById("bigImageModal");
const imageTitle = document.getElementById("imageTitle");

// ------------------ FUNÇÕES DE MODAL ------------------
function openModal(modal) {
  modal.classList.add("modal_is-opened");

  // fechar com Esc
  document.addEventListener("keydown", handleEscClose);
  // fechar clicando fora do modal (overlay)
  modal.addEventListener("mousedown", handleOverlayClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("mousedown", handleOverlayClose);
}
// fechar com Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}
// fechar clicando fora do modal (overlay)
function handleOverlayClose(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

// ------------------ FUNÇÕES DE CARTÃO ------------------
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );
  deleteButton.addEventListener("click", () => cardElement.remove());
  enableImagePopup(cardImage, data.name);

  return cardElement;
}

function renderCard(data, wrap) {
  wrap.prepend(getCardElement(data));
}

initialCards.forEach((data) => renderCard(data, cardsWrap));

// ------------------ POPUP DE IMAGEM ------------------
function enableImagePopup(image, title) {
  image.addEventListener("click", () => {
    popupImage.src = image.src;
    popupImage.alt = title;
    imageTitle.textContent = title;
    openModal(imagePopup);
  });
}

// ------------------ EVENTOS ------------------
profileEditButton.addEventListener("click", () => openModal(editProfileModal));
addPlaceButton.addEventListener("click", () => openModal(newPlaceModal));

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".modal")));
});

// ------------------ SUBMITS ------------------
profileFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileUser.textContent = nameInput.value;
  profileBio.textContent = descriptionInput.value;
  closeModal(editProfileModal);
  profileFormElement.reset();
});

placeFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard({ name: placeInput.value, link: linkInput.value }, cardsWrap);
  closeModal(newPlaceModal);
  placeFormElement.reset();
});

// ------------------ HABILITAR VALIDAÇÃO ------------------
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
