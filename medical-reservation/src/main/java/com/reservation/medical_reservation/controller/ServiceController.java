package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.ServiceDTO;
import com.reservation.medical_reservation.model.entity.ServiceEntity;
import com.reservation.medical_reservation.repository.ServiceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;
    private final ModelMapper modelMapper;

    public ServiceController(ServiceRepository serviceRepository, ModelMapper modelMapper) {
        this.serviceRepository = serviceRepository;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<ServiceDTO>> getAllServices() {
        List<ServiceDTO> services = serviceRepository.findAllByOrderByNameAsc()
                .stream()
                .map(service -> modelMapper.map(service, ServiceDTO.class))
                .toList();
        return ResponseEntity.ok(services);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getServiceById(@PathVariable Long id) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        ServiceDTO serviceDTO = modelMapper.map(service, ServiceDTO.class);
        return ResponseEntity.ok(serviceDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ServiceDTO>> searchServices(@RequestParam String name) {
        List<ServiceDTO> services = serviceRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(service -> modelMapper.map(service, ServiceDTO.class))
                .toList();
        return ResponseEntity.ok(services);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceDTO> createService(@Valid @RequestBody ServiceDTO serviceDTO) {
        ServiceEntity service = new ServiceEntity();
        service.setName(serviceDTO.getName());
        service.setDescription(serviceDTO.getDescription());
        service.setPrice(serviceDTO.getPrice());

        ServiceEntity saved = serviceRepository.save(service);
        ServiceDTO result = modelMapper.map(saved, ServiceDTO.class);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceDTO> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceDTO serviceDTO) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found"));

        service.setName(serviceDTO.getName());
        service.setDescription(serviceDTO.getDescription());
        service.setPrice(serviceDTO.getPrice());

        ServiceEntity updated = serviceRepository.save(service);
        ServiceDTO result = modelMapper.map(updated, ServiceDTO.class);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new IllegalArgumentException("Service not found");
        }
        serviceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
