export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        return await apiGet(`/api/statuses`);
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    },
    createNewStatus: async function (statusTitle, boardId, statusId) {
        apiPost("/add-new-status", {"title": statusTitle, "board_id":boardId, "status_id":statusId})
    }, 
    deleteStatus: async function(statusId) {
        apiDelete(`/api/statuses/${statusId}/delete`);
    },
    updateStatus: async function (statusId){
        apiPut(`/api/statuses/${statusId}/update`)
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}


async function apiPost(url, payload) {
    const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload) 
  });
  return response.json(); 

}

async function apiDelete(url) {
    await fetch(url, {method: 'DELETE'})
}

async function apiPut(url) {
}

async function apiPatch(url) {
}

export async function sendBoardTitle(title){
    fetch("http://127.0.0.1:5000/board_title", {
            method: "POST",
            body: JSON.stringify({
                title: title
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        // Converting to JSON
        .then(response => response.json())
};