package com.ca3.observer;

import com.ca3.room.Room;

// Every class should inherit this Observer class and override the update method
public abstract class Observer {
    protected Room room;
    public abstract void update();
}
