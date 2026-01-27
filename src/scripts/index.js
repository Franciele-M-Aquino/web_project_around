import Api from "./Api.js";
import Card from "./Card.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "e3d2d14b-6baf-46d5-ab37-aacad0e87084",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__user",
  jobSelector: ".profile__bio",
  avatarSelector: ".profile__image",
});

let userId;

// --- POPUPS ---

// Zoom da Imagem
const imagePopup = new PopupWithImage("#modalImage");
imagePopup.setEventListeners();

// Popup de Confirmação de Deleção
const confirmDeletePopup = new PopupWithConfirmation("#delete-confirm-modal");
confirmDeletePopup.setEventListeners();

// Formulário de Perfil
const profilePopup = new PopupWithForm("#edit-profile-modal", (inputValues) => {
  profilePopup.renderLoading(true);
  api
    .editUserInfo({
      name: inputValues.name,
      description: inputValues.description,
    })
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.about });
      profilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => profilePopup.renderLoading(false));
});
profilePopup.setEventListeners();

// Formulário de Novo Card
const addCardPopup = new PopupWithForm("#add-place-modal", (inputValues) => {
  addCardPopup.renderLoading(true, "Criando...");
  api
    .addCard(inputValues)
    .then((newCardData) => {
      renderCard(newCardData);
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => addCardPopup.renderLoading(false));
});
addCardPopup.setEventListeners();

// FORMULÁRIO DE AVATAR
const avatarPopup = new PopupWithForm("#avatar-modal", (inputValues) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(inputValues)
    .then((res) => {
      userInfo.setUserInfo({ avatar: res.avatar });
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

// --- RENDERIZAÇÃO DE CARDS ---

function renderCard(item) {
  const card = new Card(
    item,
    "#card-template",
    (name, link) => imagePopup.open(name, link), // handleCardClick
    (id) => {
      // handleDeleteClick
      confirmDeletePopup.open();
      confirmDeletePopup.setSubmitAction(() => {
        api
          .deleteCard(id)
          .then(() => {
            card.removeCard();
            confirmDeletePopup.close();
          })
          .catch((err) => console.log(err));
      });
    },
    (id, isLiked) => {
      // handleLikeClick
      const apiAction = isLiked ? api.removeLike(id) : api.addLike(id);
      apiAction
        .then((res) => card.updateLikes(res.isLiked))
        .catch((err) => console.log(err));
    },
    userId,
  );
  cardSection.addItem(card.generateCard());
}

const cardSection = new Section({ renderer: renderCard }, ".elements__list");

// --- BOTÕES DE ABERTURA ---

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const data = userInfo.getUserInfo();
    document.querySelector("#profile-name").value = data.name;
    document.querySelector("#profile-about").value = data.job;
    editProfileValidation.resetValidation();
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addPlaceValidation.resetValidation();
  addCardPopup.open();
});

document
  .querySelector(".profile__avatar-edit-button")
  .addEventListener("click", () => {
    avatarValidation.resetValidation();
    avatarPopup.open();
  });

// --- VALIDAÇÃO ---
const editProfileValidation = new FormValidator(
  validationSettings,
  document.querySelector("#profile-form"),
);
const addPlaceValidation = new FormValidator(
  validationSettings,
  document.querySelector("#place-form"),
);
editProfileValidation.enableValidation();
addPlaceValidation.enableValidation();

const avatarValidation = new FormValidator(
  validationSettings,
  document.querySelector("#avatar-form"),
);
avatarValidation.enableValidation();

// --- INICIALIZAÇÃO ---
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    cardSection.renderItems(initialCards);
  })
  .catch((err) => console.log(err));
