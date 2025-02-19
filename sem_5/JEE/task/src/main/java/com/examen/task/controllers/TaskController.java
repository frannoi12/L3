package com.examen.task.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examen.task.entities.Task;
import com.examen.task.services.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@GetMapping
	public List<Task> recupAllTasks(){
		return taskService.recupereTouteTasks();
	}
	
	@GetMapping("/{id}")
	public Optional<Task> recupTaskById(@PathVariable Long id){
		return taskService.recupereTaskById(id);
	}
	
	@PostMapping
    public Task ajouterTask(@RequestBody Task task) {
        return taskService.ajouterTask(task);
    }
	
	@PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }
	

	@DeleteMapping("/{id}")
	public void effacerTask(@PathVariable Long id) {
		taskService.deleteTask(id);
	}

}
