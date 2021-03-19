package com.ca3.projectObserver;

import com.ca3.observer.Observer;
import com.ca3.room.Room;

public class ProjectObserver extends Observer {
    public ProjectObserver(Room room) {
        this.room = room;
        this.room.join(this);
    }

    @Override
    public void update() {
        System.out.println("Project has been updated! - " + this.room.getMessage());
    }
}
