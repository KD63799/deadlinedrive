const models = require("../models");

// Function to retrieve all notifications
const browse = (req, res) => {
  models.notification
    .findAll()
    .then(([rows]) => {
      res.send(rows); // Sends all notifications in response
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to retrieve a specific notification by its ID
const read = (req, res) => {
  models.notification
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404); // Sends a 404 response if the notification is not found
      } else {
        res.send(rows[0]); // Sends the found notification in response
      }
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to update an existing notification
const edit = (req, res) => {
  const notification = req.body;

  // TODO validations (length, format...)

  notification.id = parseInt(req.params.id, 10);

  models.notification
    .update(notification)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Sends a 404 response if the notification to be updated is not found
      } else {
        res.sendStatus(204); // Sends a 204 response to indicate the update was successful
      }
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to add a new notification
const add = (req, res) => {
  const notification = req.body;

  // TODO validations (length, format...)

  models.notification
    .insert(notification)
    .then(([result]) => {
      res.location(`/notifications/${result.insertId}`).sendStatus(201); // Sends a 201 response with the location of the new notification
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to delete an existing notification by its ID
const destroy = (req, res) => {
  models.notification
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Sends a 404 response if the notification to be deleted is not found
      } else {
        res.sendStatus(204); // Sends a 204 response to indicate the deletion was successful
      }
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
