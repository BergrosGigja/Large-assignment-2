const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const port = 3000;
const ArtistService = require('./services/artistService');
const ArtService = require('./services/artService');
const AuctionService = require('./services/auctionService');

router.get('/arts', (req, res) => {
    const artService = new ArtService();

    artService.on(artService.events.GET_ALL_ARTS, data => {
        res.json(data);
    });

    artService.getAllArts();
});

router.get('/arts/:id', (req, res) => {
    const artService = new ArtService();
    const {id} = req.params;

    artService.on(artService.events.GET_ART_BY_ID, data => {    
        res.json(data);
    });

    artService.getArtById(id);
});

router.post('/arts', (req, res) => {
    const {body} = req;
    console.log(body);
    const artService = new ArtService();

    artService.on(artService.events.CREATE_ART, data => {
        res.json(data);
    });

    artService.createArt(body);
});

router.get('/artists', (req, res) => {
    const artistService = new ArtistService();

    artistService.on(artistService.events.GET_ALL_ARTISTS, data => {
        res.json(data);
    });

    artistService.getAllArtists();
});

router.get('/artists/:id', (req, res) => {
    const {id} = req.params;
    const artistService = new ArtistService();

    artistService.on(artistService.events.GET_ARTIST_BY_ID, data => {
        res.json(data);
    });

    artistService.getArtistById(id);
});

router.post('/artists', (req, res) => {
    const {body} = req;
    const artistService = new ArtistService();

    artistService.on(artistService.events.CREATE_ARTIST, data => {
        res.json(data);
    });

    artistService.createArtist(body);
});

router.get('/customers', (req, res) => {
    //TODO: implement get all customers
});

router.get('/customers/:id', (req, res) => {
    //TODO: implement get customers by id
});

router.post('/customers', (req, res) => {
    //TODO: implement create new customer
});

router.get('/customers/:id/auction-bids', (req, res) => {
    //TODO: implement get all auction bids associated with a customer
});

router.get('/auctions', (req, res) => {
    const auctionService = new AuctionService();

    auctionService.on(auctionService.events.GET_ALL_AUCTIONS, data => {
        res.json(data);
    });

    auctionService.getAllAuctions();
});

router.get('/auctions/:id', (req, res) => {
    const {id} = req.params;
    const auctionService = new AuctionService();

    auctionService.on(auctionService.events.GET_AUCTION_BY_ID, data => {
        res.json(data);
    });

    auctionService.getAuctionById(id);
});

router.get('/auctions/:id/winner', (req, res) => {
    const {id} = req.params;
    const auctionService = new AuctionService();

    auctionService.on(auctionService.events.GET_AUCTION_WINNER, data => {
        res.json(data);
    });

    auctionService.getAuctionWinner(id);
});

router.post('/auctions', (req, res) => {
    const {body} = req;
    const auctionService = new AuctionService();

    auctionService.on(auctionService.events.CREATE_AUCTION, data => {
        res.json(data);
    });

    auctionService.createAuction(body);
});

router.get('/auctions/:id/bids', (req, res) => {
    //TODO: implement get all bids for a certain auction
});

router.post('/auctions/:id/bids', (req, res) => {
    //TODO: implement create new auction bid
});

app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
