const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const db = require('./models');
const Role = db.role;
const dbConfig = require('./config/db.config');

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        // Lakukan inisialisasi jika tidak ada dokumen Role
        new Role({
          name: 'user',
        })
          .save()
          .then(() => console.log("Added 'user' to roles collection"))
          .catch((err) => console.error('Error adding role "user"', err));

        new Role({
          name: 'moderator',
        })
          .save()
          .then(() => console.log("Added 'moderator' to roles collection"))
          .catch((err) => console.error('Error adding role "moderator"', err));

        new Role({
          name: 'admin',
        })
          .save()
          .then(() => console.log("Added 'admin' to roles collection"))
          .catch((err) => console.error('Error adding role "admin"', err));
      }
    })
    .catch((err) => {
      console.error('Error retrieving role count', err);
      process.exit();
    });
}

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
