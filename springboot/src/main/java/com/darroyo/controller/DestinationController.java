package com.darroyo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darroyo.model.Destination;
import com.darroyo.model.User;
import com.darroyo.response.ApiResponse;
import com.darroyo.service.DestinationService;
import com.darroyo.service.UserService;

@RestController
@RequestMapping("/api/destination")
public class DestinationController {
	
	 @Autowired
	    private DestinationService destinationService;
	 @Autowired
	 private UserService userService;

	    @PostMapping
	    public ResponseEntity<Destination> createDestination(
	    		@RequestBody Destination destination, @RequestHeader("Authorization") String jwt) throws Exception {
	        User user = userService.findUserProfileByJwt(jwt);
	        Destination newDestination = destinationService.createDestination(destination, user);
	        return new ResponseEntity<>(newDestination, HttpStatus.CREATED);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Destination> getDestinationById(@PathVariable("id") Long id) throws Exception {
	       
	            Destination destination = destinationService.findDestinationById(id);
	            return new ResponseEntity<>(destination, HttpStatus.OK);
	         
	    }
	    @GetMapping
	    public ResponseEntity<List<Destination>> getAllDestination() throws Exception {
	       
	            List<Destination> destination = destinationService.findAllDestination();
	            return new ResponseEntity<>(destination, HttpStatus.OK);
	         
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<ApiResponse> deleteDestination(@PathVariable("id") Long id) throws Exception {
	        
	            destinationService.deleteDestination(id);
	            ApiResponse res=new ApiResponse("destination deleted",true);
	            return new ResponseEntity<>(res, HttpStatus.OK);
	        
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Destination> updateDestination(@PathVariable("id") Long id, @RequestBody Destination destination) throws Exception {
	        
	            Destination updatedDestination = destinationService.updateDestination(destination,id);
	            return new ResponseEntity<>(updatedDestination, HttpStatus.OK);
	        
	    }
	    
	    @PutMapping("/{id}/like")
	    public ResponseEntity<Destination> likeDestination(
	    		@RequestHeader("Authorization") String jwt, 
	    		@PathVariable("id") Long id 
	    		) throws Exception, Exception {
	    	User user = userService.findUserProfileByJwt(jwt);
	            Destination updatedDestination = destinationService.likeDestination(id, user);
	            return new ResponseEntity<>(updatedDestination, HttpStatus.OK);
	        
	    }

}

