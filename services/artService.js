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
            if(err) {throw new Error(err);}
            this.emit(this.events.GET_ALL_ARTS, arts);
        });
    };

    getArtById(id) {
        Art.findById(id, (err, art) => {
            if (err) {throw new Error(err);}
            this.emit(this.events.GET_ART_BY_ID, art);
        });
    };

    createArt(art) {
        Art.create(art, err => {
            if (err) {throw new Error(err);}
            this.emit(this.events.CREATE_ART, art);
        });
    };
};

module.exports = ArtService;
