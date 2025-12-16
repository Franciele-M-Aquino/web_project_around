import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
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

// ------------------ FORMULÁRIOS ------------------
const profileFormElement = document.getElementById("profile-form");
const nameInput = profileFormElement.querySelector(".modal__input-name");
const descriptionInput = profileFormElement.querySelector(
  ".modal__input-description"
);

const placeFormElement = document.getElementById("place-form");
const placeInput = placeFormElement.querySelector("#new-place");
const linkInput = placeFormElement.querySelector("#add-link");

// ------------------ USER INFO (PASSO 5) ------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__user",
  jobSelector: ".profile__bio",
});

// ------------------ POPUPS ------------------
// Editar perfil
const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  (formData) => {
    userInfo.setUserInfo(formData);
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

// Adicionar novo lugar
const addPlacePopup = new PopupWithForm("#add-place-modal", (formData) => {
  const newCard = createCard({
    name: formData.placeTitle,
    link: formData.imageLink,
  });
  cardSection.addItem(newCard);
  addPlacePopup.close();
});
addPlacePopup.setEventListeners();

// Abrir imagem (PASSO 4)
const imagePopup = new PopupWithImage("#modalImage");
imagePopup.setEventListeners();

// ------------------ FUNÇÃO PARA CRIAR CARDS ------------------
function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });

  return card.generateCard();
}

// ------------------ SECTION ------------------
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  ".elements__list"
);
cardSection.renderItems();

// ------------------ EVENTOS ------------------
const profileEditButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.job;
  editProfilePopup.open();
});

addPlaceButton.addEventListener("click", () => addPlacePopup.open());

// ------------------ HABILITAR VALIDAÇÃO ------------------
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileValidation = new FormValidator(
  validationSettings,
  profileFormElement
);
const addPlaceValidation = new FormValidator(
  validationSettings,
  placeFormElement
);

editProfileValidation.enableValidation();
addPlaceValidation.enableValidation();
