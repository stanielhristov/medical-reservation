package com.reservation.medical_reservation.model.dto;

import java.util.List;

public class BulkDeleteRequest {
    private List<Long> scheduleIds;

    public BulkDeleteRequest() {
    }

    public BulkDeleteRequest(List<Long> scheduleIds) {
        this.scheduleIds = scheduleIds;
    }

    public List<Long> getScheduleIds() {
        return scheduleIds;
    }

    public void setScheduleIds(List<Long> scheduleIds) {
        this.scheduleIds = scheduleIds;
    }
}
