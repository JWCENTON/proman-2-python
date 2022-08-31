import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let statusManager = {
    loadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            const statusesBuilder = htmlFactory(htmlTemplates.statuses);
            const content = statusesBuilder(status);
            if(status.board_id == boardId){
            domManager.addChild(`.board-columns[data-board-id="${boardId}"`, content);
          }
        }
    },
};

