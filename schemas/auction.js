const Schema = require('mongoose').Schema;

module.exports = new Schema({
    artId: { type: Schema.Types.ObjectId, required: true, ref: 'Art' },
    minumumPrice: { type: Number, required: true, default: 1000},
    endDate: { type: Date, required: true},
    auctionWinner: { type: Schema.Types.ObjectId, ref: 'Artist' }
});