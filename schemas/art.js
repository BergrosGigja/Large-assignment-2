const Schema = require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

module.exports = new Schema({
    title: { type: String, required: true },
    artistId: { type: ObjectId, required: true },
    date: { type: Date, required: true, default: Date.now },
    images: { type: [String], required: false},
    description: { type: String, required: false },
    isAuctionItem: { type: Boolean, required: false, default: false }
});
