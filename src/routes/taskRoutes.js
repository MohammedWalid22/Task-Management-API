const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes below are protected
router.use(authMiddleware.protect);

router.route('/')
  .post(taskController.createTask)
  .get(taskController.getAllTasks);

router.route('/:taskId')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;