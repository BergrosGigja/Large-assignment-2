const EventEmitter = require('events');
const { Customer, AuctionBid } = require('../data/db');

class CustomerService extends EventEmitter {
    constructor() {
        super();
        this.events = {
            GET_ALL_CUSTOMERS: 'GET_ALL_CUSTOMERS',
            GET_CUSTOMER_BY_ID: 'GET_CUSTOMER_BY_ID',
            GET_CUSTOMER_AUCTION_BIDS: 'GET_CUSTOMER_AUCTION_BIDS',
            CREATE_CUSTOMER: 'CREATE_CUSTOMER'
        };
    }
    getAllCustomers() {
        Customer.find({}, (err, customers) => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else if (customers.length == 0) { this.emit('error', { statusCode: 404, message: 'Not found' }); }
            else { this.emit(this.events.GET_ALL_CUSTOMERS, customers); }
        });
    };

    getCustomerById(id) {
        Customer.findById(id, (err, customer) => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else if (!customer) { this.emit('error', { statusCode: 404, message: 'Customer Not found' }); }
            else { this.emit(this.events.GET_CUSTOMER_BY_ID, customer); }
        });
    };
    
    getCustomerAuctionBids(_customerId) {
        Customer.findById(_customerId, (err, customer) => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else if (!customer) { this.emit('error', { statusCode: 404, message: 'Customer Not found' }); }
            else {
                AuctionBid.find({customerId: _customerId}, (err, auctionBids) => {
                    if (err) { this.emit('error', { statusCode: 500, message: err }); }
                    else if (auctionBids.length == 0) { this.emit('error', { statusCode: 404, message: 'Customer bids Not found' }); }
                    else { this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, auctionBids); }
                });
            }
        });
    };

    createCustomer(customer) {
        Customer.create(customer, err => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else { this.emit(this.events.CREATE_CUSTOMER, customer); }
        });
    };
};

module.exports = CustomerService;
