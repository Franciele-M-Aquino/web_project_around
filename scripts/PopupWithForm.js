import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
  }

  // coleta os valores dos inputs
  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

// ------------------ Popup de editar perfil ------------------

const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  (formData) => {
    profileUser.textContent = formData.name;
    profileBio.textContent = formData.description;
  }
);

editProfilePopup.setEventListeners();

// ------------------ Popup de adicionar lugar ------------------
const newPlacePopup = new PopupWithForm("#add-place-modal", (formData) => {
  const newCard = createCard({
    name: formData.placeTitle,
    link: formData.imageLink,
  });

  cardsWrap.prepend(newCard);
});

newPlacePopup.setEventListeners();
