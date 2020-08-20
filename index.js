const core = require("@actions/core");
const axios = require("axios");
const size = core.getInput("news");

if (size > 100) {
  core.setFailed(
    "More than 100 news are not allowed. Please set a smaller number of news count."
  );
}

//top news
const hackernewsURL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

async function run() {
  const temp = [];
  let msg = "";
  const newsContent = obj => {
    temp.push(obj);
    msg += `[${temp.length}] ${obj.title} \n* link : ${obj.link} \n* details : ${obj.detail} \n\n`;

    if (temp.length === size) {
      try {
        core.setOutput("Top 5 news on HackerNews", msg);
      } catch (error) {
        core.setFailed(error);
      }
    }
  };
  axios
    .get(hackernewsURL)
    .then(function(response) {
      response.data.slice(0, size).map(rs => {
        axios
          .get(
            `https://hacker-news.firebaseio.com/v0/item/${rs}.json?print=pretty`
          )
          .then(rs_response => {
            newsContent({
              title: rs_response.data.title,
              link: rs_response.data.url,
              detail: `https://news.ycombinator.com/item?id=${rs}`
            });
          });
      });
    })
    .catch(function(error) {
      core.setFailed(error.message);
    });
}

run();
