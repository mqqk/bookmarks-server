const BookmarksService = {
    getBookmarks(knex) {
        return knex.select('*').from('bookmarks')
    },
    addBookmark(knex, newBookmark) {
        return knex
            .insert(newBookmark)
            .into('bookmarks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getBookmark(knex, id){
        return knex.from('bookmarks').select('*').where('id',id).first()
    },
    deleteBookmark(knex,id){
        return knex.from('bookmarks').where({id}).delete()
    },


}

module.exports = BookmarksService