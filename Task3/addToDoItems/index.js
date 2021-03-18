const fetch = require('node-fetch');

const url = 'https://api.trello.com/1/members/604509d44a708d6d48a58d19/boards?key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4';

const fetchBoardId = async (boardName) => {
  const responseBoard = await fetch(url);
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

  return boardId;
}

const fetchListId = async (boardId) => {
  let toDoListId;
  const responseBoardLists = await fetch(`https://api.trello.com/1/boards/${boardId}/lists/?key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`);
  const jsonBoardLists = await responseBoardLists.json();

  jsonBoardLists.map(boardList => {
    if (boardList.name === 'To Do') {
      toDoListId = boardList.id;
    }
  });

  return toDoListId;
}

const createToDoCard = async (teamMemberName, toDoListId) => {
  const cardName = `${teamMemberName}'s list`;
  const cardDescription = `New work for ${teamMemberName}`;
  const todayDate = new Date();
  const due = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()+7);

  const responseNewToDoCard = await fetch(`https://api.trello.com/1/cards?idList=${toDoListId}&name=${cardName}&desc=${cardDescription}&due=${due}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
    method: 'POST'
  });

  const jsonToDoCard = await responseNewToDoCard.json();
  
  return jsonToDoCard.id;
}

const createChecklist = async (cardId, checklistName) => {
  const responseChecklist = await fetch(`https://api.trello.com/1/cards/${cardId}/checklists?name=${checklistName}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
      method: 'POST'
    });
  const jsonChecklist = await responseChecklist.json();
  
  return jsonChecklist.id;
}

const createCheckItems = async (checklistId, checkItemName) => {
  await fetch(`https://api.trello.com/1/checklists/${checklistId}/checkItems?name=${checkItemName}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
    method: 'POST'
  });
}

const addToDoItems = async (boardName, teamMemberName) => {
  try {
    // Get the boardId in order to create a new card
    const boardId = await fetchBoardId(boardName);
    // Get the "To Do" listId
    const toDoListId = await fetchListId(boardId);
    // create new card in To Do list
    const cardId = await createToDoCard(teamMemberName, toDoListId);
    // Create "Key Tasks" checklist on a card
    const keyTasksChecklistId = await createChecklist(cardId, 'Key Tasks');
    // Create "Additional Tasks" checklist on a card
    const additionalTasksChecklistId = await createChecklist(cardId, 'Additional Tasks');

    // create checkItems on "Key task" checklist
    createCheckItems(keyTasksChecklistId, 'Key task 1');
    createCheckItems(keyTasksChecklistId, 'Key task 2');
    // create checkItems on "Additional" checklist
    createCheckItems(additionalTasksChecklistId, 'Additional task 1');
    createCheckItems(additionalTasksChecklistId, 'Additional task 2');

    console.log("New To Do card has been added sucessfully.");
  } catch (error) {
    console.error(error);
  }
}

addToDoItems('CSD_CA3', 'Pedro');
