const router = require("express").Router();

const Workers = require("../models/workers-model");

// GET - all workers
router.get("/", (req, res) => {
    Workers.get()
    .then(workers => res.status(200).json(workers))
    .catch(err => res.status(500).json({ error: "The server failed to retrieve all workers from the database." }));
});

// GET - worker by ID
router.get("/:id", (req, res) => {
    Workers.getById(req.params.id)
    .then(worker => res.status(200).json(worker))
    .catch(err => res.status(500).json({ error: "The server failed to retrieve the worker from the database." }));
});

// POST - add a worker 
router.post("/", (req, res) => {
    Workers.add(req.body)
    .then(worker => res.status(201).json(worker))
    .catch(err => res.status(500).json({ error: "The server failed to add the worker to the database."}));
});

// PUT - update a worker
router.put("/:id", async (req, res) => {
    Workers.update(req.params.id, req.body)
    .then(updatedWorker => res.status(201).json(updatedWorker))
    .catch(err => res.status(500).json({ error: "Failed to update worker." }))
});

// DELETE - remove a worker
router.delete("/:id", (req, res) => {
    Workers.remove(req.params.id)
    .then(removed => res.status(200).json(removed))
    .catch(err => res.status(500).json({ error: "Failed to remove worker from the database." }));
});

module.exports = router;