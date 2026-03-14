import {SORT_ORDER} from "../config/constants.js";

export class PostsView {
    constructor() {
        this.content = document.getElementById("content");
        this.abortButton = document.getElementById("abort-button");
        this.sortButton = document.getElementById("sort-button");
        this.searchInput = document.getElementById("search-input");
    }

    renderLoading() {
        this.content.innerHTML = `
            <div class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
    }

    renderError(message) {
        this.content.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
              Error: ${message}
            </div>
        `;
    }

    renderPosts(posts) {
        if (posts.length === 0) {
            this.content.innerHTML = `
                <div class="alert alert-secondary text-center" role="alert">Empty</div>
            `;
            return;
        }

        this.content.innerHTML = `
            <div class="row">
               ${posts.map((post) => `
                    <div class="col-4 g-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">User ${post.userId}</h6>
                                <p class="card-text">${post.body}</p>
                            </div>
                         </div>
                    </div>
               `).join('')}
            </div>
        `;
    }

    updateSortButton(sortOrder) {
        this.sortButton.textContent = sortOrder === SORT_ORDER.ASC ? "DESC" : "ASC";
    }

    setAbortButtonState(disabled) {
        this.abortButton.disabled = disabled;
    }
}