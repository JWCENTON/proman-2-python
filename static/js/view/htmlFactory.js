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
                        <input class="board-title-edit hidden" data-board-id="${board.id}" value="${board.title}"/>
                        <button class="board-title-save hidden" data-board-id="${board.id}">Save title</button>
                        <span> is private? ${board.is_private}</span>                        
                        <button id="myBtn${board.id}" class="board-add" data-board-id="${board.id}">Add Card</button>
                        <div id="myModal" class="modal">
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <p>Create new card</p>
                                <input id="card-input${board.id}" type="text" minlength="1" placeholder="Enter new title">
                                <button id="save-card${board.id}" class="save">Save</button>
                            </div>
                        </div>
                        <button class="status-add" data-board-id="${board.id}">Add Status</button>
                        <button class="board-toggle" data-board-id="${board.id}">⬇️</button>
                    </div>
                    <div id="col" class="board-columns" data-board-id="${board.id}">
            `;
}

function cardBuilder(card) {
    return `
    
        <div class="card" data-card-id="${card.id}">
            <div class="card-remove" data-card-id="${card.id}" ><i class="fas fa-trash-alt"></i></div>
            <div class="card-title">${card.title}</div>
            
        </div>

    `;
}

function columnBuilder(status){
    return `
        <div class="board-column" data-status-id="${status.id}">
            <div class="remove-column" data-status-id="${status.id}"><i class="fas fa-trash-alt" data-status-id="${status.id}"></i></div>
            <div class="board-column-title" data-status-id="${status.id}"><span class="column-title" data-status-id="${status.id}" >${status.title}</span></div>
            <div class="board-column-content" data-status-id="${status.status_id}">
         

    `
}


export function inputTitle(id, title){
    return `
    <input class="title-edit " data-input-id="${id}" value="${title}"/>
    <button class="title-save " data-input-id="${id}">Save title</button>

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



