package com.examen.task.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examen.task.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{

}
