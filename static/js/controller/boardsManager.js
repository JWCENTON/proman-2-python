import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, createBoard} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";


export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
};

export function getNewBoardTitle(){
    let saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', () => {
        let title = document.getElementById('save-title').value;
        let boardTitle = document.getElementById("bt");
        boardTitle.setAttribute('hidden', 'value');
        let button = document.getElementById("create-board");
        button.removeAttribute('hidden');
        let saveButton = document.getElementById('sb');
        saveButton.setAttribute('hidden', 'value');
        console.log(title);
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

