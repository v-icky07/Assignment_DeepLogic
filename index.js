const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();


app.get('/getTimeStories', (req, res) => {
    axios.get('https://time.com/').then(response => {
        const $ = cheerio.load(response.data);

        // Find the div with class 'partial latest-stories'
        const div = $('.partial.latest-stories');

        // Find the ul tag inside the div
        const ul = div.find('ul');

        // Select all li elements within the ul
        const items = ul.find('li.latest-stories__item');

        // Extract titles and links
        const stories = items.map((index, element) => {
            const title = $(element).find('h3').text().trim();
            const link = $(element).find('a').attr('href');
            return { title, link };
        }).get();

        res.json({ stories });
    }).catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch stories' });
    });
});

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});
