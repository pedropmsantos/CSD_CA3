const fetch = require('node-fetch');
const vars = require('../const');

const boardName = 'CSD_CA3';
const boardDescription = 'This is a board for CSD_CA3';
const ENDPOINT = 'https://api.trello.com/1/boards/';

const createNewBoard = (boardName, boardDescription) => {
  fetch(`${ENDPOINT}?key=${vars.envVars.API_KEY}&token=${vars.envVars.API_TOKEN}&name=${boardName}&desc=${boardDescription}`, {
    method: 'POST'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
};

createNewBoard(boardName, boardDescription);
