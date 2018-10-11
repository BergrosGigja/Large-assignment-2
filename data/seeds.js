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
    { name: 'Salvador Dali',
      nickname: 'Dalvador',
      address: 'Sunny State', 
      memberSince: Date.now()
    },
    { name: 'Hermann picasso',
      nickname: 'Hundurinn',
      address: 'Klakinn 5, 107 rvk', 
      memberSince: Date.now() },

    { name: 'Emil Kahlo',
      nickname: 'Street 5, Spain or Argentina',
      address: 'Unibrow', 
      memberSince: Date.now() },

    { name: 'Thorfinnur Van Gogh',
      nickname: 'Goggi Mega',
      address: 'Address numero 5, Netherlands', 
      memberSince: Date.now() },

    { name: 'Bob Ross',
      nickname: 'Meistari',
      address: 'Downingstreet 10, london', 
      memberSince: Date.now() }
], err => {
    if (err) { throw new Error(err); }
    bar.update(25);
    Artist.find({}, (err, artists) => {
        if (err) { throw new Error(err); }
        bar.update(35);
        Art.insertMany([
            {
                title: 'Painting of a mountain',
                artistId: getResourceIdByName(artists, 'name', 'Bob Ross'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Nice painting and a nicer man',
                isAuctionItem: false
            },
            {
                title: 'Painting of a bike',
                artistId: getResourceIdByName(artists, 'name', 'Hermann picasso'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Ugly painting do not buy this' ,
                isAuctionItem: false
            },
            {
                title: 'Painting of a store',
                artistId: getResourceIdByName(artists, 'name', 'Hermann picasso'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Nice painting',
                isAuctionItem: false
            },
            {
                title: 'Painting of a French Woman',
                artistId: getResourceIdByName(artists, 'name', 'Emil Kahlo'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Ok painting',
                isAuctionItem: false
            },
            {
                title: 'Painting of a Big Ben',
                artistId: getResourceIdByName(artists, 'name', 'Emil Kahlo'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Big Ben with unibrows',
                isAuctionItem: false
            },
            {
                title: 'Painting of a lizard',
                artistId: getResourceIdByName(artists, 'name', 'Thorfinnur Van Gogh'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Cool Painting',
                isAuctionItem: false
            },
            {
                title: 'Painting of a me',
                artistId: getResourceIdByName(artists, 'name', 'Thorfinnur Van Gogh'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Cool Painting',
                isAuctionItem: false
            },
            {
                title: 'Painting of a University of Reykjavik',
                artistId: getResourceIdByName(artists, 'name', 'Thorfinnur Van Gogh'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Cool Painting',
                isAuctionItem: false
            },
            {
                title: 'Painting of a tree',
                artistId: getResourceIdByName(artists, 'name', 'Thorfinnur Van Gogh'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Cool stuff',
                isAuctionItem: false
            },
            {
                title: 'Painting of an orange',
                artistId: getResourceIdByName(artists, 'name', 'Salvador Dali'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Yeahhhh, this is a description',
                isAuctionItem: false
            },
            {
                title: 'Painting of a chair',
                artistId: getResourceIdByName(artists, 'name', 'Salvador Dali'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Yeahhhh, this is a description',
                isAuctionItem: false
            },
            {
                title: 'Title painting yeahhh',
                artistId: getResourceIdByName(artists, 'name', 'Salvador Dali'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Yeahhhh, this is a description',
                isAuctionItem: false
            },
            {
                title: 'Painting of a cat',
                artistId: getResourceIdByName(artists, 'name', 'Salvador Dali'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Yeahhhh, this is a description',
                isAuctionItem: false
            },
            {
                title: 'Painting of a dog',
                artistId: getResourceIdByName(artists, 'name', 'Salvador Dali'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'Yeahhhh, this is a description',
                isAuctionItem: false
            },
            {
                title: 'Painting of some stuff',
                artistId: getResourceIdByName(artists, 'name', 'Salvador Dali'),
                date: Date.now(),
                images: 'https://i.ebayimg.com/images/g/hQwAAOSwy~BaNBuc/s-l640.jpg',
                description: 'DEEEEscription of a painting :) ',
                isAuctionItem: false
            }
        ], err => {
            if (err) { throw new Error(err); }
            bar.update(65);
            Art.find({}, (err, arts) => {
                if (err) { throw new Error(err); }
                bar.update(80);
                Customer.insertMany([
                    {
                        name: 'Mr Big Bucks',
                        username: 'Biggie',
                        email: 'Big@bucks.com',
                        address: 'Big street 5'
                    },
                    {
                        name: 'Mr Big Spender',
                        username: 'spender',
                        email: 'spender@bucks.com',
                        address: 'spender street 5'
                    },
                    {
                        name: 'Money man',
                        username: 'MoneyIsKey',
                        email: 'Money@bucks.com',
                        address: 'Moneystreet 5'
                    },
                    {
                        name: 'Mr capitalism guy',
                        username: 'caps',
                        email: 'caps@bucks.com',
                        address: 'caps street 5'
                    },
                    {
                        name: 'Mr Money talks',
                        username: 'talker',
                        email: 'talk@bucks.com',
                        address: 'talk street 5'
                    },
                    {
                        name: 'Bjorgolfur Thor',
                        username: 'Bjoggi',
                        email: 'bjoggi@bucks.com',
                        address: 'bjoggi street 5'
                    } ], err => {
                        if (err) { throw new Error(err); }
                        bar.update(65);
                        Customer.find({}, (err, customers) => {
                            if (err) { throw new Error(err); }
                            bar.update(80);
                            Auction.insertMany([
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Painting of a mountain'),
                                    minimumPrice: 1000,
                                    endDate: Date.now(),
                                    auctionWinner: getResourceIdByName(customers, 'name', 'Bjorgolfur Thor')
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Painting of a cat'),
                                    minimumPrice: 1000,
                                    endDate: Date.now(),
                                    auctionWinner: getResourceIdByName(customers, 'name', 'Bjorgolfur Thor')
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Painting of a French Woman'),
                                    minimumPrice: 1000,
                                    endDate: Date.now(),
                                    auctionWinner: getResourceIdByName(customers, 'name', 'Mr Big Spender')
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Painting of a lizard'),
                                    minimumPrice: 1000,
                                    endDate: Date.now(),
                                    auctionWinner: getResourceIdByName(customers, 'name', 'Mr Money talks')
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Painting of some stuff'),
                                    minimumPrice: 1000,
                                    endDate: Date.now(),
                                    auctionWinner: getResourceIdByName(customers, 'name', 'Mr Money talks')
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Painting of a dog'),
                                    minimumPrice: 1000,
                                    endDate: Date.now(),
                                    auctionWinner: getResourceIdByName(customers, 'name', 'Mr Big Bucks')
                                },
                                {
                                    artId: getResourceIdByName(arts, 'title', 'Painting of an orange'),
                                    minimumPrice: 1000,
                                    endDate: Date.now(),
                                    auctionWinner: getResourceIdByName(customers, 'name', 'Mr capitalism guy')
                                },
                            ],err => {
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
