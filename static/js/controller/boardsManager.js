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

function checkForEmptyTitle(title){
    if (!title || title == ' '){
        return false
    }
    return true
};

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

