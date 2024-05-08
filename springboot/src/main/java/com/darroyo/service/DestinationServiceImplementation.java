package com.darroyo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darroyo.model.Destination;
import com.darroyo.model.User;
import com.darroyo.repository.DestinationRepository;

@Service
public class DestinationServiceImplementation implements DestinationService {
	
	@Autowired
	public DestinationRepository destinationRepository;
	
	@Autowired
	public UserService userService;

	@Override
	public Destination createDestination(Destination destination, User user) {
		
		Destination newDestination=new Destination();
		newDestination.setDescription(destination.getDescription());
		newDestination.setImage(destination.getImage());
		newDestination.setTitle(destination.getTitle());
		newDestination.setHistorical(destination.isHistorical());
		newDestination.setUser(user);
		newDestination.setCreatedAt(LocalDateTime.now());
		
		return destinationRepository.save(newDestination);
	}

	@Override
	public Destination findDestinationById(Long id) throws Exception {
		Optional<Destination> opt=destinationRepository.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
	throw new Exception("Destination not found with id "+id);
	}

	@Override
	public void deleteDestination(Long id) throws Exception {
		Destination destination=findDestinationById(id);
		
		destinationRepository.delete(destination);
		
	}

	@Override
	public Destination updateDestination(Destination destination,Long id) throws Exception {
		Destination oldDestination = findDestinationById(id);
		
		if(destination.getDescription()!=null) {
			oldDestination.setDescription(destination.getDescription());
		}
		if(destination.getImage()!=null) {
			oldDestination.setImage(destination.getImage());
		}
		if(destination.getTitle()!=null) {
			oldDestination.setTitle(destination.getTitle());
		}
		
		return destinationRepository.save(oldDestination);
	}

	@Override
	public List<Destination> findAllDestination() {
		// TODO Auto-generated method stub
		return destinationRepository.findAllByOrderByCreatedAtDesc();
	}

	@Override
	public Destination likeDestination(Long destinationId, User user) throws Exception {
		Destination destination=findDestinationById(destinationId);
		if(destination.getLikes()==null) {
			destination.setLikes(new ArrayList<>());
		}
		if(destination.getLikes().contains(user.getId())) {
			destination.getLikes().remove(user.getId());
		}
		else {
			destination.getLikes().add(user.getId());
		}
		
		return destinationRepository.save(destination);
	}

}

