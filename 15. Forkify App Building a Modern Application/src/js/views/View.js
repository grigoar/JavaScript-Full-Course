import icons from "url:../../img/icons.svg"; //Parcel 2
export default class View {
  _data;
  render(data, render = true) {
    //if there is no data, or if the array received is empty
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    // recipeContainer.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    //create a new markup but not rendering it; comparing old version with new version so we can just update the elements in the DOM
    // if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    //transforming the string into an DOM node object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // const newElements = newDOM.querySelectorAll("*");
    //Converting the node list to an array
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    // console.log(newElements);
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(curElements, newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //comparing the nodes content
      //   console.log(curEl, newEl.isEqualNode(curEl));

      //Updated changed TEXT
      //if is null we jump over it---Optional
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        //the firstChild method return firstChild, and we must use it on the elements that only have text, and for the firstChild will be called nodeValue property that returns only if the content is text
        // console.log("🎭", newEl.firstChild?.nodeValue.trim());

        curEl.textContent = newEl.textContent;
      }

      //Updated changed Attributes
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes);
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach((attr) => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    // this._parentElement.innerHTML = "";
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //setting a default
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //success message
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
