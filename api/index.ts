import app from './routes';
const port = process.env.PORT || 3001;
import db from './models'

db.sequelize.sync({force : true}).then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});