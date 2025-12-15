import PopupWithImage from "./PopupWithImage.js";
import Popup from "./Popup.js";
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
const cardsWrap = document.querySelector(".elements__list"); //pega o local do HTML onde os cartões serão colocados (o contêiner que os guarda).

// ------------------ MODAIS ------------------
//código pega os botões, modais e formulários — tudo que o usuário pode clicar, abrir ou digitar
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
//O código está criando três popups diferentes com base na classe Popup: O de editar perfil, O de adicionar novo local, O de abrir imagem grande

const editProfilePopup = new Popup("#edit-profile-modal");
editProfilePopup.setEventListeners();

const newPlacePopup = new Popup("#add-place-modal");
newPlacePopup.setEventListeners();

const imagePopup = new PopupWithImage("#modalImage");
imagePopup.setEventListeners();

// ------------------ EVENTOS ------------------
//Quando clica no botão de editar perfil, ele chama o método .open() da classe Popup, que: adiciona a classe "modal_is-opened" no HTML, e faz o popup aparecer.

profileEditButton.addEventListener("click", () => editProfilePopup.open());
addPlaceButton.addEventListener("click", () => newPlacePopup.open());

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".modal")));
});

// ------------------ FUNÇÃO PARA CRIAR CARDS ------------------

// Cria um novo cartão a partir da classe Card.Passa os dados (nome + imagem), passa o seletor do template, e passa uma função dizendo o que fazer ao clicar na imagem:
// abrir o popup grande (imagePopupClass.open()). Depois chama generateCard(), que monta o HTML do card e devolve ele pronto pra colocar na tela.

function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });

  return card.generateCard();
}

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

// --------- RENDERIZAR CARTÕES INICIAIS ------------------

cardSection.renderItems();

// ------------------ SUBMITS ------------------
//Isso acontece quando clica em Salvar dentro do formulário de perfil:
profileFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault(); //impede o comportamento padrão do navegador (recarregar a página).
  profileUser.textContent = nameInput.value; //Pega o texto digitado nos inputs e Coloca no perfil da página
  profileBio.textContent = descriptionInput.value; //Pega o texto digitado nos inputs e Coloca no perfil da página
  editProfilePopup.close(); //Fecha o popup
  profileFormElement.reset(); //E limpa o formulário
});

//Segue a mesma lógica de cima
placeFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCard({ name: placeInput.value, link: linkInput.value });
  cardsWrap.prepend(newCard);
  newPlacePopup.close();
  placeFormElement.reset();
});

// ------------------ HABILITAR VALIDAÇÃO ------------------
//Define as regras (quais classes CSS usar, como mostrar erros etc.)

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

// ativa a validação ----- quando o usuário digita algo errado, o botão “Salvar” desativa e aparece a mensagem de erro automaticamente.
editProfileValidation.enableValidation();
addPlaceValidation.enableValidation();
