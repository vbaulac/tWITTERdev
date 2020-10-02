const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://victor:vicoutou@cluster0.ikqy2.mongodb.net/dyma-node?retryWrites=true&w=majority', 
        {
          useNewUrlParser: true, 
          useUnifiedTopology: true,
          useCreateIndex: true
        })
        .then(() => {
          console.log('connexion DB ok');
        })
        .catch((err) => {
          console.log(err);
        })