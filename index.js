const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const port = 3000;
const ArtistService = require('./services/artistService');
const ArtService = require('./services/artService');
const AuctionService = require('./services/auctionService');
const CustomerService = require('./services/customerService');

router.get('/arts', (req, res) => {
    const artService = new ArtService();

    artService.on('error', err => res.status(err.statusCode).send(err.message))

    artService.on(artService.events.GET_ALL_ARTS, data => {
        res.json(data);
    });

    artService.getAllArts();
});

router.get('/arts/:id', (req, res) => {
    const artService = new ArtService();
    const {id} = req.params;

    artService.on('error', err => res.status(err.statusCode).send(err.message))
  
    artService.on(artService.events.GET_ART_BY_ID, data => {    
        res.json(data);
    });

    artService.getArtById(id);
});

router.post('/arts', (req, res) => {
    const {body} = req;

    const artService = new ArtService();

    artService.on('error', err => res.status(err.statusCode).send(err.message))

    artService.on(artService.events.CREATE_ART, data => {
        res.json(data);
    });

    artService.createArt(body);
});

router.get('/artists', (req, res) => {
    const artistService = new ArtistService();

    artistService.on('error', err => res.status(err.statusCode).send(err.message))

    artistService.on(artistService.events.GET_ALL_ARTISTS, data => {
        res.json(data);
    });

    artistService.getAllArtists();
});

router.get('/artists/:id', (req, res) => {
    const {id} = req.params;
    const artistService = new ArtistService();

    artistService.on('error', err => res.status(err.statusCode).send(err.message))

    artistService.on(artistService.events.GET_ARTIST_BY_ID, data => {
        res.json(data);
    });

    artistService.getArtistById(id);
});

router.post('/artists', (req, res) => {
    const {body} = req;
    const artistService = new ArtistService();

    artistService.on('error', err => res.status(err.statusCode).send(err.message))

    artistService.on(artistService.events.CREATE_ARTIST, data => {
        res.json(data);
    });

    artistService.createArtist(body);
});

router.get('/customers', (req, res) => {
    const customerService = new CustomerService();

    customerService.on('error', err => res.status(err.statusCode).send(err.message))

    customerService.on(customerService.events.GET_ALL_CUSTOMERS, data => {
        res.json(data);
    });

    customerService.getAllCustomers();
});

router.get('/customers/:id', (req, res) => {
    const {id} = req.params;
    const customerService = new CustomerService();
    
    customerService.on('error', err => res.status(err.statusCode).send(err.message))

    customerService.on(customerService.events.GET_CUSTOMER_BY_ID, data => {
        res.json(data);
    });

    customerService.getCustomerById(id);
});

router.post('/customers', (req, res) => {
    const {body} = req;
    const customerService = new CustomerService();

    customerService.on('error', err => res.status(err.statusCode).send(err.message))

    customerService.on(customerService.events.CREATE_CUSTOMER, data => {
        res.json(data);
    });

    customerService.createCustomer(body);
});

router.get('/customers/:id/auction-bids', (req, res) => {
    const {id} = req.params;
    const customerService = new CustomerService();

    customerService.on('error', err => res.status(err.statusCode).send(err.message))

    customerService.on(customerService.events.GET_CUSTOMER_AUCTION_BIDS, data => {
        res.json(data);
    });

    customerService.getCustomerAuctionBids(id);
});

router.get('/auctions', (req, res) => {
    const auctionService = new AuctionService();

    auctionService.on('error', err => res.status(err.statusCode).send(err.message))

    auctionService.on(auctionService.events.GET_ALL_AUCTIONS, data => {
        res.json(data);
    });

    auctionService.getAllAuctions();
});

router.get('/auctions/:id', (req, res) => {
    const {id} = req.params;
    const auctionService = new AuctionService();

    auctionService.on('error', err => res.status(err.statusCode).send(err.message))

    auctionService.on(auctionService.events.GET_AUCTION_BY_ID, data => {
        res.json(data);
    });

    auctionService.getAuctionById(id);
});

router.get('/auctions/:id/winner', (req, res) => {
    const {id} = req.params;
    const auctionService = new AuctionService();

    auctionService.on('error', err => res.status(err.statusCode).send(err.message))

    auctionService.on(auctionService.events.GET_AUCTION_WINNER, data => {
        res.json(data);
    });

    auctionService.getAuctionWinner(id);
});

router.post('/auctions', (req, res) => {
    const {body} = req;
    const artId = req.body.artId;
    
    const auctionService = new AuctionService();

    auctionService.on('error', err => res.status(err.statusCode).send(err.message))

    auctionService.on(auctionService.events.CREATE_AUCTION, data => {
        res.json(data);
    });

    auctionService.createAuction(body, artId);
});

router.get('/auctions/:id/bids', (req, res) => {
    const {id} = req.params;
    const auctionService = new AuctionService();

    auctionService.on('error', err => res.status(err.statusCode).send(err.message))

    auctionService.on(auctionService.events.GET_AUCTION_BIDS_WITHIN_AUCTION, data => {
        res.json(data);
    });

    auctionService.getAuctionBidsWithinAuction(id);
});

router.post('/auctions/:id/bids', (req, res) => {
    const {id} = req.params;
    const customerId = req.body.customerId;
    const price = req.body.price;
    const auctionService = new AuctionService();

    auctionService.on('error', err => res.status(err.statusCode).send(err.message))

    auctionService.on(auctionService.events.PLACE_NEW_BID, data => {
        res.json(data);
    });

    auctionService.placeNewBid(id, customerId, price);
});

app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
