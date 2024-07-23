const models = require("../models");
const argon2 = require("argon2");
const { validationResult } = require('express-validator');

// Function to get all users
const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows); // Send the retrieved rows as the response
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Send a 500 status on error
    });
};

// Function to get a user by ID
const read = (req, res) => {
  models.user
  
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404); // Send a 404 status if no user is found
      } else {
        res.send(rows[0]); // Send the found user as the response
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Send a 500 status on error
    });
};

//function for changing a user information
const edit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Bad Request
  }
  try {
    const userId = parseInt(req.params.id, 10); // Extract user ID from request parameters
    const newUserDetails = req.body; // Extract new user details from request body

    // Check if the user exists
    const existingUser = await models.user.findById(userId);
    console.log('Existing User:', existingUser); // Debugging log

    // Return 404 if user does not exist
    if (!existingUser) {
      return res.status(404).send('User not found'); // Envoyer un statut 404 si aucun utilisateur n'est trouvé
    }

    // Update user information by merging existing and new details
    const updatedUser = {
      ...existingUser,
      ...newUserDetails,
    };

    const result = await models.user.update(updatedUser);

    // Return 404 if user informations nothing updating
    if (result.affectedRows === 0) {
      return res.status(404).send('No user updated');
    }

    console.log("User details updated successfully for user:", userId);
    return res.status(204).send(); // Envoyer un statut 204 pour indiquer le succès

  } catch (err) {
    console.error('Error updating user:', err);
    
    if (!res.headersSent) {
      return res.status(500).send('Internal Server Error');
    }
  }
};

//function for changing password
const changePassword = async (req, res) => { 
  try {
    const userId = parseInt(req.params.id, 10); // Extract user ID from request parameters
    const {newPassword } = req.body; // Extract newPassword from request body
    console.log(newPassword, "New password")

    // Hash the new password using argon2
    const hashPassword = await argon2.hash(newPassword.newPassword);

    // Call the database model method to modify the user's password
    const result = await models.user.modifyPassword(userId, hashPassword);

    // Check if no rows were affected (user not found)
    if (result.affectedRows === 0) {
       return res.sendStatus(404);
    }
    console.log("Password updated successfully for user:", userId);
    return res.sendStatus(204); // Send 204 No Content status indicating success
  } catch (err) {
    console.error('Error updating password:', err);
    res.sendStatus(500); // Send 500 Internal Server Error status for any unexpected errors
  }
};

// Function to add a new user
const add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Bad Request
  }
  try {
    const user = req.body;
    const result = await models.user.insert(user);
    // Send a 201 status with a JSON response including the user ID and a success message
    res.status(201).location(`/users/${result.insertId}`).json({ id: result.insertId, message: "User created successfully" });
  } catch(err) {
    console.error(err);
    res.sendStatus(500); // Send a 500 status on error
  }
};

// Function to delete a user by ID
const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Send a 404 status if no user was deleted
      } else {
        res.sendStatus(204); // Send a 204 status to indicate success
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Send a 500 status on error
    });
};

// Function to get a user by email and pass the user to the next middleware
const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findUserByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        const [firstUser] = users;
        req.user = firstUser; // Attach the user to the request object
        next(); // Call the next middleware
      } else {
        res.sendStatus(401); // Send a 401 status if no user is found
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database"); // Send a 500 status on error
    });
};

module.exports = {
  browse,
  read,
  edit,
  changePassword,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
};
