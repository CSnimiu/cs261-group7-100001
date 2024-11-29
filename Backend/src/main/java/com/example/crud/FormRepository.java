package com.example.crud;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {
	
	@Query("SELECT f FROM Form f WHERE f.userId = :userId")
    Optional<Form> findByUserId(@Param("userId") Long userId);
	
	@Query("SELECT f FROM Form f WHERE f.user_name = :user_name")
	List<Form> findByUserName(@Param("user_name") String user_name);
}