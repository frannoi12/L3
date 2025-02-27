import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:task_manager/models/Task.dart';

class TaskViewModel extends ChangeNotifier {
  List<Task> _tasks = [];
  List<Task> get tasks => _tasks;

  TaskViewModel() {
    loadTasks();
  }

  Future<void> addTask(Task task) async {
    _tasks.add(task);
    await saveTasks();
    notifyListeners();
  }

  Future<void> updateTask(Task task) async {
    int index = _tasks.indexWhere((t) => t.id == task.id);
    if (index != -1) {
      _tasks[index] = task;
      await saveTasks();
      loadTasks();
      notifyListeners();
    }
  }

  Future<void> deleteTask(Task task) async {
    _tasks.removeWhere((t) => t.id == task.id);
    await saveTasks();
    loadTasks();
    notifyListeners();
  }

  Future<void> saveTasks() async {
    final prefs = await SharedPreferences.getInstance();
    List<String> taskList = _tasks.map((t) => jsonEncode(t.toJson())).toList();
    await prefs.setStringList('tasks', taskList);
    loadTasks();
  }

  Future<void> loadTasks() async {
    final prefs = await SharedPreferences.getInstance();
    List<String>? taskList = prefs.getStringList('tasks');
    if (taskList != null) {
      _tasks = taskList.map((t) => Task.fromJson(jsonDecode(t))).toList();
    }
    notifyListeners();
  }
}
