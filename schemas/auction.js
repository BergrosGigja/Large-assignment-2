const Schema = require('mongoose').Schema;

module.exports = new Schema({
    artId: { type: Schema.Types.ObjectId, required: true, ref: 'Art' },
    minumumPrice: { type: Number, required: true },
    endDate: { type: Date, required: true},
    auctionWinner: { type: Schema.Types.ObjectId, required: true, ref: 'Artist' }
});