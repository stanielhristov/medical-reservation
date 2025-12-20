package com.reservation.medical_reservation.model.enums;

public enum GenderEnum {
    MALE("Male"),
    FEMALE("Female");

    private final String displayName;

    GenderEnum(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
    @Override
    public String toString() {
        return displayName;
    }
}
