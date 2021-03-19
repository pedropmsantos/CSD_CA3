### Observer Pattern - POC sample messaging system

The Design Pattern chosen to implement this sample messaging system was the Observer Pattern, also known as Publish/Subscribe pattern. This pattern would be ideal to implement this sort of system as it intends to publish a message to all it's listeners.

This pattern can also be implemented by using the redis pub/sub mechanism and also the websocket connections, which can be easly implemented with NodeJS. 

A simple way of explain the Observer Patter is by using the MVC pattern, which in fact is a sort of Obeserver pattern, where all Views are Observers of a Model (Observable), and Views are notified every time the model's state changes.

In this pattern, the Observable class (`Room` class) will know the list of Obervers classes (`ProjectObserver`, `RepositoryObserver`, `BranchObserver`, `EventObserver`) so it can broadcast the messages accordingly.

### Git commands

Those were the git commands use for completion of this taks.

Creating a new branch:
```
git checkout -b task2
```

Check the files changed:
```
git status
```

Check what exactly changes on those files:
```
git dif
```

In case there was an unwanted changes in a file, it can be reverted by:
```
git checkout -- <path_to_file>
```

Add all files to the branch in order to be commited:
```
git add .
```
Ps: In order to not add all files at once, it's also possible to add a sinle file by using `git add <path_to_file>`


Committing the files to the branch and adding a commit message:
```
git commit -m "Task2 - <some_relevant_message_related_to_the_changes>"
```

Pushing the local changes to the repository in GitHub:
```
git push origin task2
```

Now a Pull Request will be opened agains the `main` branch in Github, after adding a relevant description, it can then finally be reviewed, approved and merged into the `main` branch.

In order to update the local main brach with the latest changes, I just has to change back to `main` branch locally and pull the latest changes, this can be done by running the following commands while i am currently in `task2` branch:
```
git checkout main - It changes back to main branch in local repo
```
```
git pull - It pulls the latests changes from repo in github, it should contain the code merged on the steps mentioned above.
```

Those commands above were all the commands used during this task.

### Advanced Github Command

There was one commands I judget as an advanced command in github, which is the `rebase`, it has the intention to squash different commits into just one, this is normally used when:
* Commit messages doesn't make much sense
* There are multiple commits with the same message
* To cleanup the amount of commits in a pull request

I could squash two commits into one by running the following commands on my branch before pussing the changes to the remote repository:
```
git rebase master -i
```

Then a list of commits will open, pressing `i` will allow me to edit, so now it is possible to squash the unwanted commits by going to the commits we replacing the `pick` to `squash` (or just `s`)

<PLACE THE SCREENSHOT HERE>

After that I needed to save the changes by pressing `:` to leave the editing mode and then type `wq`, to write and quit the rebase, now after running the `git log` it's possible to see the new commits and it's messages.
