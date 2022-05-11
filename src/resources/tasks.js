const express = require('express');
const fs = require('fs');

const router = express.Router();
const taskData = require('../data/tasks.json');

router.get('/', (req, res) => res.json(taskData));
router.get('/:id', (req, res) => {
  const found = taskData.find((data) => data.id === req.params.id);
  if (found) {
    res.json(taskData.filter((data) => data.id === req.params.id));
  } else {
    res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
  }
});
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const filterTs = taskData.filter((taskParams) => taskParams.id !== taskId);
  if (taskData.length === filterTs.length) {
    res.send('Could not delete because the time sheet was not found');
  } else {
    fs.writeFile('src/data/tasks.json', JSON.stringify(filterTs), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send(filterTs);
      }
    });
  }
});
router.post('/', (req, res) => {
  const tasksjson = req.body;
  taskData.push(tasksjson);
  fs.writeFile('src/data/tasks.json', JSON.stringify(taskData), (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).json(tasksjson);
    }
  });
});
router.put('/:id', (req, res) => {
  const Found = taskData.some((modifiedTask) => modifiedTask.id === req.params.id);
  if (Found) {
    const updateTask = req.body;
    taskData.forEach((task, i) => {
      if (task.id === req.params.id) {
        const tsUpdate = { ...task, ...updateTask };
        taskData[i] = tsUpdate;
        fs.writeFile('src/data/tasks.json', JSON.stringify(taskData), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send('Updated correctly');
          }
        });
        res.json({ msg: 'task update', tsUpdate });
      }
    });
  } else {
    res.status(400).json({ msg: `No admin with the id of ${req.params.id}` });
  }
});
module.exports = router;
