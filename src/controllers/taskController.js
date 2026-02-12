const Task = require('../models/Task');
const AppError = require('../utils/AppError');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.createTask(req.user.id, title, description);
    res.status(201).json({ status: 'success', data: { task } });
  } catch (err) {
    next(err);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const cursor = req.query.cursor || null;

    const tasks = await Task.getTasksByUser(req.user.id, limit, cursor);
    
    // Determine next cursor
    const nextCursor = tasks.length > 0 ? tasks[tasks.length - 1].id : null;

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: { tasks },
      nextCursor
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    // 1. Check Ownership & Existence
    const check = await Task.findTaskByIdAndUser(taskId, req.user.id);
    
    if (check.status === 'not_found') {
      return next(new AppError('No task found with that ID', 404));
    }
    if (check.status === 'forbidden') {
      return next(new AppError('You do not have permission to edit this task', 403));
    }

    // 2. Filter Body (Mass Assignment Protection)
    const allowedFields = ['title', 'description', 'completed'];
    const filteredBody = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) filteredBody[key] = req.body[key];
    });

    if (Object.keys(filteredBody).length === 0) {
      return next(new AppError('No valid fields provided for update', 400));
    }

    // 3. Update
    const updatedTask = await Task.updateTask(taskId, req.user.id, filteredBody);
    res.status(200).json({ status: 'success', data: { task: updatedTask } });

  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    
    const check = await Task.findTaskByIdAndUser(taskId, req.user.id);
    if (check.status !== 'success') {
        return next(new AppError('Not found or you do not have permission', 404));
    }

    await Task.deleteTask(taskId, req.user.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};