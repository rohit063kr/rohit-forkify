import icons from '../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    this._data = data;
    if (!this._data || (Array.isArray(this._data) && !this._data.length))
      return this.renderError();

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    if (!this._data || (Array.isArray(this._data) && !this._data.length))
      return this.renderError();

    const newMarkup = this._generateMarkup();
    const newEl = Array.from(
      document
        .createRange()
        .createContextualFragment(newMarkup)
        .querySelectorAll('*')
    );
    const curEl = Array.from(
      document.querySelector('.recipe').querySelectorAll('*')
    );

    // updating textcontent
    newEl.forEach((el, i) => {
      if (!el.isEqualNode(curEl[i]) && el.firstChild.nodeValue.trim() !== '') {
        curEl[i].textContent = el.textContent;
      }
    });

    // updating attributes
    newEl.forEach((el, i) => {
      if (!el.isEqualNode(curEl[i])) {
        el.attributes.forEach(attr => {
          curEl[i].setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderLoadingSpinner() {
    this._parentElement.innerHTML = '';
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
