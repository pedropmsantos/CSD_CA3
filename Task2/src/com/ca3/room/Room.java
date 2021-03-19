package com.ca3.room;

import com.ca3.observer.Observer;
import java.util.ArrayList;
import java.util.List;

public class Room {
    private List<Observer> observers = new ArrayList<Observer>();
    private String message;

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
        notifyAllObservers();
    }

    public void join(Observer observer) {
        observers.add(observer);
    }

    public void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }
}
