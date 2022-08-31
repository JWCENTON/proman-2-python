import {dataHandler, sendBoardTitle, apiPost} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, createBoard} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {statusManager} from "./statusManager.js";


export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.board-toggle[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(
                `.board-title[data-board-id="${board.id}"]`,
                "click",
                startEditBoardTitle
            );
            domManager.addEventListener(
                `.board-title-save[data-board-id="${board.id}"]`,
                "click",
                endEditBoardTitle
            );
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    document.querySelector(`.board-toggle[data-board-id="${boardId}"]`).classList.toggle('hidden');
    statusManager.loadStatuses(boardId);
    cardsManager.loadCards(boardId);
};

function checkForEmptyTitle(title){
    if (!title || title == ' '){
        return false
    }
    return true
};

function startEditBoardTitle(e) {
    let spanElem = e.target;
    spanElem.hidden = true;
    let boardId = spanElem.getAttribute('data-board-id');
    let inputElem = document.querySelector(`.board-title-edit[data-board-id="${boardId}"]`)
    console.log("InputElem: ", inputElem);
    inputElem.hidden = false;
    let saveElem = document.querySelector(`.board-title-save[data-board-id="${boardId}"]`)
    console.log("SaveElem: ", saveElem);
    saveElem.hidden = false;
}

function endEditBoardTitle(e) {
    let saveElem = e.target;
    saveElem.hidden = true;
    let boardId = saveElem.getAttribute('data-board-id');
    let inputElem = document.querySelector(`.board-title-edit[data-board-id="${boardId}"]`)
    let newTitle = inputElem.value
    inputElem.hidden = true;
    let spanElem = document.querySelector(`.board-title[data-board-id="${boardId}"]`)
    spanElem.innerHTML = newTitle;
    spanElem.hidden = false;
    // send data to api -> POST on /api/board/${boardId}
    let payload = {};
    payload.id = boardId;
    payload.title = newTitle;
    apiPost("http://127.0.0.1:5000/api/boards/" + `${boardId}`, payload);
}

export function getNewBoardTitle(){
    let saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', () => {
        let title = document.getElementById('save-title').value;
        if (checkForEmptyTitle(title) == false) {
            return console.log('Empty title');
        }
        let boardTitle = document.getElementById("bt");
        let button = document.getElementById("create-board");
        let saveButton = document.getElementById('sb');
        document.getElementById('save-title').value = '';
        boardTitle.setAttribute('hidden', 'value');
        button.removeAttribute('hidden');
        saveButton.setAttribute('hidden', 'value');
        console.log(title); // consoling for testing
        sendBoardTitle(title);
        window.location.reload();
        return title;
    });
};

function createNewBoard(){
    let button = document.getElementById("create-board");
    button.addEventListener('click',() => {
        let boardTitle = document.getElementById("bt");
        boardTitle.removeAttribute('hidden');
        button.setAttribute('hidden', 'value');
        let saveButton = document.getElementById('sb');
        saveButton.removeAttribute('hidden');
        getNewBoardTitle(); // just for testing to check what is returned as a new board title in console
    });
};

export function createBoardButton(){
    const boardBuilder = createBoard();
    domManager.addChild('#root', boardBuilder);
    createNewBoard();
};

