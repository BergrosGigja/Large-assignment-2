const EventEmitter = require('events');
const { Customer } = require('../data/db');

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
            if (err) {throw new Error(err);}
            this.emit(this.events.GET_ALL_CUSTOMERS, customers);
        });
    };

    getCustomerById(id) {
        Customer.findById(id, (err, customer) => {
            if (err) {throw new Error(err);}
            this.emit(this.events.GET_CUSTOMER_BY_ID, customer);
        });
    };

    getCustomerAuctionBids(customerId) {
        // Customer.findById(id, (err, customer) => {
        //     if (err) {throw new Error(err);}
        //     this.emit(this.events.GET_CUSTOMER_AUCTION_BIDS, customer);
        // });
    };

    createCustomer(customer) {
        Customer.create(customer, err => {
            if (err) {throw new Error(err);}
            this.emit(this.events.CREATE_CUSTOMER, customer);
        });
    };
};

module.exports = CustomerService;
