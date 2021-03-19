// Student Name: Pedro Paulo Macena Santos
// Student Number: L00161845

package com.ca3.room;

import com.ca3.observer.Observer;
import java.util.ArrayList;
import java.util.List;

// The room class has the concept of having all the memeber to notify
public class Room {
    // The observers is a list of members of a room that will be notified
    private List<Observer> observers = new ArrayList<Observer>();
    private String message;

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
        notifyAllObservers();
    }

    // The join method is used to add a member to the room
    public void join(Observer observer) {
        observers.add(observer);
    }

    // This method is used to notify all members os a room
    public void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }
}
