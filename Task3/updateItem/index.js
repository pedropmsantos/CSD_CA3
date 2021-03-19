// Student Name: Pedro Paulo Macena Santos
// Student Number: L00161845

const fetch = require('node-fetch');
const vars = require('../const');

const ENV_VARS = `key=${vars.envVars.API_KEY}&token=${vars.envVars.API_TOKEN}`;

const fetchBoardId = async (boardName) => {
  const ENDPOINT = 'https://api.trello.com/1/members/';
  const userId = '604509d44a708d6d48a58d19';
  const responseBoard = await fetch(`${ENDPOINT}${userId}/boards?${ENV_VARS}`);
  const jsonBoard = await responseBoard.json();
  let boardId;

  jsonBoard.map(board => {
    if (board.name === boardName) {
      boardId = board.id
    }
  });

  if (boardId === null || boardId === undefined) {
    console.error(`Board ${boardName} has not been found, please make sure the board name is correct and try again.`)
    return;
  }

  console.log(`Board ${boardName} found - id: ${boardId}`);
  return boardId;
};

const fetchFirstCardFromBoard = async (boardId) => {
  const ENDPOINT = 'https://api.trello.com/1/boards/';
  const responseCards = await fetch(`${ENDPOINT}${boardId}/cards?${ENV_VARS}`);
  const jsonCards = await responseCards.json();

  return jsonCards[0].id;
};

const fetchCheckItemFromChecklist = async (cardId, checkListItemName) => {
  const ENDPOINT = 'https://api.trello.com/1/cards/';
  const responseChecklists = await fetch(`${ENDPOINT}${cardId}/checklists?${ENV_VARS}`);
  const jsonChecklists = await responseChecklists.json();
  let checkItemId;
  let checklistId;

  for (let i = 0; i < jsonChecklists.length; i++) {
    for (let j = 0; j < jsonChecklists[i].checkItems.length; j++) {
      if (jsonChecklists[i].checkItems[j].name === checkListItemName) {
        checklistId = jsonChecklists[i].id;
        checkItemId = jsonChecklists[i].checkItems[j].id
      }
    }
  }

  return {
    checkItemId,
    checklistId
  }
};

const fetchListId = async (boardId, boardListName) => {
  let doingListId;
  const ENDPOINT = 'https://api.trello.com/1/boards/';
  const responseBoardLists = await fetch(`${ENDPOINT}${boardId}/lists/?${ENV_VARS}`);
  const jsonBoardLists = await responseBoardLists.json();

  jsonBoardLists.map(boardList => {
    if (boardList.name === boardListName) {
      doingListId = boardList.id;
      console.log(`List "${boardListName}" found - id: ${doingListId}`);
    }
  });

  if (doingListId === null || doingListId === undefined) {
    console.error(`BoardList "${boardListName}" has not been found, please make sure the list exists and try again.`)
    return;
  }

  return doingListId;
}

const moveCardListTo = async (cardId, boardId, boardList) => {
  const listId = await fetchListId(boardId, boardList);
  const ENDPOINT = 'https://api.trello.com/1/cards/';
  const responseCheckItem = await fetch(`${ENDPOINT}${cardId}?idList=${listId}&${ENV_VARS}`, {
    method: 'PUT'
  });

  const jsonCheckItem = await responseCheckItem.json();
  console.log(`Card ${jsonCheckItem.name} was updated`);
}

const updateCheckItem = async (cardId, checklistId, checkItemId, isComplete, boardId) => {
  const ENDPOINT = 'https://api.trello.com/1/cards/';
  const checkItemState = 'complete' ? isComplete : 'incomplete';
  const params = `${cardId}/checklist/${checklistId}/checkItem/${checkItemId}`
  const responseCheckItem = await fetch(`${ENDPOINT}${params}?state=${checkItemState}&${ENV_VARS}`, {
    method: 'PUT'
  });
  const jsonCheckItem = await responseCheckItem.json();

  console.log(`${jsonCheckItem.name} has been marked as ${jsonCheckItem.state}`);

  if (isComplete) {
    await moveCardListTo(cardId, boardId, 'Doing');
  }
}

const moveCardToDoneList = async (cardId, boardId) => {
  const ENDPOINT = 'https://api.trello.com/1/cards/';
  const responseChecklists = await fetch(`${ENDPOINT}${cardId}/checklists?${ENV_VARS}`);
  const jsonChecklists = await responseChecklists.json();
  let incompleteCheckItems = [];

  for (let i = 0; i < jsonChecklists.length; i++) {
    for (let j = 0; j < jsonChecklists[i].checkItems.length; j++) {
      if (jsonChecklists[i].checkItems[j].state === 'incomplete') {
        incompleteCheckItems.push(jsonChecklists[i].id);
      }
    }
  }

  if (incompleteCheckItems.length === 0) {
    // Move card to Done list
    await moveCardListTo(cardId, boardId, 'Done');
    console.log(`Moving Card ${cardId} to Done, all checkItems has been completed.`)
  } else {
    console.log(`Card ${cardId} still has incomplete checkItems.`);
  }
  
}

const updateItem = async (boardName, checkListItemName, isComplete) => {
  // Get Board Id based on the boardName
  const boardId = await fetchBoardId(boardName);
  // Get first Card from the Board
  const firstCardId = await fetchFirstCardFromBoard(boardId);
  // Get checkItem Id based on checkListItemName
  const checkItem = await fetchCheckItemFromChecklist(firstCardId, checkListItemName);
  // Update checkItem and move it to "Doing" in case it is completed
  await updateCheckItem(firstCardId, checkItem.checklistId, checkItem.checkItemId, isComplete, boardId);
  // Move Card to "Done" list if all checkItems are completed
  await moveCardToDoneList(firstCardId, boardId);
};

updateItem('CSD_CA3', 'Additional task 1', true);
