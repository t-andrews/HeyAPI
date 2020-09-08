module.exports = {
    knex: {
        client: "postgres",
        connection: process.env.DATABASE_URL,
        debug: false
    }
}
