export default class Task {
    static tasksCreated = [];
    static #nextId = 1;

    static createTask(title) {
        const task = new Task(title);
        this.tasksCreated.push(task);
        return task;
    }

    static findOne(id) {
        for (const task of Task.tasksCreated) {
            if (task.id == id) {
                return task;
            }
        }
        return null;
    }

    static editTask(id, title) {
        const task = Task.findOne(id);

        if (task) {
            task.title = title.trim();
            return task;
        }

        return null;
    }

    static deleteTask(id) {
        const task = this.findOne(id);

        if (task) {
            Task.tasksCreated = Task.tasksCreated.filter(
                currentTask => currentTask != task
            );

            return true
        }

        return false
    }


    constructor(title) {
        this.id = Task.#nextId
        this.title = title.trim();
        this.concluded = false;
        this.createdAt = new Date().toISOString();

        Task.#nextId++
    }
}