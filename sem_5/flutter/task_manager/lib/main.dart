import 'package:flutter/material.dart';
import 'package:task_manager/view_models/TaskViewModels.dart';
import 'package:task_manager/views/TaskList.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final TaskViewModel taskViewModel = TaskViewModel();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter MVVM Task Manager',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: TaskList(viewModel: taskViewModel),
    );
  }
}
