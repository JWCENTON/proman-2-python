export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
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
  let boardComponent = `<section class="board" data-board-id="${board.id}">
                          <div class="board-header" data-board-id="${board.id}">
                            <span class="board-title" data-board-id="${board.id}">${board.title}</span>
                            <button class="board-add" data-board-id="${board.id}">Add Card</button>
                            <button class="board-add-column" data-board-id="${board.id}">Add Another List</button>
                            <button class="board-toggle-archived" data-board-id="${board.id}">Show Board</button>
                           
                             `;
  // boardComponent += (board['user_id'] === userId) ? `<button class="board-remove" aria-label="Remove board" ????????????????????????????
  //                                                            data-board-id="${board.id}">
  //                                                      <i class="fas fa-trash-alt" aria-hidden="true"
  //                                                         data-board-id="${board.id}"></i>
  //                                                    </button>` : ``;

  return boardComponent;

}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
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

