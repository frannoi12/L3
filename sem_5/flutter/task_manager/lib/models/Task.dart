class Task {
  String id;
  String title;
  String description;

  Task({required this.id, required this.title, required this.description});

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'description': description,
      };

  factory Task.fromJson(Map<String, dynamic> json) => Task(
        id: json['id'],
        title: json['title'],
        description: json['description'],
      );
}
