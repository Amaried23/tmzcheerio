var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");

// This function will scrape the NYTimes website
var scrape = function() {
  // Scrape the NYTimes website
  return axios.get("http://www.tmz.com/?adid=TMZ_Web_Nav_News").then(function(res) {
    var $ = cheerio.load(res.data);
    //console.log(res.data)
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that has the "theme-summary" class
    // (i.e, the section holding the articles)
    $(".news").each(function(i, element) {
      // In each .theme-summary, we grab the child with the class story-heading
      
      // Then we grab the inner text of the this element and store it
      // to the head variable. This is the article headline
      var head = $(element).children("a").children("h1").children("span").text();

      // Grab the URL of the article
      var url = $(element).children().attr("href");

      // Then we grab any children with the class of summary and then grab it's inner text
      // We store this to the sum variable. This is the article summary
      var sum = $(element).children("div.article-content").children("p").text();
      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

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