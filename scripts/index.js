//Variável//

const modal = document.querySelector(".modal");

const profileEditButton = document.querySelector(".profile__edit-button");

const modalCloseButton = document.querySelector(".modal__close-button");

const profileFormElement = document.querySelector(".modal__form");

const nameInput = profileFormElement.querySelector(".modal__input-name");

const descriptionInput = profileFormElement.querySelector(
  ".modal__input-description"
);

//Mudar nome do perfil
const profileUser = document.querySelector(".profile__user");
//Mudar nome da descrição
const profileBio = document.querySelector(".profile__bio");

//Função//
function openModal() {
  modal.classList.add("modal_is-opened");
}

function closeModal() {
  modal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //impedir que a página seja recarregada toda vez que submeter dados//
  profileUser.textContent = nameInput.value;
  profileBio.textContent = descriptionInput.value;
  closeModal();
}

//Evento//

profileEditButton.addEventListener("click", openModal);

modalCloseButton.addEventListener("click", closeModal);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
