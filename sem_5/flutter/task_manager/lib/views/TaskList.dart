import 'package:flutter/material.dart';
import 'package:task_manager/models/Task.dart';
import 'package:task_manager/view_models/TaskViewModels.dart';
import 'package:task_manager/views/TaskForm.dart';

class TaskList extends StatelessWidget {
  final TaskViewModel viewModel;
  TaskList({required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Gestion des tâches')),
      body: ListView.builder(
        itemCount: viewModel.tasks.length,
        itemBuilder: (context, index) {
          Task task = viewModel.tasks[index];
          print(task.toJson());
          return ListTile(
            title: Text(task.title),
            subtitle: Text(task.description),
            trailing: Container(
              color: Colors.blue,
              width: 100.0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  IconButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                TaskForm(viewModel: viewModel, task: task),
                          ),
                        );
                      },
                      icon: Icon(Icons.edit)),
                  IconButton(
                    icon: Icon(Icons.delete, color: Colors.red),
                    onPressed: () => viewModel.deleteTask(task),
                  ),
                ],
              ),
            ),
            // onTap: () => Navigator.push(
            //   context,
            //   MaterialPageRoute(
            //     builder: (context) =>
            //         TaskForm(viewModel: viewModel, task: task),
            //   ),
            // ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => TaskForm(viewModel: viewModel),
          ),
        ),
        child: Icon(Icons.add),
      ),
    );
  }
}
