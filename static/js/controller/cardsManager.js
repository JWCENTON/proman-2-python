import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses){
            for (let card of cards) {
                
                if (card.status_id == status.id){
                    const cardBuilder = htmlFactory(htmlTemplates.card);
                    const content = cardBuilder(card);
                    domManager.addChild(`.board-column-content[data-status-id="${status.id}"]`, content);
                    domManager.addEventListener(
                        `.card[data-card-id="${card.id}"]`,
                        "click",
                        deleteButtonHandler
                    );
                }
            }
        }
    },
};

function deleteButtonHandler(clickEvent) {
}
