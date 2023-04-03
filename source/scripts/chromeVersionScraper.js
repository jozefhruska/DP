const axios = require('axios');

const url = 'https://chromium.googlesource.com/chromium/src/+refs';
const regex = /(\d{1,3}\.\d{1,3}\.\d{1,5}\.\d{1,3})/gi;

axios
  .get(url)
  .then((response) => {
    let matches = response.data.match(regex);

    matches = matches.filter((version) => {
      const [major] = version.split('.');

      return major > 90;
    });

    matches = matches.filter(
      (match, index, array) => array.indexOf(match) === index
    );

    matches = matches.filter((_, index) => index % 5 === 0);

    console.log(matches);
  })
  .catch((error) => {
    console.error(`Error fetching ${url}: ${error.message}`);
  });
