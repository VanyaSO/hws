import { SORT_ORDER } from '../config/constants.js';

export class PostsModel {
    constructor() {
        this.posts = [];
        this.sortOrder = SORT_ORDER.ASC;
        this.abortController = null;
    }

    getPosts() {
        return this.posts;
    }

    getSortOrder() {
        return this.sortOrder;
    }

    setPosts(posts) {
        this.posts = posts;
    }

    setAbortController(controller) {
        this.abortController = controller;
    }

    toggleSortOrder() {
        this.sortOrder = this.sortOrder === SORT_ORDER.ASC
            ? SORT_ORDER.DESC
            : SORT_ORDER.ASC;
        this.sortPosts();
    }

    sortPosts() {
        this.posts.sort((a, b) =>
            this.sortOrder === SORT_ORDER.ASC
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        );
    }

    abortRequest() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }
}