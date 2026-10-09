import express from 'express';
import path from 'path';
import { weightsRouter } from './routes/weightsRouter.js';
import { manufacturersRouter } from './routes/manufacturersRouter.js';
import { materialsRouter } from './routes/materialsRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;
const currDir = import.meta.dirname;

// setting template engine ejs
app.set('views', path.join(currDir, 'views'));
app.set('view engine', 'ejs');

// static assets
const assetsPath = path.join(currDir, 'public');
app.use(express.static(assetsPath));

// to parse the incoming post form data
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/materials', materialsRouter);
app.use('/manufacturers', manufacturersRouter);
app.use('/', weightsRouter);

// error handling middleware
app.use((req, res) => {
	res.status(404).render('error', { error: '404-Page Not Found' });
});
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).render('error', { error: '500-Something Went Wrong' });
});

app.listen(PORT, (err) => {
	if (err) {
		throw err;
	}
	console.log(`Listening on port: ${PORT}`);
});
