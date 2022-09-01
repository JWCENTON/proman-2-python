import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, inputTitle} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let statusManager = {
    loadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            const statusesBuilder = htmlFactory(htmlTemplates.statuses);
            const content = statusesBuilder(status);
            if(status.board_id == boardId){
            domManager.addChild(`.board-columns[data-board-id="${boardId}"`, content);
            domManager.addEventListener(
                `.remove-column[data-status-id="${status.id}"]`,
                "click",
                removeColumn
            );
            domManager.addEventListener(
                `.column-title[data-status-id="${status.id}"]`,
                "click",
                editStatusTitle
            );
          }
        }
    },
};

function removeColumn(clickEvent) {
    const statusId = clickEvent.target.dataset.statusId;
    dataHandler.deleteStatus(statusId)
};

function editStatusTitle(clickEvent){
    const clickTarget = clickEvent.target;
    const statusId = clickEvent.target.dataset.statusId;
    const titleBefore = clickEvent.target.firstChild.data;
    clickTarget.classList.toggle("hidden");
    clickTarget.insertAdjacentHTML("beforebegin", inputTitle(statusId, titleBefore));
    domManager.addEventListener(
                `.title-save[data-input-id="${statusId}"]`,
                "click",
                setBoardTitle
            );
    
}

function setBoardTitle(clickEvent){
    const statusId = clickEvent.target.dataset.inputId;
    const input = document.querySelector(".title-edit ");
    dataHandler.updateStatusTitle(statusId, input.value)
    document.querySelector(`.column-title[data-status-id="${statusId}"]`).firstChild.data = input.value;
    document.querySelector(`.column-title[data-status-id="${statusId}"]`).classList.toggle("hidden");
    clickEvent.target.classList.toggle("hidden");
    input.classList.toggle("hidden");
}