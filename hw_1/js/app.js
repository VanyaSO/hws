import {PostsModel} from "./models/PostsModel.js";
import {PostsView} from "./views/PostsView.js";
import {PostsController} from "./controller/PostsController.js";

const model = new PostsModel();
const view = new PostsView();
const controller = new PostsController(model, view);
