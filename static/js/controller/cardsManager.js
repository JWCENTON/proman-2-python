import {dataHandler, apiPost} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses){
            for (let card of cards) {
                
                if (card.status_id == status.status_id){
                    const cardBuilder = htmlFactory(htmlTemplates.card);
                    const content = cardBuilder(card);
                    domManager.addChild(`.board-column-content[data-status-id="${status.id}"]`, content);
                    domManager.addEventListener(
                        `.card[data-card-id="${card.id}"]`,
                        "click",
                        deleteButtonHandler
                    );
                    domManager.addEventListener(
                `.card-title[data-card-id="${card.id}"]`,
                    "click",
                        startEditCardTitle
                    );
                    domManager.addEventListener(
                        `.card-title-edit[data-card-id="${card.id}"]`,
                        "keypress",
                        function (e) {
                            if (e.key === 'Enter') {
                                endEditCardTitle(e);
                            }
                        }
                    );
                }
            }
        }
    },
};

function deleteButtonHandler(clickEvent) {
}

function startEditCardTitle(e) {
    let divElem = e.target;
    let cardId = divElem.getAttribute('data-card-id');
    console.log(cardId);
    let boardElem = divElem.closest(".board-columns");
    console.log(boardElem);
    let boardId = boardElem.getAttribute("data-board-id");
    console.log(boardId);
    let inputElem = document.querySelector(`.card-title-edit[data-card-id="${cardId}"]`)
    console.log("InputElem: ", inputElem);
    inputElem.classList.toggle("hidden");
    divElem.classList.toggle("hidden");
}

function endEditCardTitle(e) {
    let inputElem = e.target;
    inputElem.classList.toggle("hidden");
    let cardId = inputElem.getAttribute('data-card-id');
    let newCardTitle = inputElem.value;
    let divElem = document.querySelector(`.card-title[data-card-id="${cardId}"]`);
    divElem.innerHTML = newCardTitle;
    divElem.classList.toggle("hidden");
    let boardElem = divElem.closest(".board-columns");
    console.log(boardElem);
    let boardId = boardElem.getAttribute("data-board-id");
    let payload = {};
    payload.id = cardId;
    payload.title = newCardTitle;
    payload.boardId = boardId;
    apiPost("http://127.0.0.1:5000/api/boards/" + `${boardId}` + "/cards/" + `${cardId}`, payload);
}
