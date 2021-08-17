import View from './View.js';

class SearchResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'There are no result for your query! Please try again latter';

  _generateMarkup() {
    return this._data.map(this._generateMarupPreview).join('');
  }

  _generateMarupPreview(rec) {
    return `
    <li class="preview">
      <a class="preview__link" href="#${rec.id}">
        <figure class="preview__fig">
          <img src="${rec.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${rec.title}</h4>
          <p class="preview__publisher">${rec.publisher}</p>
        </div>
      </a>
    </li>
    `;
  }
}
export default new SearchResultView();
