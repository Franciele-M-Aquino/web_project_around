import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._popup.querySelector(".modal__submit-button");
  }

  // Método para qual função será executada ao confirmar
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  // Para o feedback de "Salvando..." no momento da exclusão
  renderLoading(isLoading, loadingText = "Sim", defaultText = "Sim") {
    if (isLoading) {
      this._submitButton.textContent = "Excluindo...";
    } else {
      this._submitButton.textContent = defaultText;
    }
  }
}
