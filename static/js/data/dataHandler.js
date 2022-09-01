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
         apiPost("/board_title", {"title": boardTitle})
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
        apiPost("/add-new-card", {"title": cardTitle, "board_id": boardId, "status_id": statusId})
    },
    createNewStatus: async function (statusTitle, boardId, statusId) {
        apiPost("/add-new-status", {"title": statusTitle, "board_id":boardId, "status_id":statusId})
    }, 
    deleteStatus: async function(statusId) {
        apiDelete(`/api/statuses/${statusId}/delete`);
    },
    deleteCard: async function(cardId){
        apiDelete(`/api/cards/${cardId}/delete`);
    },
    updateStatusTitle: async function (statusId, statusTitle){
        apiPost(`/api/statuses/${statusId}/update`, {"title": statusTitle, "id": statusId})
    },
    updateBoardTitle : async function (boardId, payload ){
        apiPost(`/api/boards/${boardId}`, payload);
    },
    deleteBoard : async function(boardId){
        apiDelete(`/api/boards/${boardId}/delete`)
    },

};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}


export async function apiPost(url, payload) {
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

async function apiPut(url, payload) {
const response = await fetch(url, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload) 
  });
  return response.json(); 
}

async function apiPatch(url) {
}

