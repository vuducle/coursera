const bodyParser = require('body-parser');
const express = require('express'),
     http = require('http');
const dishRouter = require('./Router/DishRouter')
const promoRouter = require('./Router/PromoRouter')
const leaderRouter = require('./Router/LeaderRouter')
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;

const app = express();



app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/dishes', dishRouter.dishRouter);
app.use('/dishes', dishRouter.dishRouterId);
app.use('/promotions', promoRouter.promoRouter);
app.use('/promotions', promoRouter.promoRouterId);
app.use('/leaders', leaderRouter.leaderRouter);
app.use('/leaders', leaderRouter.leaderRouterId);

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});