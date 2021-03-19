package com.ca3.eventObserver;

import com.ca3.observer.Observer;
import com.ca3.room.Room;

public class EventObserver extends Observer {
    public EventObserver(Room room) {
        this.room = room;
        this.room.join(this);
    }

    @Override
    public void update() {
        System.out.println("Event has been updated! - " + this.room.getMessage());
    }
}
