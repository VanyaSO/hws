import {debounce} from "../utils/debounce.js";
import {BASE_URL} from "../config/constants.js";

export class PostsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.abortButton.addEventListener("click", () => this.handleAbort());
        this.view.sortButton.addEventListener("click", () => this.handleSort());
        this.view.searchInput.addEventListener("input", debounce((e) => this.handleSearch(e.target.value), 300));
        this.loadPosts();
    }

    handleAbort() {
        this.model.abortRequest();
    }

    handleSort() {
        this.model.toggleSortOrder();
        this.updateView();
    }

    handleSearch(searchTerm) {
        this.loadPosts(searchTerm);
    }

    updateView() {
        this.view.renderPosts(this.model.getPosts());
        this.view.updateSortButton(this.model.getSortOrder());
    }

    async loadPosts(searchTerm = "") {
        this.view.renderLoading();

        const abortController = new AbortController();
        this.model.setAbortController(abortController);
        this.view.setAbortButtonState(false);

        const params = new URLSearchParams();
        if (searchTerm) params.append("title_like", searchTerm);

        try {
            const response = await fetch(`${BASE_URL}/posts?${params}`, {
                signal: abortController.signal
            });

            if (!response.ok) {
                throw new Error("Failed to load posts");
            }

            const data = await response.json();

            this.model.setPosts(data);
            this.model.sortPosts();
            this.updateView();
        } catch (error) {
            if (error.name === "AbortError") {
                this.view.renderError("Request aborted");
            } else {
                this.view.renderError(error.message);
            }
        } finally {
            this.model.setAbortController(null);
            this.view.setAbortButtonState(true);
        }
    }
}