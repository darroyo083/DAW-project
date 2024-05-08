package com.darroyo.service;

import com.darroyo.model.User;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws Exception;

}
