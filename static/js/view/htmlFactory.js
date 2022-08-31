export const htmlTemplates = {
    board: 1,
    statuses: 2,
    card: 3
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.statuses]: columnBuilder,
    [htmlTemplates.card]: cardBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<div class="board-container">
                <section class="board" data-board-id=${board.id}> 
                    <div class="board-header">
                        <span class="board-title" data-board-id="${board.id}">${board.title}</span>
                        <input class="board-title-edit" data-board-id="${board.id}" value="${board.title}" hidden/>
                        <button class="board-title-save" data-board-id="${board.id}" hidden>Save title</button>
                        <button class="board-add">Add Card</button>
                        <button class="board-toggle" data-board-id="${board.id}">⬇️</button>
                    </div>
                    <div id="col" class="board-columns" data-board-id="${board.id}">
            `;
}

function cardBuilder(card) {
    return `
    
        <div class="card" data-card-id="${card.id}">
            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
            <div class="card-title">${card.title}</div>
        </div>

    `;
}

function columnBuilder(status){
    return `
        <div class="board-column">
            <div class="board-column-title">${status.title}</div>
            <div class="board-column-content" data-status-id="${status.id}">
         

    `
}

export function createBoard() {
    return `        
            <button id="create-board" type="button">Create new board</button>
            <br>
            <div id="bt" hidden>Board title :
              <input id="save-title" minlength="1" maxlength="50" required title="1 character minimum" type="text"/>
            </div>
            <br>
            <div id="sb" hidden>
              <button id="save-button" type="button">Save</button>
            </div>
            <br>
`;
}



