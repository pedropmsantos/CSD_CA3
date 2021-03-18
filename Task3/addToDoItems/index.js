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

const createToDoCard = async () => {
  
}

const createChecklist = async () => {
  
}

const createCheckItems = async () => {
  
}

const addToDoItems = async (boardName, teamMemberName) => {
  try {
    // fetch the boardId
    const boardId = await fetchBoardId(boardName);
    // fetch the listId
    const toDoListId = await fetchListId(boardId);

    // create new To Do card
    createToDoCard();
    const cardName = `${teamMemberName}'s list`;
    const cardDescription = "New work for Tom";
    const todayDate = new Date();
    const due = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()+7);

    const responseNewToDoCard = await fetch(`https://api.trello.com/1/cards?idList=${toDoListId}&name=${cardName}&desc=${cardDescription}&due=${due}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
      method: 'POST'
    });

    const jsonToDoCard = await responseNewToDoCard.json();
    const cardId = jsonToDoCard.id;

    // Create checklist on a card - It should be triggered twice, one for each checklist
    createChecklist('Key Tasks');
    createChecklist('Additional Tasks');

    const fName = 'Key Tasks';
    const sName = 'Additional Tasks';
    const responseKeyTasksChecklist = await fetch(`https://api.trello.com/1/cards/${cardId}/checklists?name=${fName}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
      method: 'POST'
    });
    const jsonKeyTaksChecklist = await responseKeyTasksChecklist.json();
    console.log(`jsonChecklist: ${JSON.stringify(jsonKeyTaksChecklist)}`);
    const keyTasksChecklistId = jsonKeyTaksChecklist.id;

    const responseAdditionalTasksChecklist = await fetch(`https://api.trello.com/1/cards/${cardId}/checklists?name=${sName}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
      method: 'POST'
    });
    const jsonAdditionalTasksChecklist = await responseAdditionalTasksChecklist.json();
    console.log(`jsonChecklist: ${JSON.stringify(jsonAdditionalTasksChecklist)}`);
    const additionalTasksChecklistId = jsonAdditionalTasksChecklist.id;


    // create checkItems
    createCheckItems();
    createCheckItems();
    createCheckItems();
    createCheckItems();

    const firstKeyTaskItem = 'Key task 1';
    const secondKeyTaskItem = 'Key task 2';
    const responseFKT = await fetch(`https://api.trello.com/1/checklists/${keyTasksChecklistId}/checkItems?name=${firstKeyTaskItem}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
      method: 'POST'
    });
    const responseSKT = await fetch(`https://api.trello.com/1/checklists/${keyTasksChecklistId}/checkItems?name=${secondKeyTaskItem}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
      method: 'POST'
    });

    const firstAdditionalTaskItem = 'Additional task 1';
    const secondAdditionalTaskItem = 'Additional task 2';
    const responseFAT = await fetch(`https://api.trello.com/1/checklists/${additionalTasksChecklistId}/checkItems?name=${firstAdditionalTaskItem}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
      method: 'POST'
    });
    const responseSAT = await fetch(`https://api.trello.com/1/checklists/${additionalTasksChecklistId}/checkItems?name=${secondAdditionalTaskItem}&key=946feceaa9b2468a62d8e3ab9b56f9a2&token=f2fbbd70da60c7fe7b7838f746d2ed48fcbd5a09cb9bd5fe470d93e381f5eea4`, {
      method: 'POST'
    });

  } catch (error) {
    console.error(error);
 
  }
}

addToDoItems('CSD_CA3', 'Pedro');
