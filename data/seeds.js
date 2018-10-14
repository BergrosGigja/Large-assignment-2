const { Art, Artist, Auction, AuctionBid, Customer, connection } = require('./db');
const cliProgress = require('cli-progress');

const getResourceIdByName = (resources, prop, value) => resources.find(elem => elem[prop] === value);
const bar = new cliProgress.Bar({}, cliProgress.Presets.rect);
bar.start(100, 0);

// Drop all collections before execution

Object.keys(connection.collections).forEach(collection => {
    if (collection === 'arts') { Art.collection.drop(); }
    if (collection === 'artists') { Artist.collection.drop(); }
    if (collection === 'auctions') { Auction.collection.drop(); }
    if (collection === 'auctionBids') { AuctionBid.collection.drop(); }
    if (collection === 'customers') { Customer.collection.drop(); }
});

Artist.insertMany([
    { name: 'Man Ray',
      nickname: 'Rayman',
      address: 'California 1', 
      memberSince: '2016-10-15T00:46:14.651Z'
    },
    { name: 'Pablo Picasso',
      nickname: 'Paco',
      address: 'Italystreet 12', 
      memberSince: Date.now() 
    },
    { name: 'Andy Warhol',
      nickname: 'Andy peacehol',
      address: 'Beverlyhills 90210', 
      memberSince: '2017-10-05T00:46:14.651Z'
    },
    { name: 'Salvador Dali',
      nickname: 'Sali',
      address: 'Helloworld 2', 
      memberSince: Date.now() 
    },
    { name: 'Simone Martini',
      nickname: 'Shaken not stirred',
      address: 'upstreet 900', 
      memberSince: Date.now() 
    }
], err => {
    if (err) { throw new Error(err); }
    bar.update(20);
    Artist.find({}, (err, artists) => {
        if (err) { throw new Error(err); }
        bar.update(30);
        Art.insertMany([
            {
                title: 'Is it a woman or a doge? 1',
                artistId: getResourceIdByName(artists, 'name', 'Man Ray'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting',
                isAuctionItem: true
            },
            {
                title: 'Is it a woman or a doge? 2',
                artistId: getResourceIdByName(artists, 'name', 'Man Ray'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: false
            },
            {
                title: 'Is it a woman or a doge? 3',
                artistId: getResourceIdByName(artists, 'name', 'Pablo Picasso'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: true
            },
            {
                title: 'Is it a woman or a doge? 4',
                artistId: getResourceIdByName(artists, 'name', 'Pablo Picasso'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: false
            },
            {
                title: 'Is it a woman or a doge? 5',
                artistId: getResourceIdByName(artists, 'name', 'Andy Warhol'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: true
            },
            {
                title: 'Is it a woman or a doge? 6',
                artistId: getResourceIdByName(artists, 'name', 'Andy Warhol'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: false
            },
            {
                title: 'Is it a woman or a doge? 7',
                artistId: getResourceIdByName(artists, 'name', 'Salvador Dali'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: true
            },
            {
                title: 'Is it a woman or a doge? 8',
                artistId: getResourceIdByName(artists, 'name', 'Salvador Dali'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: false
            },
            {
                title: 'Is it a woman or a doge? 9',
                artistId: getResourceIdByName(artists, 'name', 'Simone Martini'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: true
            },
            {
                title: 'Is it a woman or a doge? 10',
                artistId: getResourceIdByName(artists, 'name', 'Simone Martini'),
                date: Date.now(),
                images: 'https://pics.me.me/wow-much-painting-30018086.png',
                description: 'Confusing but nice painting' ,
                isAuctionItem: false
            }
        ], err => {
            if (err) { throw new Error(err); }
            bar.update(40);
            Art.find({}, (err, arts) => {
                if (err) { throw new Error(err); }
                bar.update(50);
                Customer.insertMany([
                    {
                        name: 'Mr Bill Gates',
                        username: 'Billi',
                        email: 'bill@bill.com',
                        address: 'high gates 56'
                    },
                    {
                        name: 'Jeff Bezos',
                        username: 'Jeffi B',
                        email: 'jeff@jeff.com',
                        address: 'spender street 5'
                    },
                    {
                        name: 'Amancio Ortega',
                        username: 'Ammi',
                        email: 'amancio@amancio.com',
                        address: 'manciostreet 80009'
                    },
                    {
                        name: 'Carlos Slim',
                        username: 'Slim shady',
                        email: 'carlos@carlos.com',
                        address: 'carlostreet 5'
                    },
                    {
                        name: 'Bernard Arnault',
                        username: 'Benni',
                        email: 'bernard@bernard.com',
                        address: 'thisstreet 6009'
                    } ], err => {
                        if (err) { throw new Error(err); }
                        bar.update(70);
                        Customer.find({}, (err, customers) => {
                            if (err) { throw new Error(err); }
                            bar.update(80);
                            Auction.insertMany([
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Is it a woman or a doge? 1'),
                                    minimumPrice: 1500,
                                    endDate: Date.now()
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Is it a woman or a doge? 3'),
                                    endDate: '2018-10-15T00:46:14.651Z'
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Is it a woman or a doge? 5'),
                                    minimumPrice: 6000,
                                    endDate: '2019-10-15T00:46:14.651Z'
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Is it a woman or a doge? 7'),
                                    endDate: '2018-11-15T00:46:14.651Z'
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Is it a woman or a doge? 9'),
                                    minimumPrice: 700,
                                    endDate: '2018-10-17T00:46:14.651Z'
                                } ],err => {
                                    if (err) { throw new Error(err); }
                                    bar.update(100);
                                    bar.stop();
                                    connection.close();
                                });
                        });
                    });
                });
            });
        });
});
