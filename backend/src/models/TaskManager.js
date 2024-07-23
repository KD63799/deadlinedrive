const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "task" }); // Call the constructor of the parent class AbstractManager passing the table name "task"
  }

  // Method to validate the task object
  validateTask(task) {
    console.log('Validating task:', task);
    
    // Convert the deadline string to a Date object if it's a string
    if (typeof task.deadline === 'string') {
      task.deadline = new Date(task.deadline);
    } 
    
    // Validate the task properties
    if (
      typeof task.title !== "string" || 
      typeof task.description !== 'string' || 
      typeof task.status !== "string" || 
      !(task.deadline instanceof Date) || isNaN(task.deadline.getTime()) || // Check if deadline is a valid Date object
      typeof task.id_user !== "number"
    ) {
      console.log('Validation failed:', {
        title: typeof task.title,
        description: typeof task.description,
        status: typeof task.status,
        deadline: task.deadline instanceof Date && !isNaN(task.deadline.getTime()),
        id_user: typeof task.id_user
      });
      return false;
    }
    return true;
  }
  

  // Method to insert a new task into the database
  insert(task) {
    // Check if the task is valid
    if (!this.validateTask(task)) {
      throw new Error("Invalid data."); // If not, throw an error
    }

    // Destructure the task object to get its properties
    const { title, description, status, deadline, id_user } = task;
    // Execute the SQL INSERT query
    return this.database.query(
      `INSERT INTO ${this.table} 
      (title, description, status, deadline, id_user)  
      VALUES (?, ?, ?, ?, ?)`,
      [title, description, status, deadline, id_user]
    );
  }

  // Method to update an existing task in the database
  update(task) {
    // Check if the task has an ID
    if (!task.id) {
      throw new Error("ID is required for update."); // If not, throw an error
    }

    // Check if the task is valid
    if (!this.validateTask(task)) {
      throw new Error("Invalid data."); // If not, throw an error
    }

    // Execute the SQL UPDATE query
    return this.database.query(
      `UPDATE ${this.table} SET 
      title = ?, 
      description = ?, 
      status = ?, 
      deadline = ? 
      WHERE id = ?`,
      [task.title, task.description, task.status, task.deadline, task.id]
    );
  }
}

module.exports = TaskManager; // Export the TaskManager class
