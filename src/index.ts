import "dotenv/config.js";
import express from 'express';
import sequelize from "./db/index";
import router from './routes/index.route';
import errorMiddleware from "./middlewares/error.middleware";

const { NODE_PORT } = process.env;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

sequelize.sync({ force: true }).then(() => {
	app.use('/api', router);
	app.use(errorMiddleware);
	app.listen(NODE_PORT, () => console.log(`Listening at ${NODE_PORT}...`));
}).catch((error) => {
	console.error('Sequelize ERROR: ', error);
});