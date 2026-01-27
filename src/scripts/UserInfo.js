export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement ? this._nameElement.textContent : "",
      job: this._jobElement ? this._jobElement.textContent : "",
    };
  }

  setUserInfo({ name, job, avatar }) {
    if (this._nameElement && name) this._nameElement.textContent = name;

    if (this._jobElement && job) this._jobElement.textContent = job;

    if (this._avatarElement && avatar) {
      this._avatarElement.src = avatar;
    }
  }
}
