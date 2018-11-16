
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const action = require('../data/helpers/actionModel');
const project = require('../data/helpers/projectModel');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));




const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
  };






//**********MIDDLEWARE**********




//**********Project Middleware**********




const nameCheck = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      errorHelper(404, 'Name must be included', res);
      next();
    } else {
      next();
    }
};

const nameLengthCheck = (req, res, next) => {
    const { name } = req.body;
    if (name.length > 128) {
        errorHelper(404, 'Name must be less than 129 characters', res);
        next();
    } else {
        next();
    }
  };

  const descriptionCheck= (req, res, next) => {
    const { description } = req.body;
    if (!description) {
      errorHelper(404, 'Description must be included', res);
      next();
    } else {
      next();
    }
  };





  //**********Action Middleware**********




  const actionIdCheck= (req, res, next) => {
    const { project_id } = req.body;
    if (!project_id) {
      errorHelper(404, 'Project ID must be included', res);
      next();
    } else {
      next();
    }
  };

  const descriptionLengthCheck= (req, res, next) => {
    const { description } = req.body;
    if (description.length > 128) {
      errorHelper(404, 'Description must be less than 129 characters', res);
      next();
    } else {
      next();
    }
  };

  const notesCheck = (req, res, next) => {
    const { notes } = req.body;
    if (!notes) {
      errorHelper(404, 'Notes must be included', res);
      next();
    } else {
      next();
    }
};





//**********ACTION**********






// Get by ID

server.get('/action/:id', (req, res) => {
    const id = req.params.id;
    action.get(id)
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the action with id."})
          });

});

//Post it

server.post ('/action', actionIdCheck, notesCheck, descriptionLengthCheck,  (req, res) => {
    const {project_Id, description, notes} = req.body
    action.insert({project_Id, description, notes})
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't post it!"})
          });
});

//Update post

server.put('/action/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    action.update(id, post)
          .then (update => {
            res.json(update)
          })
          .catch(err => {
              res.status(500).json({error: "Can't be modified."})
          });

});

//Delete Post

server.delete('/action/:id', (req, res) => {
    const id = req.params.id;

    action.remove(id)
          .then (remove => {
            res.status(200).json(remove)
          })
          .catch(err => {
              res.status(500).json({error: "Can't remove the action."})
          });

});





//**********PROJECT**********





// Get by ID

server.get('/project/:id', (req, res) => {
    const id = req.params.id;
    project.get(id)
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the project with id."})
          });

});

//Post it

server.post ('/project', nameCheck, nameLengthCheck, descriptionCheck, (req, res) => {
    const {name, description} = req.body;
    project.insert({name, description})
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't post the project."})
          });


});

//Update post

server.put('/project/:id', (req, res) => {
    const id = req.params.id;
    const project = req.body;
    project.update(id, post)
          .then (update => {
            res.json(update)
          })
          .catch(err => {
              res.status(500).json({error: "Can't be modified."})
          });

});

//Delete Post

server.delete('/project/:id', (req, res) => {
    const id = req.params.id;

    project.remove(id)
          .then (remove => {
            res.status(200).json(remove)
          })
          .catch(err => {
              res.status(500).json({error: "Can't remove the project."})
          });

});

server.get('/project/actions/:id', (req, res) => {
    const id = req.params.id;
    project.getProjectActions(id)
          .then (post => {
            res.status(200).json(post)
          })
          .catch(err => {
              res.status(500).json({error: "Can't recieve the project with id."})
          });

});





module.exports = server;