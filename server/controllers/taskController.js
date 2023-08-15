const db = require("../config/db");
const { head } = require("../routes/taskRoutes");

// Create Database

const taskController = {
  createDB: (req, res) => {
    let q = "CREATE DATABASE taskApp_DB";
    db.query(q, (err, result) => {
      if (err) throw err;
      return res.status(201).json("DB Created...");
    });
  },
  createTable: (req, res) => {
    let q =
      "CREATE TABLE task(id INT AUTO_INCREMENT PRIMARY KEY, task_heading VARCHAR(255) NOT NULL,task_description TEXT, task_priority ENUM('Low', 'Medium', 'High') NOT NULL, task_date DATE,task_time TIME, task_image_url VARCHAR(255))";
    db.query(q, (err, result) => {
      if (err) throw err;
      return res.status(201).json("TABLE CREATED...");
    });
  },
  createTask: (req, res) => {
    const { heading, description, priority, imageUrl, Date, Time } = req.body;
    const q = `INSERT INTO task (task_heading, task_description, task_priority, task_date, task_time, task_image_url)
    VALUES (?, ?, ?, ?, ?, ?);`;

    db.query(
      q,
      [heading, description, priority, Date, Time, imageUrl],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Error creating task", details: err.message });
        }
        return res
          .status(201)
          .json({ message: "Task Created successfully", result });
      }
    );
  },
  getTasks: (req, res) => {
    const q = `
    SELECT *
    FROM task
    ORDER BY task_date ASC, task_time ASC;
  `;

    db.query(q, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error retrieving data", details: err.message });
      }

      return res.status(200).json(result);
    });
  },
  getEditTasks: (req, res) => {
    const taskId = req.params.id;
    const q = `
    SELECT *
    FROM task
    WHERE id = ?
  `;
    db.query(q, [taskId], (error, results) => {
      if (error) {
        console.error("Error fetching task:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching the task." });
        return;
      }

      if (results.length > 0) {
        const task = results[0];
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    });
  },
  deleteTasks:(req,res)=>{
    const taskId=req.params.id
    const deleteQuery = 'DELETE FROM task WHERE id = ?';
    const fetchQuery = 'SELECT * FROM task';
  
    db.execute(deleteQuery, [taskId], (deleteError, deleteResults) => {
      if (deleteError) {
        res.status(500).json({ message: 'Error deleting task' });
      } else {
        db.query(fetchQuery, (fetchError, fetchResults) => {
          if (fetchError) {
            res.status(500).json({ message: 'Error fetching tasks' });
          } else {
            res.json(fetchResults);
          }
        });
      }
    });

  },
  getOneTask :(req,res)=>{
    const taskId=req.params.id

  const query = "SELECT * FROM task WHERE id = ?";
  db.query(query, [taskId], (err, results) => {
    if (err) {
      console.error("Error fetching task:", err);
      return res.status(500).json({ error: "An error occurred while fetching the task." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    const task = results[0];
    res.json(task);
  });
  },
  updateTask:async(req,res)=>{
    const taskId=req.params.id
    const { heading, description,imageUrl, } = req.body;
    const query= "UPDATE task SET task_heading = ?, task_description = ?, task_image_url = ? WHERE id = ?";
    db.query(query, [heading, description, imageUrl, taskId], (err, results) => {
      if (err) {
        console.error("Error updating task:", err);
        return res.status(500).json({ error: "An error occurred while updating the task." });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found." });
      }
  
      res.status(201).json({ message: "Task updated successfully" });
    });
  }
};

module.exports = taskController;
