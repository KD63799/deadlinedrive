const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.quote.findAll();
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const [rows] = await models.quote.find(req.params.id);
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  const quote = req.body;
  quote.id = parseInt(req.params.id, 10);

  try {
    await models.quote.update(quote, { where: { id: quote.id }});
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    if (error.message === "Invalid data." || error.message === "No fields have been modified.") {
      res.status(400).send({ error: error.message });
    } else {
      res.sendStatus(500);
    }
  }
};

const add = async (req, res) => {
  const quote = req.body;
  try {
    const [quoteResult] = await models.quote.insert(quote);
    const quoteId = quoteResult.insertId;

    if (quote.id_category) {
      await models.quote_category.insert(quoteId, quote.id_category);
    }

    res.location(`quotes/${quoteId}`).sendStatus(201);
  } catch (error) {
    console.error("Erreur lors de l'ajout des citations :", error);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const [result] = await models.quote.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const findByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching quotes for userId:', userId);
    const quotes = await models.quote.getByIdUser(userId);
    console.log('Fetched quotes:', quotes);
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Erreur lors de la récupération des citations par utilisateur:', error);
    res.sendStatus(500);
  }
}

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  findByUser,
};
