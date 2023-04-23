const fs = require('node:fs');
const path = require('node:path');
const axios = require('axios');

const url = 'https://chromium.googlesource.com/chromium/src/+refs';
const regex = /(\d{1,3}\.\d{1,3}\.\d{1,5}\.\d{1,3})/gi;

axios
  .get(url)
  .then((response) => {
    let matches = response.data.match(regex);

    matches = matches.filter((version) => {
      const [major] = version.split('.');

      return major > 101;
    });

    matches = matches.filter(
      (match, index, array) => array.indexOf(match) === index
    );

    matches = matches.filter((_, index) => index % 2 === 0);

    const record = matches.reduce((acc, version) => {
      const key = version.split('.')[0];

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(version);
      return acc;
    }, {});

    fs.writeFileSync(
      path.resolve(__dirname, '../src/assets/chromium-versions.json'),
      JSON.stringify(record)
    );
  })
  .catch((error) => {
    console.error(`Error fetching ${url}: ${error.message}`);
  });
