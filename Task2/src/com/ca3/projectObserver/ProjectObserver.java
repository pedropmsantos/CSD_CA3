package com.ca3.projectObserver;

import com.ca3.observer.Observer;
import com.ca3.room.Room;

public class ProjectObserver extends Observer {

    // In this constructor a room is passed so the observer can be added, and every object created will also join the room.
    public ProjectObserver(Room room) {
        this.room = room;
        this.room.join(this);
    }

    // Overrides the update method from the Observer abstract class.
    @Override
    public void update() {
        System.out.println("Project has been updated! - " + this.room.getMessage());
    }
}
