var request = require('request');
var prompt = require('prompt');
var inquirer = require('inquirer');
var colors = require('colors');


//BASIC PARSING FUNCTION :)
function requestJson(url, callback) {
  request(url, function(err, response) {
    if (err) {
      callback(err);
      
    }
    else {
      try {
        var parsed = JSON.parse(response.body);
        callback(null, parsed);
        
      }
      catch (err) {
        callback(err);
      }
    }
  });
}


//GET HOMEPAGE
function getHomepage(callback) {
  requestJson('https://www.reddit.com/.json', function(err, res) {
    if (err) {
      callback(err);
      
    }
    else {
      var redditHome = res.data.children;
      callback(null, redditHome);
    }
  });
}


//SORTED HOMEPAGE ex.'TOP'
function getSortedHomepage(sortingMethod, callback) {
  requestJson('https://www.reddit.com/' + sortingMethod + ".json", function(err, res) {
    if (err) {
      callback(err);
      
    }
    else {
        var redditSub = res.data.children;
        callback(null, redditSub);
    }
  });
}




//GET SUBREDDIT '/r'
function getSubreddit(subreddit, callback) {
  requestJson('https://www.reddit.com/r/' + subreddit + ".json", function(err, res) {
    if (err) {
      callback(err);
      
    }
    else {
      var theData = res.data.children;
      
      if(theData.length === 0 ){
        callback("This subreddit doesn't exist!", null );
        
      }
      else {
        callback(null, theData);
      }
    }
  });
}



//SORTED SUBREDDITS ex.'TOP'
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  requestJson('https://www.reddit.com/r' + subreddit + "/" + sortingMethod + ".json", function(err, res) {
    
    if (err) {
      callback(err);
      
    }
    else {
      var redditSubSorted = res.data.children;
      callback(null, redditSubSorted);
    }
  });
}



//TOP 25 SUBREDDITS
function getSubreddits(callback) {
  requestJson("https://www.reddit.com/subreddits.json", function(err, res) {
    
    if (err) {
      callback(err);
      
    }
    else {
      var redditSubs = res.data.children;
      callback(null, redditSubs);
    }
  });
}


// Export the API
module.exports = {

  requestJson: requestJson,

  getHomepage: getHomepage,

  getSortedHomepage: getSortedHomepage,

  getSubreddit: getSubreddit,

  getSortedSubreddit: getSortedSubreddit,

  getSubreddits: getSubreddits,

};



