package com.dairsaber.domain;

public class Account {
   private String message;

    public Account(String message) {
        this.message = message;
    }

    public Account() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}