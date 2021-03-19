package com.ca3.observer;

import com.ca3.room.Room;

public abstract class Observer {
    protected Room room;
    public abstract void update();
}
