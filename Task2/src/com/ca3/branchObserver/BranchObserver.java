package com.ca3.branchObserver;

import com.ca3.observer.Observer;
import com.ca3.room.Room;

public class BranchObserver extends Observer {
    public BranchObserver(Room room) {
        this.room = room;
        this.room.join(this);
    }

    @Override
    public void update() {
        System.out.println("Branch has been updated! - " + this.room.getMessage());
    }
}
