const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const port = 3000;
const ArtistService = require('./services/artistService');
const ArtService = require('./services/artService')

app.get('/api/arts', (req, res) => {
    const artService = new ArtService();

    artService.on(artService.events.GET_ALL_ARTS, data => {
        res.json(data);
    });

    artService.getAllArts();
});

app.get('/api/arts/:id', (req, res) => {
    const artService = new ArtService();
    const {id} = req.params;

    artService.on(artService.events.GET_ART_BY_ID, data => {    
        res.json(data);
    });

    artService.getArtById(id);
});

app.post('/api/arts', (req, res) => {
    const {body} = req;
    const artService = new ArtService();

    artService.on(artService.events.CREATE_ART, data => {
        res.json(data);
    });

    artService.createArt(body);
});

app.get('/api/artists', (req, res) => {
    const artistService = new ArtistService();

    artistService.on(artistService.events.GET_ALL_ARTISTS, data => {
        res.json(data);
    });

    artistService.getAllArtists();
});

app.get('/api/artists/:id', (req, res) => {
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

app.get('/api/customers', (req, res) => {
    //TODO: implement get all customers
});

app.get('/api/customers/:id', (req, res) => {
    //TODO: implement get customers by id
});

app.post('/api/customers', (req, res) => {
    //TODO: implement create new customer
});

app.get('/api/customers/:id/auction-bids', (req, res) => {
    //TODO: implement get all auction bids associated with a customer
});

app.get('/api/auctions', (req, res) => {
    //TODO: implement get all auctions
});

app.get('/api/auctions/:id', (req, res) => {
    //TODO: implement get auction by id
});

app.get('/api/auctions/:id/winner', (req, res) => {
    //TODO: implement get winner of certain auction
});

app.post('/api/auctions', (req, res) => {
    //TODO: implement create new auction
});

app.get('/api/auctions/:id/bids', (req, res) => {
    //TODO: implement get all bids for a certain auction
});

app.post('/api/auctions/:id/bids', (req, res) => {
    //TODO: implement create new auction bid
});

app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
