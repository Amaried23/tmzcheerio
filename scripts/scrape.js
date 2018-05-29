var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");

// This function will scrape the TMZ website
var scrape = function() {
  // Scrape the TMZ website
  return axios.get("http://www.tmz.com/?adid=TMZ_Web_Nav_News").then(function(res) {
    var $ = cheerio.load(res.data);
  
    // Make an empty array to save our article info
    var articles = [];


    $(".news").each(function(i, element) {

      var head = $(element).children("a").children("h1").children("span").text();

      // Grab the URL of the article
      var url = $(element).children().attr("href");

     
      var sum = $(element).children("div.article-content").children("p").text();
      
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object and push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
        console.log(dataToAdd);
        console.log(articles);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;