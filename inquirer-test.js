var request = require('request');
var prompt = require('prompt');
var inquirer = require('inquirer');
var colors = require('colors');
var redditFunctions = require('./library/basicfunctions.js');
var getHomepage = redditFunctions.getHomepage;
var getSubreddit = redditFunctions.getSubreddit;
var getSortedHomepage = redditFunctions.getSortedHomepage;
var getSubreddits = redditFunctions.getSubreddits;
var getSortedSubreddit = redditFunctions.getSortedSubreddit;
var imageToAscii = require("image-to-ascii");

var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];


function mainMenu() {
  inquirer.prompt( {
    
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: menuChoices
    
  }).then(
    function(answers) {
      var choice = answers.menu;
      if (choice === 'HOMEPAGE') {
        getHomepage(function(err, res) {
          if (err) {
            console.log(err)
            
          }
          else {
            var finalHomePage = res.map(function (ele) {
              return {
                
                "Title" : ele.data.title, 
                "Link" :  ele.data.url, 
                "Upvotes" : ele.data.ups,
                "User" : ele.data.author
              };
            });
            
            finalHomePage.forEach(function(ele){
              console.log('\n');
              console.log('TITLE: ' + ele.Title.red);
              console.log('URL: ' + ele.Link.underline.blue);
              console.log('VOTES: ' + (ele.Upvotes).toString().green.bold);
              console.log('USERNAME: ' + ele.User.yellow);
              console.log('\n');   
            });
          }
        });
        
        mainMenu(); 
        
      }
      else if (choice === 'SUBREDDIT') {
        prompt.get('enter_a_subreddit', function(err, answer) {
          if (err) {
              console.log(err);
            
          }
          else {
            getSubreddit(answer.enter_a_subreddit, function(err, res) { 
                if (err) {
                  console.log(err);
                  
                }
                else {
                  var theSubreddit = res.map(function (ele) {
                    return {
                      "Title" : ele.data.title, 
                      "Link" :  ele.data.url, 
                      "Upvotes" : ele.data.ups,
                      "User" : ele.data.author
                    };
                  });
                  
                  theSubreddit.forEach(function(ele){
                    console.log('\n');
                    console.log('TITLE: ' + ele.Title.red);
                    console.log('URL: ' + ele.Link.underline.blue);
                    console.log('VOTES: ' + (ele.Upvotes).toString().green.bold);
                    console.log('USERNAME: ' + ele.User.yellow);
                    console.log('\n');
                  })
                  
                }
              
            });
          
          }
          
        });
        
      }
      else if (choice === 'SUBREDDITS') {
             getSubreddits(function(err, res) {
               if (err) {
                 console.log(err);
                 
               }
               else {
                 var listSubreddits = res.map(function(post1){
                   return {
                     name: post1.data.title,
                     value: post1.data.display_name
                     
                   }
                   
                 })
  
              inquirer.prompt({
                 type: 'list',
                 name: 'top25',
                 choices: listSubreddits,
                 message: 'Choose a subreddit'
             }).then(
                 function(theChoice) {
                     var subredditPosts = theChoice.top25;
                     getSubreddit(subredditPosts, function(err, res) {
                         
                         if (err) {
                             console.log(err);
                         }
                         else {
                              var theSubredditEdited = res.map(function (ele) {
                                return {
                                  "Title" : ele.data.title, 
                                  "Link" :  ele.data.url, 
                                  "Upvotes" : ele.data.ups,
                                  "User" : ele.data.author
                                };
                              });
                              theSubredditEdited.forEach(function(ele){
                                
                                console.log('\n');
                                console.log('TITLE: ' + ele.Title.red);
                                console.log('URL: ' + ele.Link.underline.blue);
                                console.log('VOTES: ' + (ele.Upvotes).toString().green.bold);
                                console.log('USERNAME: ' + ele.User.yellow);
                                console.log('\n');
                                
                              });
                           
                         }
                       
                     })
                   
                 })
                 
               }
               
          });
      }
  });
}
  
mainMenu();



// imageToAscii("http://beta.ltgov.bc.ca/lg/honours-awards/heraldry/shields/images/shields-lg/QueenElizabethll1959-lg.jpg", (err, converted) => {
//     console.log(err || converted);
// });



