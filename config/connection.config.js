const db = require('../models');
const Role = db.role;
const dbConfig = require('./db.config');

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
