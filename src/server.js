const express = require('express');
const dbConnection = require('./config/db');
const categoryRouter = require('./routes/category.route');
const subCatRouter = require('./routes/subcategory.route');
const productRouter = require('./routes/product.route');
const managerRouter = require('./routes/manager.route');
const userRouter = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/authenticate');

const app = express()

/// port
const PORT = 9000;

// Connect to the database
dbConnection()

// Set up view engine and views directory
app.set('view engine', 'ejs')
app.set('views', 'src/views')

// Set up the public folder to serve static files
app.use(express.static('public'));
app.use(express.static('upload'));
app.use(cookieParser());

// Middleware
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/category', categoryRouter)
app.use('/subcategory', subCatRouter)
app.use('/product', productRouter)
app.use('/manager', managerRouter)
app.use('/user', userRouter)

app.get('/', authenticate, (req, res) => {
    res.render('Pages/index')
})

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.log('server Not Start')
    }
    console.log(`listing on port http://localhost:${PORT}`)
})