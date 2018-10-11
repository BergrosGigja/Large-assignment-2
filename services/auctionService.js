const EventEmitter = require('events');
const { Auction, Customer, AuctionBid } = require('../data/db');

class AuctionService extends EventEmitter {
	constructor() {
		super();
		this.events = {
			GET_ALL_AUCTIONS: 'GET_ALL_AUCTIONS',
			GET_AUCTION_BY_ID: 'GET_AUCTION_BY_ID',
			GET_AUCTION_WINNER: 'GET_AUCTION_WINNER',
			CREATE_AUCTION: 'CREATE_AUCTION',
			GET_AUCTION_BIDS_WITHIN_AUCTION: 'GET_AUCTION_BIDS_WITHIN_AUCTION',
			PLACE_NEW_BID: 'PLACE_NEW_BID'
		};
	}

	getAllAuctions() {
		Auction.find({}, (err, auctions) => {
            if (err) {throw new Error(err);}
            this.emit(this.events.GET_ALL_AUCTIONS, auctions);
        });
	};

	getAuctionById(id) {
		Auction.findById(id, (err, auction) => {
            if (err) {throw new Error(err);}
            this.emit(this.events.GET_AUCTION_BY_ID, auction);
        });
	};

	getAuctionWinner(auctionId) {
		Auction.findById(auctionId, (err, auction) => {
			if (err) {throw new Error(err);}
			Customer.findOne({ _id: auction.auctionWinner }, (err, customer) => {
				this.emit(this.events.GET_AUCTION_WINNER, customer);
			});
        });
	};

	createAuction(auction) {
		Auction.create(auction, err => {
            if (err) {throw new Error(err);}
            this.emit(this.events.CREATE_AUCTION, auction);
        });
	};

	getAuctionBidsWithinAuction(auctionId) {
		// Your implementation goes here
        // Should emit a GET_AUCTION_BIDS_WITHIN_AUCTION event when the data is available
	};

	placeNewBid(_auctionId, _customerId, _price) {
		AuctionBid.create({
			auctionId: _auctionId,
			customerId: _customerId,
			price: _price
		}, (err, auctionBid) => {
            if (err) {throw new Error(err);}
            this.emit(this.events.PLACE_NEW_BID, auctionBid);
        });
	};
};

module.exports = AuctionService;
