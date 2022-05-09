const express = require('express');

const router = express.Router();

const taskdata = require('../data/tasks.json');

router.get('/', (req, res) => res.json(taskdata));

router.get('/id/:id', (req, res) => {
    const found = taskdata.find((data) => data.id === req.params.id);
    if (found) {
        res.json(taskdata.filter(((data) => data.id === req.params.id)));
    } else {
        res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
    }
});

module.exports = router;