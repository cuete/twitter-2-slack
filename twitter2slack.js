/*

Author: Alejandro Echeverria
Date: 04/06/2017
Description: Gets text string from slack and returns a random search result from twitter

*/

module.exports = (ctx, cb) => {
  var twitter = require('twit')
  var config = {
    consumer_key: ctx.secrets.consumer_key,
    consumer_secret: ctx.secrets.consumer_secret,
    access_token: ctx.secrets.access_token,
    access_token_secret: ctx.secrets.access_token_secret
  }
  
  var twitterClient = new twitter(config)

  var searchterm = '#covfefe' //default search term if input is null
  var randomize = require('randomatic') //used to generate a random int

  if (ctx.body.text !== '')
  {
    searchterm = ctx.body.text
  }
  
  twitterClient.get('search/tweets', { q: `${searchterm} since:2017-06-01`, count: 100 }, function(err, data, response) 
  { 
    console.log(data) 
    cb(null, { text: `Hello, @${ctx.body.user_name}! Here's your daily tweet about "${ctx.body.text}" \n\n ${data.statuses[randomize('0', 2)].text}` })
  })
  
}
