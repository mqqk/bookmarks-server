const express = require('express')
const logger = require('../logger')
// const { bookmarks } = require('../store')
const bookmarkRouter = express.Router()
const BookmarksService = require('../bookmarks_service')

bookmarkRouter
    .route('/:id')
    .get((req,res) => {
        const { id } = req.params;
        
        // const bookmark = bookmarks.find(bookmark => bookmark.id === id)
        BookmarksService.getBookmark(req.app.get('db'),id)
            .then(bookmark => {

        if(!bookmark) {
            logger.error(`Bookmark with id ${id} not found `);
            return res
                .status(404)
                .send('Bookmark not found')
        }
        
        res.json(bookmark)
        })
    })

    .delete((req,res) => {
        const { id } = req.params;

        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id);

        if(bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found`);
            return res
                .status(404)
                .send('Bookmark not found')
        }

        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id ${id} deleted.`);
        res
            .status(204)
            .end()
    })

    module.exports = bookmarkRouter