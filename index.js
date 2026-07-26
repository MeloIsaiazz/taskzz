import express from "express";
import Task from "./task.js";

const port = 3000;
const app = express();

//middleware para ler jsoj
app.use(express.json());

// Saúde da Aplicação
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Listar tarefas
app.get("/tasks", (req, res) => {
    res.status(200).json(Task.tasksCreated);
});

// Criar tarefa
app.post("/tasks", (req, res) => {
    if (!req.body.title.trim()) {
        return res.status(400).json({ code: 400, message: "Title is required" })
    }

    return res.status(201).json(Task.createTask(req.body.title));
})

// Recuperar tarefa
app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = Task.findOne(id);

    if (task) {
        return res.status(200).json(task);
    }
    return res.status(404).json({ code: 404, message: "Not found" })
})

app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!req.body.title.trim()) {
        return res.status(400).json({ code: 400, message: "Title is required" });
    }

    const task = Task.editTask(id, req.body.title);

    if (task) {
        return res.status(200).json(task);
    }

    return res.status(404).json({ code: 404, message: "Not found" });
});

app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Task.deleteTask(id)) {
        return res.status(204).json()
    }

    return res.status(404).json({ code: 404, message: "Not found" })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
    console.log(`http://localhost:${port}`)
});