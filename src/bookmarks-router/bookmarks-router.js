const express = require('express')
const logger = require('../logger')
const { v4: uuid } = require('uuid')
const { bookmarks } = require('../store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()


bookmarksRouter
    .route('/')
    .get((req,res) =>{
    res.send(bookmarks)
})
    .post(bodyParser, (req,res) => {
        const { title, url, description, rating } = req.body;

        if(!title) {
            logger.error('Title is required');
            return res
                .status(400)
                .send('Invalid Title')
        }

        if(!url) {
            logger.error('URL is required');
            return res
                .status(400)
                .send('Invalid URL')
        }

        if(!description) {
            logger.error('Description Required');
            return res
                .status(400)
                .send('Invalid Description')
        }

        if(!rating) {
            logger.error('Rating Required');
            return res
                .status(400)
                .send('Invalid Rating')
        }

        // if(url.length > 0) {
        //     // let valid = true;
        //     bookmarks.forEach(bookmark => bookmark.url === url)
        // }

        const id = uuid();

        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        }

        bookmarks.push(bookmark);

        logger.info(`Bookmark with id ${id} created`)
        
        res
            .status(201)
            .location(`http://localhost:8000/${id}`)
            .json({id})
    })


module.exports = bookmarksRouter