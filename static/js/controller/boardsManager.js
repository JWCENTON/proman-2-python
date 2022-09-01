import {dataHandler} from "../data/dataHandler.js";
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
            domManager.addEventListener(
                `.status-add[data-board-id="${board.id}"]`,
                "click",
                addBoardStatus
            );
            domManager.addEventListener(

                `.board-add[data-board-id="${board.id}"]`,
                "click",
                addCard(`${board.id}`)
            );
             domManager.addEventListener(
                `.remove-board[data-board-id="${board.id}"]`,
                "click",
                deleteBoard
            );
        }
    },
};

function addCard(boardID){
    let modal = document.getElementById("myModal");
    let btn = document.getElementById(`myBtn${boardID}`);
    let span = document.getElementsByClassName("close")[0];
    let input = document.getElementById(`card-input${boardID}`);
    let save = document.getElementById(`save-card${boardID}`);
    btn.addEventListener('click', () => {
      modal.style.display = "block";
    })
    span.addEventListener('click', () => {
      modal.style.display = "none";
    })
    save.addEventListener('click', () => {
        modal.style.display = "none";
        let payload = input.value;
        dataHandler.createNewCard(payload, boardID, '1');
        input.value = '';
    })
    window.addEventListener('click', event => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    })
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    console.log(boardId)
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

function addBoardStatus(clickEvent){
    const boardId = clickEvent.target.dataset.boardId;
    let boardColumnsSelector = document.querySelector(`.board-columns[data-board-id="${boardId}"]`).childNodes;
    const childs = [];
    boardColumnsSelector.forEach(item =>{
        if (item.className == "board-column"){
            childs.push(item)
        }
    })
    const lastStatusId = childs.length + 1;
    console.log(boardId,lastStatusId)
    dataHandler.createNewStatus("new status", boardId, lastStatusId)

}

function startEditBoardTitle(e) {
    let spanElem = e.target;

    let boardId = spanElem.getAttribute('data-board-id');
    let inputElem = document.querySelector(`.board-title-edit[data-board-id="${boardId}"]`)
    console.log("InputElem: ", inputElem);
    inputElem.classList.toggle("hidden");
    spanElem.classList.toggle("hidden");
    let saveElem = document.querySelector(`.board-title-save[data-board-id="${boardId}"]`)
    console.log("SaveElem: ", saveElem);
    saveElem.classList.toggle("hidden");
}

function endEditBoardTitle(e) {
    let saveElem = e.target;
    saveElem.classList.toggle("hidden");
    let boardId = saveElem.getAttribute('data-board-id');
    let inputElem = document.querySelector(`.board-title-edit[data-board-id="${boardId}"]`)
    let newTitle = inputElem.value
    inputElem.classList.toggle("hidden");
    let spanElem = document.querySelector(`.board-title[data-board-id="${boardId}"]`)
    spanElem.innerHTML = newTitle;
    spanElem.classList.toggle("hidden");
    // send data to api -> POST on /api/board/${boardId}
    let payload = {};
    payload.id = boardId;
    payload.title = newTitle;
    dataHandler.updateBoardTitle(boardId, payload);
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
        dataHandler.createNewBoard(title);
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

function deleteBoard(clickEvent){
    const boardId = clickEvent.target.dataset.boardId;
    dataHandler.deleteBoard(boardId)
}