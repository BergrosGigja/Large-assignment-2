const EventEmitter = require('events');
const {Art} = require('../data/db')

class ArtService extends EventEmitter {
    constructor() {
        super();
        this.events = {
            GET_ALL_ARTS: 'GET_ALL_ARTS',
            GET_ART_BY_ID: 'GET_ART_BY_ID',
            CREATE_ART: 'CREATE_ART'
        };
    }
    getAllArts() {
        Art.find({}, (err, arts) => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else if (arts.length == 0) { this.emit('error', { statusCode: 404, message: 'Not found' }); }
            else { this.emit(this.events.GET_ALL_ARTS, arts); }
        });
    };

    getArtById(id) {
        Art.findById(id, (err, result) => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else if (!result) { this.emit('error', { statusCode: 404, message: 'Not found' }); }
            else { this.emit(this.events.GET_ART_BY_ID, result); }
        });
    };

    createArt(art) {
        Art.create(art, err => {
            if (err) { this.emit('error', { statusCode: 500, message: err }); }
            else { this.emit(this.events.CREATE_ART, art); }
        });
    };
};

module.exports = ArtService;
