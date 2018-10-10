const mongoose = require('mongoose');
const artSchema = require('../schemas/art');
const artistSchema = require('../schemas/artist');
const auctionSchema = require('../schemas/auction');
const auctionBidSchema = require('../schemas/auctionBid');
const customerSchema = require('../schemas/customer');
//const orderSchema = require('../schemas/order');

const connection = mongoose.createConnection('mongodb://bergros:abc123@ds161455.mlab.com:61455/large-assignment-2', { useNewUrlParser: true });

module.exports = {
    Art: connection.model('Art', artSchema),
    Artist: connection.model('Artist', artistSchema),
    Auction: connection.model('Auction', auctionSchema),
    AuctionBid: connection.model('AuctionBid', auctionBidSchema),
    Customer: connection.model('Customer', customerSchema),
<<<<<<< HEAD
    connection
    //Order: connection.model('Order', orderSchema)
};
