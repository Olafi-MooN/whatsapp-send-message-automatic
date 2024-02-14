import express from 'express';
import nunjucks from 'nunjucks';
import { router } from './routers/router';

const server = express();

nunjucks.configure(__dirname + '/views', {
	autoescape: true,
	express: server,
	watch: true,
});

server.set('view engine', 'njk');
server.use(express.static(__dirname + '/Public'));
server.use(router);

server.listen(process.env.PORT || 3000, () => {
	console.log('O servidor foi iniciado com sucesso!');
});
