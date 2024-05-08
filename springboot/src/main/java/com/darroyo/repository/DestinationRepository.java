package com.darroyo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darroyo.model.Destination;

public interface DestinationRepository extends JpaRepository<Destination, Long> {

	List<Destination> findAllByOrderByCreatedAtDesc();
}