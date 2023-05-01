require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// connect DB
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');
const subdivisionRouter = require('./routes/subdivision');
const stationRouter = require('./routes/station')
const beatRouter = require('./routes/beat')
const userRouter = require('./routes/users')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// json parser
app.use(express.json());

app.set('trust proxy',1); // express rate limit documentation says that this must be done if we wish to deploy on server
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes (milli seconds)
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/subdivision',subdivisionRouter);
app.use('/api/v1/station',stationRouter);
app.use('/api/v1/beat',beatRouter);
app.use('/api/v1/users',userRouter)

// error handler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to mongoDB")
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
