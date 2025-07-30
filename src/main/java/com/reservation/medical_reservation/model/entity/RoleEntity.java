package com.reservation.medical_reservation.model.entity;

import com.reservation.medical_reservation.model.enums.RoleName;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleEntity extends BaseEntity {

    private RoleName name;


}
