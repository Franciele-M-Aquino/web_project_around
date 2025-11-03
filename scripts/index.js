import Popup from "./Popup.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

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
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// ------------------ TEMPLATE ------------------
const cardsWrap = document.querySelector(".elements__list");

// ------------------ MODAIS ------------------
const profileEditButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const modalCloseButtons = document.querySelectorAll(".modal__close-button");

const editProfileModal = document.getElementById("edit-profile-modal");
const newPlaceModal = document.getElementById("add-place-modal");

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

// ------------------ POPUPS ------------------
const editProfilePopup = new Popup("#edit-profile-modal");
editProfilePopup.setEventListeners();

const newPlacePopup = new Popup("#add-place-modal");
newPlacePopup.setEventListeners();

const imagePopupClass = new Popup("#modalImage");
imagePopupClass.setEventListeners();

const popupImage = document.getElementById("bigImageModal");
const imageTitle = document.getElementById("imageTitle");

// ------------------ EVENTOS ------------------
profileEditButton.addEventListener("click", () => editProfilePopup.open());
addPlaceButton.addEventListener("click", () => newPlacePopup.open());

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".modal")));
});

// ------------------ FUNÇÃO PARA CRIAR CARDS ------------------
function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    popupImage.src = link;
    popupImage.alt = name;
    imageTitle.textContent = name;
    imagePopupClass.open();
  });

  return card.generateCard();
}

// Renderiza os cartões iniciais
initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardsWrap.prepend(cardElement);
});

// ------------------ SUBMITS ------------------
profileFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileUser.textContent = nameInput.value;
  profileBio.textContent = descriptionInput.value;
  editProfilePopup.close();
  profileFormElement.reset();
});

placeFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCard({ name: placeInput.value, link: linkInput.value });
  cardsWrap.prepend(newCard);
  newPlacePopup.close();
  placeFormElement.reset();
});

// ------------------ HABILITAR VALIDAÇÃO ------------------
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// cria uma instância de validação para cada formulário
const editProfileValidation = new FormValidator(
  validationSettings,
  profileFormElement
);
const addPlaceValidation = new FormValidator(
  validationSettings,
  placeFormElement
);

// ativa a validação
editProfileValidation.enableValidation();
addPlaceValidation.enableValidation();
