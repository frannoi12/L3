import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:task_manager/models/Task.dart';
import 'package:task_manager/view_models/TaskViewModels.dart';

class TaskForm extends StatefulWidget {
  final TaskViewModel viewModel;
  final Task? task;

  TaskForm({required this.viewModel, this.task});

  @override
  _TaskFormState createState() => _TaskFormState();
}

class _TaskFormState extends State<TaskForm> {
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final now = DateTime.now().toString();

  @override
  void initState() {
    super.initState();
    if (widget.task != null) {
      _titleController.text = widget.task!.title;
      _descriptionController.text = widget.task!.description;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title:
              Text(widget.task == null ? 'Nouvelle tâche' : 'Modifier tâche')),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _titleController,
              decoration: InputDecoration(labelText: 'Titre'),
            ),
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                if (widget.task == null) {
                  widget.viewModel.addTask(Task(
                    id: now,
                    title: _titleController.text,
                    description: _descriptionController.text,
                  ));
                } else {
                  widget.viewModel.updateTask(Task(
                    id: widget.task!.id,
                    title: _titleController.text,
                    description: _descriptionController.text,
                  ));
                }
                Navigator.pop(context);
              },
              child: Text(widget.task == null ? 'Ajouter' : 'Mettre à jour'),
            ),
          ],
        ),
      ),
    );
  }
}
