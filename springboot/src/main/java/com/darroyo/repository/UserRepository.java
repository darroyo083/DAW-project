package com.darroyo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darroyo.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	public Optional<User> findByEmail(String username);


}