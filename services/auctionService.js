const EventEmitter = require('events');
const { Art, Auction, Customer, AuctionBid } = require('../data/db');

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
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else if (auctions.length == 0) { this.emit('error', { statusCode: 404, message: 'Not found' }); }
            else { this.emit(this.events.GET_ALL_AUCTIONS, auctions); }
        });
	};

	getAuctionById(id) {
		Auction.findById(id, (err, auction) => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else if (!auction) { this.emit('error', { statusCode: 404, message: 'Auction Not found' }); }
            else { this.emit(this.events.GET_AUCTION_BY_ID, auction); }
        });
	};

	getAuctionWinner(_auctionId) {
		Auction.findById(_auctionId, (err, auction) => {
			if (err) { this.emit('error', { statusCode: 500, message: err }); }
			else if (!auction) { this.emit('error', { statusCode: 404, message: 'Auction Not found' }); }
			else if (auction.endDate > Date.now()) { this.emit('error', { statusCode: 409, message: 'Auction has not ended' }); }
			else { 
				AuctionBid.find({auctionId: _auctionId}, (err, auctionBids) => {
					if (err) { this.emit('error', { statusCode: 500, message: err }); }
					else if (auctionBids.length == 0) { this.emit('error', { statusCode: 200, message: 'No bids have been made' }); }
					else { 
						Customer.findOne({ _id: auction.auctionWinner }, (err, customer) => {
							this.emit(this.events.GET_AUCTION_WINNER, customer); 
						}); 
					}
				});
			}
        });
	};

	createAuction(auction, _artId) {
		Art.findById(_artId, (err, art) => {
			if (err) { this.emit('error', { statusCode: 500, message: err }); }
			else if (!art) { this.emit('error', { statusCode: 404, message: 'Art Not found' }); }
			else if (!art.isAuctionItem) {this.emit('error', { statusCode: 412, message: 'This art is not an auction item' }); }
			else {
				Auction.create(auction, err => {
					if (err) { this.emit('error', { statusCode: 500, message: err }); }
					else { this.emit(this.events.CREATE_AUCTION, auction); }
				});
			}
		});
		
	};

	getAuctionBidsWithinAuction(_auctionId) {
		Auction.findById(_auctionId, (err, auction) => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
			else if (!auction) { this.emit('error', { statusCode: 404, message: 'Auction Not found' }); }
			else {
				AuctionBid.find({auctionId: _auctionId}, (err, auctionBids) => {
					if (err) { this.emit('error', { statusCode: 500, message: err }); }
					else if (auctionBids.length == 0) { this.emit('error', { statusCode: 404, message: 'No bids have been made' }); }
					else { this.emit(this.events.GET_AUCTION_BIDS_WITHIN_AUCTION, auctionBids); }
				});
			}
		});
	}

	placeNewBid(_auctionId, _customerId, _price) {
		Auction.findById(_auctionId, (err, auction) => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
			else if (!auction) { this.emit('error', { statusCode: 404, message: 'Auction Not found' }); }
			else if (auction.endDate < Date.now()) { this.emit('error', { statusCode: 403, message: 'Auction has ended'}); }
			else if (_price <= auction.minimumPrice) { this.emit('error', { statusCode: 412, message: 'Please place a bid higher than the minimum price: ' + auction.minimumPrice }); }
			else {
				AuctionBid.find({auctionId: _auctionId}, (err, auctionBids) => {
					if (err) { this.emit('error', { statusCode: 500, message: err }); }
					else {
						var highest;
						auctionBids.forEach(bid => {
							highest = bid.price;
						});
						if(_price <= highest) { this.emit('error', { statusCode: 412, message: 'Please place a bid higher than ' + highest }); }
						else {
							Customer.findById(_customerId, (err, customer) => {
								if (err) { this.emit('error', { statusCode: 500, message: err }); }
								else if (!customer) { this.emit('error', { statusCode: 404, message: 'Customer Not found' }); }
								else {
									AuctionBid.create({
										auctionId: _auctionId,
										customerId: _customerId,
										price: _price
									}, (err, auctionBid) => {
										if (err) { this.emit('error', { statusCode: 500, message: err }); }
										Auction.updateOne({_id: _auctionId}, {auctionWinner: _customerId}, (err, raw) => {
											if (err) { this.emit('error', { statusCode: 500, message: err }); }
										});
										this.emit(this.events.PLACE_NEW_BID, auctionBid);
									});
								}
							});
						}
					}
				});
				
			}
		});
	};
};

module.exports = AuctionService;
