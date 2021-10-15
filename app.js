const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express()
require('dotenv').config()
app.use(express.static('public'))

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

app.listen('3000',()=>{
    console.log('listening at 3000')
})    
  
app.get('/',(req,res)=>{
    res.render('pages/index.ejs')
})
app.get('/artist-search',(req,res)=>{
spotifyApi 
 .searchArtists(req.query.artist)  
 .then(data=>{
     console.log(data.body.artists.items[0].images)
     res.render('pages/artist.ejs',{data:data.body.artists.items})
 })
 .catch(err => console.log(err));
 
})


  app.get('/albums/:id',(req,res)=>{
    spotifyApi 
    .getArtistAlbums(req.params.id)  
    .then(data=>{
        console.log(data.body.items)
        res.render('pages/albums.ejs',{data:data.body.items})
    })
    .catch(err => console.log(err));
  })


  app.get('/tracks/:id',(req,res)=>{
    spotifyApi 
    .getAlbumTracks(req.params.id)  
    .then(data=>{
        console.log(data.body.items)
        res.render('pages/tracks.ejs',{data:data.body.items})
    })
    .catch(err => console.log(err));
  })