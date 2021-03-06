package com.team.chemical.entity;

import org.springframework.data.repository.CrudRepository;

public interface LabRepository extends CrudRepository<Lab, Integer>{
	boolean existsByName(String name);
	
	Lab findByName(String name);
}
