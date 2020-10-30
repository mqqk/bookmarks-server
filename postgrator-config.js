require ('dotenv').config();

module.exports - {
    "migrationDirectory":"migrations",
    "driver":"pg",
        "connectionString":(process.env.NODDE_ENV === 'test')
            ? process.env.TEST_DB_URL
            : process.env.DB_URL,
}