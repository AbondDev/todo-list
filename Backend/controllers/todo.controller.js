const Todo = require('../models/todo.model')

module.exports.index = async (req,res) => {
  try {
    const todos = await Todo.find().exec();
    res.json(todos);
  } catch (err) {
    console.log(err)
  }
}

module.exports.show = async (req,res) => {
  let {id} = req.params
  try {
    const todos = await Todo.findyById(id).exec();
    res.json(todos);
  } catch (err) {
    console.log(err)
  }
}

module.exports.add = async (req,res) => {
  let todo = new Todo(req.body);
  todo.save()
    .then( todo => {
      res.status(200).json({'todo': 'todo added successfully'})
    })
    .catch(err => {
      res.status(400).send('adding new todo failed')
    })
}

module.exports.update = async (req,res) => {
  let {id} = req.params

    let todo = Todo.findyById(id)
    if(!todo) {
      res.status(404).send("Data not found");
    } else {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;

      todo.save()
        .then(todo => {
          res.json('Todo Updated');
        })
        .catch( err => {
          res.status(400).send('Update Not Possible')
        })
    }
}
