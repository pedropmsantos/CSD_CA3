### Description

This task consists in adding methods to hit the `Trello` endpoints and make some especific requests, the methods created on this directory are: `createNewBoard`, `gerUserInfo`, `addToToItems` and `updateItem`.

Those requests has been implemente in NodeJS and it's using the `node-fetch` pakcage to make the API requests, so please make sure to run `npm install` from `Task3` directory, so the package can be installed, otherwiser the API requests will not work.

In order to be authenticated on the `Trello` APIs, a `key` and a `token` need to be passed on the `url`; therefore a `const.js` file has been created to place those credentials there, and reuse them on any API request we need, with that I don't need to hardcode them on every single request.

### Sending the API requests via commanda line

After running `npm install` and the `node-fetch` package is installed, the prject should be ready, just to make sure it is all good, please just run `node app` within `Task3` directory, and the following message should be displayed:
```
Server running at http://127.0.0.1:3000/

```

That shows the app is ready to go, we can stop the server since it's not actually required for this task (`Crtl+c`), and next step is to place you Trello credentials to the `API_KEY` and `API_TOKEN` variables in `const.js` file, this will be required in order to successfully hit the `Trello` endpoints.

Now it should be all set to start running those methods, staring with the `createNewBoard`.

#### createNewBoard()

Going to the `index.js` file within the `createNewBoard` directory we can see the implementation to hit the endpoint in Trello and create a new board by passing the `boardName` and `boardDescription`, both of those variables are declared within the file.

From the `Task3` directory in terminal, just run the following:
```
node createNewBoard/
```

If everything goes as expected, a new board should be created in `Trello`.

#### getUserInfo()

This method is used to fetch user info, the deatils we care about are:
* userId
* name
* email
* boardTitle
* boardURL

The `boardTitle` and `boardURL` should be related to the boards the used has access to, so it might be more than just one on each one of those two attributes.

From the `Task3` directory in terminal, just run the following:
```
node getUserInfo/
```

If everything goes as expected, it should log the response like below:
```
Response: 200 OK
{ user:
   { userId: '<USER_ID>',
     name: '<USER_NAME>',
     email: '<USER_EMAIL>' } }
Response: 200 OK
{ boardTitle: '<BOARD_TITLE>',
  boardURL: '<BOARD_URL>' }
```

#### addToDoItem()

This method will be used to create a new To Do item (Card) with the following destails:

* The Item/Card shall have two checklists
* Each Checklist should have two checkItems
* Ticket should have a due date to one week time after it's created 

Every new Item/Card should be created within the To Do list/column.

From the `Task3` directory in terminal, just run the following:
```
node addToDoItem/
```

If everything goes as expected, a new Item/Card should be created in `To Do` column.

#### updateItem()

This methods is used to update the To Do item/card on the board, in case whenver a new checkItem in the checklist is marked as completed, the card is also moved to `Doind` list, which means the work is in progress.

Also, in case all the checkItems for all checklists are marked as complete, then the card should be moved to the `Done` list, since it has no work left do be done on this card.

From the `Task3` directory in terminal, just run the following:
```
node updateItem/
```

Note the ticket will be moved to the `Doing` list, now to make sure the ticket moves to the `Done` list after completing all the tasks, update the **second** parameter when calling the `updateItem` in the `index.js` file within `updateItem` directory, passing the correct name of a `checkItem`, it should be marked as completed and then the ticket shall move to `Done` list.

### Additional Notes

Please note that, when running any of those methods mentioned above, there are relevant logs for each API request made, which should help understanding the flow of each request, and also making is easier to debug any issue in case there is one.
