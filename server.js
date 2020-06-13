const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;


let Todo = require('./models/todo');

// middleware
app.use(cors());
app.use(bodyParser.json());

// connect to db
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function(){
  console.log('MongoDB database connection established successfully');
});

// define routes
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/add').post(function(req, res) {
  console.log(req)
  let todo = new Todo(req.body);
  todo.save()
      .then(todo => {
          res.status(200).json({'todo': 'todo added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new todo failed');
      });
});

todoRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
      res.json(todo);
  });
});

todoRoutes.route('/update/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo)
        res.status(404).send("data is not found");
    else
      todo.description = req.body.description;
      todo.responsible = req.body.responsible;
      todo.priority = req.body.priority;
      todo.done = req.body.done;

      todo.save().then(todo => {
          res.json('Todo updated!');
      })
      .catch(err => {
          res.status(400).send("Update not possible");
      })
  });
});

todoRoutes.route('/delete/:id').post(function(req, res) {
  Todo.findByIdAndDelete(req.params.id, function(err, todo) {
    if (!todo)
      res.status(404).send("data is not found");
    else
      res.status(200).send("delete success!");
      console.log('delete success!')
  });
});

// apply routes to app
app.use('/todos', todoRoutes);

app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
