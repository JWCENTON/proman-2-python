import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
    let newBoardTitle = createBoardButton();
   }

init();
