//cartões iniciais

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

//Template

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//--Variável Passo 1--//

//Wrappers
const cardsWrap = document.querySelector(".elements__list");

const modal = document.querySelector(".modal");

const profileEditButton = document.querySelector(".profile__edit-button");

const addPlaceButton = document.querySelector(".profile__add-button");

const newPlaceModal = document.getElementById("add-place-modal");

const modalCloseButtons = document.querySelectorAll(".modal__close-button");

const profileFormElement = document.querySelector(".modal__form");

const nameInput = profileFormElement.querySelector(".modal__input-name");

const descriptionInput = profileFormElement.querySelector(
  ".modal__input-description"
);

const modalInputPlace = document.querySelector(".modal__input-place");

const modalInputLink = document.querySelector(".modal__input-link");

//Mudar nome do perfil
const profileUser = document.querySelector(".profile__user");
//Mudar nome da descrição
const profileBio = document.querySelector(".profile__bio");

//formulário novo lugar
const cardSubmit = document.getElementById("place-form");

//clones dos cards
const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  //alterações que são feitas para cada cartão
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  //ouvidores de eventos dos cards
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //esse trecho deixa de ser necessário quando aplicado o enableImage

  /*  cardImage.addEventListener("click", () => {
    console.log("Preview imagem:", data.name);
  });*/

  enableImagePopup(cardImage, data.name);

  return cardElement;
};

//Função de renderização dos cards
const renderCard = (data, wrap) => {
  wrap.prepend(getCardElement(data));
};
//Renderizar os cards iniciais
initialCards.forEach((data) => {
  renderCard(data, cardsWrap);
});

//--Função passo 2--//
function openModal(formModal) {
  formModal.classList.add("modal_is-opened");
}

function closeModal(formModal) {
  formModal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //impedir que a página seja recarregada toda vez que submeter dados//
  profileUser.textContent = nameInput.value;
  profileBio.textContent = descriptionInput.value;
  profileFormElement.reset(); //limpa o formulário após submeter
  closeModal(editProfileModal);
}

//função para adicionar a foto no feed
function handleCardSubmit(evt) {
  evt.preventDefault(); //impedir que a página seja recarregada toda vez que submeter dados//
  renderCard(
    { name: modalInputPlace.value, link: modalInputLink.value },
    cardsWrap
  );
  cardSubmit.reset();
  closeModal(newPlaceModal);
}

//função para habilitar o popup da imagem

// Seletores do popup de imagem
const imagePopup = document.getElementById("modalImage");
const popupImage = document.getElementById("bigImageModal");
const imageTitle = document.getElementById("imageTitle");

// Função para habilitar popup ao clicar na imagem
function enableImagePopup(image, title) {
  image.addEventListener("click", () => {
    popupImage.src = image.src;
    popupImage.alt = title;
    imageTitle.textContent = title;
    openModal(imagePopup);
  });
}

//Evento--Passo 3--//

profileEditButton.addEventListener("click", () => openModal(modal));

addPlaceButton.addEventListener("click", () => openModal(newPlaceModal));

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalToClose = button.closest(".modal");
    closeModal(modalToClose);
  });
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

cardSubmit.addEventListener("submit", handleCardSubmit);
