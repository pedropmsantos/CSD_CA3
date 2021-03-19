// Student Name: Pedro Paulo Macena Santos
// Student Number: L00161845

package com.ca3.repositoryObserver;

import com.ca3.observer.Observer;
import com.ca3.room.Room;

public class RepositoryObserver extends Observer {

    // In this constructor a room is passed so the observer can be added, and every object created will also join the room.
    public RepositoryObserver(Room room) {
        this.room = room;
        this.room.join(this);
    }

    // Overrides the update method from the Observer abstract class.
    @Override
    public void update() {
        System.out.println("Repository has been updated! - " + this.room.getMessage());
    }
}
