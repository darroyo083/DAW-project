package com.darroyo.service;

import java.util.List;

import com.darroyo.model.Destination;
import com.darroyo.model.User;

public interface DestinationService {

	public Destination createDestination(Destination destination, User user);

	public Destination findDestinationById(Long id) throws Exception;

	public void deleteDestination(Long id) throws Exception;

	public Destination updateDestination(Destination destination, Long id) throws Exception;

	public List<Destination> findAllDestination();

	public Destination likeDestination(Long destinationId, User user) throws Exception;

}
