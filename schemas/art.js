const Schema = require('mongoose').Schema;

module.exports = new Schema({
    title: { type: String, required: true },
    artistId: { type: Schema.Types.ObjectId, required: true, ref: 'Artist' },
    date: { type: Date, required: true, default: Date.now() },
    images: { type: [String], required: false},
    description: { type: String, required: false },
    isAuctionItem: { type: Boolean, required: false, default: false }
});
