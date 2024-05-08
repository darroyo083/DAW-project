package com.darroyo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darroyo.response.ApiResponse;

@RestController
public class HomeController {
	
	@GetMapping
	public ResponseEntity<ApiResponse> homeController(){
		
		ApiResponse res=new ApiResponse("success",true);
		return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);
	}

}
