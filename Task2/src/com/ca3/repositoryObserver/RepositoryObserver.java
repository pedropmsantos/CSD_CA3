package com.ca3.repositoryObserver;

import com.ca3.observer.Observer;
import com.ca3.room.Room;

public class RepositoryObserver extends Observer {
    public RepositoryObserver(Room room) {
        this.room = room;
        this.room.join(this);
    }

    @Override
    public void update() {
        System.out.println("Repository has been updated! - " + this.room.getMessage());
    }
}
