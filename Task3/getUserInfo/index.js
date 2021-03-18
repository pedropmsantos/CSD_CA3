const fetch = require('node-fetch');
const vars = require('../const');

const userId = '604509d44a708d6d48a58d19';
const ENDPOINT = 'https://api.trello.com/1/members/';

const getUserInfo = (userId) => {
  fetchUserInfo(userId);
  fetchUserBoard(userId);

};

const fetchUserInfo = (userId) => {
  fetch(`${ENDPOINT}${userId}?key=${vars.envVars.API_KEY}&token=${vars.envVars.API_TOKEN}`, {
    method: 'GET'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );

      return response.json();
    })
    .then(data => {

      const user = {
        user: {
          userId: data.id,
          name: data.fullName,
          email: data.email
        }
      }

      console.log(user);
    })
    .catch(err => console.error(err));
}

const fetchUserBoard = (userId) => {
  fetch(`${ENDPOINT}${userId}/boards?key=${vars.envVars.API_KEY}&token=${vars.envVars.API_TOKEN}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    })
    .then(data => {

      let userBoards = null;

      data.map(board => {
        userBoards = {
          boardTitle: board.name,
          boardURL: board.url
        };

        console.log(userBoards);
      });
    })
    .catch(err => console.error(err));
}

getUserInfo(userId);
