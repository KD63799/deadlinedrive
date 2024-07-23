const express = require("express"); // Import the Express framework
const router = express.Router(); // Create an instance of Express router
const { body } = require('express-validator');

// Import controllers functions
const userControllers = require("./controllers/userControllers");
const categoryControllers = require("./controllers/categoryControllers");
const quoteControllers = require("./controllers/quoteControllers");
const taskControllers = require("./controllers/taskControllers");
const deadlineControllers = require("./controllers/deadlineControllers");
const quote_categoryControllers = require("./controllers/quote_categoryControllers");
const commentControllers = require("./controllers/commentControllers");
const notificationControllers = require('./controllers/notificationControllers');
const userVoteControllers = require("./controllers/userVoteControllers");

//import middleware functions
const {
    verifyPassword,hashPassword,verifyToken,verifyId,
  } = require("./auth");
  

  //routes for user login with middlewares
  router.post(
    "/users/login",[body("email").trim().isEmail().withMessage("le champ email est incorrecte"), body("firstName").trim().isString(), body("lastName").trim().isString()], userControllers.getUserByEmailWithPasswordAndPassToNext,verifyPassword
  );

router.post("/quotes", quoteControllers.add);  
router.post("/users", hashPassword, userControllers.add); // Route to add a new user
router.get("/users", userControllers.browse); // Route to browse all users

// Protected routes
router.get('/users/:id', userControllers.read);
//incorporation validator for the route (email, firstName, lastName)
router.put('/users/:id',[body("email").trim().isLength({min: 1}).isEmail().withMessage("le champ email est incorrecte"), body("firstName").trim().isString(), body("lastName").trim().isString()], verifyToken, verifyId, userControllers.edit);
router.delete('/users/:id', userControllers.destroy);
router.put('/users/:id/password',userControllers.getUserByEmailWithPasswordAndPassToNext, verifyToken, userControllers.changePassword);

  
// Similar setup for categories, quotes, favoris, tasks, deadlines, quote categories, comments
router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

// routes for quotes, post, get, delete, put
router.get("/quotes", quoteControllers.browse);
router.get("/quotes/:id", quoteControllers.read);
router.put("/quotes/:id", quoteControllers.edit);
router.post("/quotes", quoteControllers.add);
router.delete("/quotes/:id", quoteControllers.destroy);

// routes for favorites, post, get, delete
router.post('/favorites', verifyToken, quoteControllers.addFavorite);
router.get('/favorites/:id', verifyToken, quoteControllers.getFavoritesById); 
router.delete('/favorites/:quoteId', quoteControllers.removeFavorite); 

// routes for tasks, post, get, delete, put
// Route to get a random or daily quote
router.get('/daily-quote', quoteControllers.getDailyQuote);
router.put("/quotes/:id", verifyToken, quoteControllers.edit);
router.post("/quotes", verifyToken, quoteControllers.add);
router.delete("/quotes/:id", verifyToken, quoteControllers.destroy);
router.post('/quotes/:quoteId/upvote', verifyToken, userVoteControllers.upvote);
router.post('/quotes/:quoteId/downvote', verifyToken, userVoteControllers.downvote);
router.get("/quotes/by-user/:userId", verifyToken, quoteControllers.findByUser);


router.get("/tasks", taskControllers.browse);
router.get("/tasks/:id", taskControllers.read);
router.put("/tasks/:id", taskControllers.edit);
router.post("/tasks", taskControllers.add);
router.delete("/tasks/:id", taskControllers.destroy);

// routes for deadline, post, get, delete, put
router.get("/deadline", deadlineControllers.browse);
router.get("/deadline/:id", deadlineControllers.read);
router.put("/deadline/:id", deadlineControllers.edit);
router.post("/deadline", deadlineControllers.add);
router.delete("/deadline/:id", deadlineControllers.destroy);

// routes for quote_category, post, get, delete, put
router.get("/quote_category", quote_categoryControllers.browse);
router.get("/quote_category/:id", quote_categoryControllers.read);
router.put("/quote_category/:id", quote_categoryControllers.edit);
router.post("/quote_category", quote_categoryControllers.add);
router.delete("/quote_category/:id", quote_categoryControllers.destroy);

// routes for comments, post, get, delete, put
router.get("/comments", commentControllers.browse);
router.get("/comment/:id", commentControllers.read);
router.get("/comments/by-quote/:quoteId", commentControllers.findByQuote);
// Route for update an existing comment with express validator verificaiton
router.put('/comments/:id', [
    body('content').optional().trim().isLength({ min: 1 }).withMessage('Content cannot be empty'),
    body('content').optional().isLength({ max: 500 }).withMessage('Content too long, maximum 500 characters'),
    body('id_user').optional().isNumeric().withMessage('User ID must be numeric'),
    body('id_quote').optional().isNumeric().withMessage('Quote ID must be numeric if provided')
], commentControllers.edit);
// Route for add comment with express validator verification
router.post('/comments', [
  body('content').trim().isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('content').isLength({ max: 500 }).withMessage('Content too long, maximum 500 characters'),
  body('id_user').isNumeric().withMessage('User ID must be numeric'),
  body('id_quote').optional().isNumeric().withMessage('Quote ID must be numeric if provided')
], commentControllers.add);
router.delete("/comment/:id", commentControllers.destroy);


// Route pour obtenir toutes les notifications
router.get('/notifications', notificationControllers.browse);

// Route pour obtenir une notification spécifique par id
router.get('/notifications/:id', notificationControllers.read);

// Route pour créer une nouvelle notification
router.post('/notifications', notificationControllers.add);

// Route pour marquer une notification comme lue
router.put('/notifications/:id/read', notificationControllers.edit);

// Route pour supprimer une notification
router.delete('/notifications/:id', notificationControllers.destroy);

// Route pour obtenir toutes les notifications d'un utilisateur spécifique
router.get('/notifications/user/:userId', notificationControllers.findByUserId);


module.exports = router;

 
//  authentication wall : verifyToken is activated for each route after this line
//  router.use(verifyToken); 

