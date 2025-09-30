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

// ------------------ WRAPPERS E SELECTORS ------------------
const cardsWrap = document.querySelector(".elements__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const newPlaceModal = document.getElementById("add-place-modal");
const editProfileModal = document.getElementById("edit-profile-modal");

const modalCloseButtons = document.querySelectorAll(".modal__close-button");

//--------- SELEÇÃO DOS ELEMENTOS DO FORMULÁRIO DE EDIÇÃO DE PERFIL ---------------
const profileFormElement = document.getElementById("profile-form");
const nameInput = profileFormElement.querySelector(".modal__input-name");
const descriptionInput = profileFormElement.querySelector(
  ".modal__input-description"
);
const nameError = document.getElementById("name-error");
const aboutError = document.getElementById("about-error");
const saveButton = document.getElementById("saveButton");

const modalInputPlace = document.querySelector(".modal__input-place");
const modalInputLink = document.querySelector(".modal__input-link");

const profileUser = document.querySelector(".profile__user");
const profileBio = document.querySelector(".profile__bio");

const cardSubmit = document.getElementById("place-form");

const imagePopup = document.getElementById("modalImage");
const popupImage = document.getElementById("bigImageModal");
const imageTitle = document.getElementById("imageTitle");

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

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  enableImagePopup(cardImage, data.name);

  return cardElement;
}

function renderCard(data, wrap) {
  wrap.prepend(getCardElement(data));
}

initialCards.forEach((data) => renderCard(data, cardsWrap));

// ------------------ FUNÇÕES DE MODAL ------------------
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// ------------------ POPUP DE IMAGEM ------------------
function enableImagePopup(image, title) {
  image.addEventListener("click", () => {
    popupImage.src = image.src;
    popupImage.alt = title;
    imageTitle.textContent = title;
    openModal(imagePopup);
  });
}

// ------------------ EVENTOS DE ABRIR MODAL ------------------
profileEditButton.addEventListener("click", () => openModal(editProfileModal));
addPlaceButton.addEventListener("click", () => openModal(newPlaceModal));

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalToClose = button.closest(".modal");
    closeModal(modalToClose);
  });
});

// ------------------ VALIDAÇÃO DO FORMULÁRIO DE PERFIL ------------------
// Checagem dos imputs
function checkInput(input, errorElement) {
  if (!input.validity.valid) {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add("modal__error");
  } else {
    errorElement.textContent = "";
    errorElement.classList.remove("modal__error");
  }
}

// Ativação e desativação do botão de salvar
function toggleSaveButton() {
  if (profileFormElement.checkValidity()) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}
// Ouvidores do form de edição
[nameInput, descriptionInput].forEach((input) => {
  const errorElement = input.id === "profile-name" ? nameError : aboutError;
  input.addEventListener("input", () => {
    checkInput(input, errorElement);
    toggleSaveButton();
  });
});

// Inicializa estado do botão como já estando desativado
toggleSaveButton();

// Submit do formulário de perfil - Após salvar o que deve ser executado
profileFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileUser.textContent = nameInput.value;
  profileBio.textContent = descriptionInput.value;
  profileFormElement.reset();
  nameError.textContent = "";
  aboutError.textContent = "";
  toggleSaveButton();
  closeModal(editProfileModal);
});

// ------------------ FORMULÁRIO DE NOVO LOCAL ------------------
cardSubmit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard(
    { name: modalInputPlace.value, link: modalInputLink.value },
    cardsWrap
  );
  cardSubmit.reset();
  closeModal(newPlaceModal);
});
