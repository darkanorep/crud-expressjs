let mongoose = require('mongoose');
let Hotel = require('./model/hotels');

mongoose.connect('mongodb://localhost:27017/hotelList')
    .then(() => {
        console.log('Connection Open');
    })
    .catch(err => {
        console.log(err.message);
        console.log('Error');
    })

let p = new Hotel ({
    name: 'Crown Royale',
    location: 'Balanga City Bataan',
    latitude: 14.67596525,
    longitude: 120.53188494887,
    cost: 700,
    description: "test description",
    date: Date()
 
})

p.save()
    .then(() => {
        console.log("saved");
    })
    .catch(err => {
        console.log(err);
    })


