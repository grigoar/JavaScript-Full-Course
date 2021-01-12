class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search__field").value;
    this._clearInput();

    return query;
  }

  _clearInput() {
    // console.log(this._parentEl);
    this._parentEl.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    //need to access event in order to prevent reloading the page
    // console.log("first load");
    // const self = this;
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      //Why not here?
      //   this.#clearInput();
      // this.#parentEl.querySelector(".search__field").value = "";
    });
  }
}

export default new SearchView();
