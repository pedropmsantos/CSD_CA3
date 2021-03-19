// Student Name: Pedro Paulo Macena Santos
// Student Number: L00161845

const fetch = require('node-fetch');
const vars = require('../const');

const ENV_VARS = `key=${vars.envVars.API_KEY}&token=${vars.envVars.API_TOKEN}`

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
}

const fetchListId = async (boardId) => {
  let toDoListId;
  const ENDPOINT = 'https://api.trello.com/1/boards/';
  const responseBoardLists = await fetch(`${ENDPOINT}${boardId}/lists/?${ENV_VARS}`);
  const jsonBoardLists = await responseBoardLists.json();

  jsonBoardLists.map(boardList => {
    if (boardList.name === 'To Do') {
      toDoListId = boardList.id;
      console.log(`List To Do found - id: ${toDoListId}`);
    }
  });

  if (toDoListId === null || toDoListId === undefined) {
    console.error(`BoardList To Do has not been found, please make sure the list exists and try again.`)
    return;
  }

  return toDoListId;
}

const createToDoCard = async (teamMemberName, toDoListId) => {
  const cardName = `${teamMemberName}'s list`;
  const cardDescription = `New work for ${teamMemberName}`;
  const todayDate = new Date();
  const dueDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()+7);
  const params = `idList=${toDoListId}&name=${cardName}&desc=${cardDescription}&due=${dueDate}`;
  const ENDPOINT = 'https://api.trello.com/1/cards';

  const responseNewToDoCard = await fetch(`${ENDPOINT}?${params}&${ENV_VARS}`, {
    method: 'POST'
  });

  const jsonToDoCard = await responseNewToDoCard.json();
  
  console.log(`To Do card ${jsonToDoCard.name} has been created with id ${jsonToDoCard.id}`);
  return jsonToDoCard.id;
}

const createChecklist = async (cardId, checklistName) => {
  const ENDPOINT = 'https://api.trello.com/1/cards/';
  const params = `name=${checklistName}`;
  const responseChecklist = await fetch(`${ENDPOINT}${cardId}/checklists?${params}&${ENV_VARS}`, {
      method: 'POST'
    });
  const jsonChecklist = await responseChecklist.json();
  
  console.log(`Checklist ${jsonChecklist.name} has been created with id ${jsonChecklist.id}`);
  return jsonChecklist.id;
}

const createCheckItems = async (checklistId, checkItemName) => {
  const ENDPOINT = 'https://api.trello.com/1/checklists/';
  const params = `name=${checkItemName}`;
  const responseCheckItem = await fetch(`${ENDPOINT}${checklistId}/checkItems?${params}&${ENV_VARS}`, {
    method: 'POST'
  });
  const jsonCheckItem = responseCheckItem.json();

  console.log(`CheckItem ${jsonCheckItem.name} has been created with id ${jsonCheckItem.id}`);
  return jsonCheckItem.id;
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
    await createCheckItems(keyTasksChecklistId, 'Key task 1');
    await createCheckItems(keyTasksChecklistId, 'Key task 2');
    // create checkItems on "Additional" checklist
    await createCheckItems(additionalTasksChecklistId, 'Additional task 1');
    await createCheckItems(additionalTasksChecklistId, 'Additional task 2');

    console.log("New To Do card has been added sucessfully.");
  } catch (error) {
    console.error(error);
  }
}

addToDoItems('CSD_CA3', 'Pedro');
