package com.reservation.medical_reservation.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setPropertyCondition(context -> {
            return !context.getMapping().getLastDestinationProperty().getName().equals("role");
        });
        return mapper;
    }
}

