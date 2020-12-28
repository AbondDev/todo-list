const express = require('express');
const router = express.Router();
const todos = require('../controllers/todo.controller')

router.route('/')
  .get(todos.index)

router.route('/add')
  .post(todos.add)
  
router.route('/:id')
  .get(todos.show)

router.route('/:id/update')
  .post(todos.update)



module.exports = router
