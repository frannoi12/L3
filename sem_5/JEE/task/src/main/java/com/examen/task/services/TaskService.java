package com.examen.task.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examen.task.entities.Task;
import com.examen.task.repositories.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	public List<Task> recupereTouteTasks() {
        return taskRepository.findAll();
    }
	
	public Optional<Task> recupereTaskById(Long id) {
        return taskRepository.findById(id);
    }
	
	public Task ajouterTask(Task task) {
        return taskRepository.save(task);
    }
	
	public Task updateTask(Long id, Task updatedTask) {
	       return taskRepository.findById(id).map(task -> {
	           task.setTitle(updatedTask.getTitle());
	           task.setDescription(updatedTask.getDescription());
	           task.setStatut(updatedTask.getStatut());
	           return taskRepository.save(task);
	       }).orElseThrow(() -> new RuntimeException("Task not found"));
	}
	
	public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
