let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let methodOverride = require('method-override');
let Hotel = require('./model/hotels');
let flash = require('express-flash');
let session = require('express-session');
let app = express();


mongoose.connect('mongodb://localhost:27017/hotelList')
    .then(() => {
        console.log('Connection Open');
    })
    .catch(err => {
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('method'));
app.use(flash());
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'bayanacademy',
    resave: false, 
    saveUninitialized: false}));

app.get('/', async (req, res) => {
    let hotels = await Hotel.find({});
    res.render('index', {hotels})
})


app.post('/new', async (req, res) => {
    let newHotel = new Hotel(req.body);
    await newHotel.save();
    req.flash('info', 'Successfully Saved!');
    res.redirect('/');
})

app.get('/hotel/:id', async (req, res) => {
    let {id} = req.params;
    let hotel = await Hotel.findById(id)
    res.render('info', {hotel})
})


app.put('/hotel/:id', async(req, res) => {
    let {id} = req.params;
    let hotel = await Hotel.findByIdAndUpdate(id, req.body);
    req.flash('info', 'Successfully Updated!');
    res.redirect(`/hotel/${hotel.id}`);
})

app.delete('/delete/:id', async (req, res) => {
    let {id} = req.params;
    let deleteHotel = await Hotel.findByIdAndDelete(id)
    req.flash('info', 'Successfully Deleted!');
    res.redirect('/')
})


app.listen(3000, () => {
    console.log('Listening on port 3000.')
})