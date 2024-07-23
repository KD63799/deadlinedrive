const models = require("../models");
const { validationResult } = require('express-validator');


// Fetches all comments from the database
const browse = async (req, res) => {
    try {
        const rows = await models.comment.findAll();
        res.send(rows); // Send all comments back to the client
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Send a server error status if the operation fails
    }
};

// Fetches a single comment by its ID
const read = async (req, res) => {
    try {
        const comment = await models.comment.find(req.params.id);
        if (!comment) {
            res.sendStatus(404); // Send a not found status if no comment is found
        } else {
            res.send(comment); // Send the found comment back to the client
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Send a server error status if the operation fails
    }
};

// Fetches comments associated with a specific quote by quote ID
const findByQuote = async (req, res) => {
    try {
        const { quoteId } = req.params; // Extract quoteId from request parameters
        const rows = await models.comment.findByQuoteId(quoteId);
        res.send(rows); // Send comments related to the specified quote back to the client
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Send a server error status if the operation fails
    }
};

const add = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const comment = req.body;
    try {
        const result = await models.comment.insert(comment);
        res.location(`/comments/${result.insertId}`).sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

const edit = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const comment = { ...req.body, id: parseInt(req.params.id, 10) };
    try {
        await models.comment.update(comment);
        res.sendStatus(204); // No Content
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};


// Deletes a comment by ID
const destroy = async (req, res) => {
    try {
        const result = await models.comment.delete(req.params.id);
        if (result.affectedRows === 0) {
            res.sendStatus(404); // Send a not found status if no comment is found for deletion
        } else {
            res.sendStatus(204); // Send a success status (No Content) when deletion is successful
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Send a server error status if the operation fails
    }
};

module.exports = {
    browse,
    read,
    findByQuote,
    edit,
    add,
    destroy,
};
