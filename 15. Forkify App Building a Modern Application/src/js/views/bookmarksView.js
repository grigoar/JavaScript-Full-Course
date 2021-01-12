import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg"; //Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :D`;
  _message = "";

  _generateMarkup() {
    // console.log(this._data);

    // return this._data.map(this._generateMarkupPreview).join("");
    return this._data.map((bookmark) => previewView.render(bookmark, false)).join("");
  }
}

export default new BookmarksView();

// import View from "./View.js";
// import icons from "url:../../img/icons.svg"; //Parcel 2

// class BookmarksView extends View {
//   _parentElement = document.querySelector(".bookmarks__list");
//   _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :D`;
//   _message = "";

//   _generateMarkup() {
//     // console.log(this._data);

//     return this._data.map(this._generateMarkupPreview).join("");
//   }

//   _generateMarkupPreview(result) {
//     //getting the Id from the hash from the url link
//     const id = window.location.hash.slice(1);
//     return `
//     <li class="preview">
//        <a class="preview__link ${result.id === id ? "preview__link--active" : ""}" href="#${
//       result.id
//     }">
//          <figure class="preview__fig">
//            <img src="${result.image}" alt="${result.title}" />
//          </figure>
//          <div class="preview__data">
//            <h4 class="preview__title">${result.title}</h4>
//            <p class="preview__publisher">${result.publisher}</p>

//          </div>
//        </a>
//      </li>
//  `;
//   }
// }

// export default new BookmarksView();
