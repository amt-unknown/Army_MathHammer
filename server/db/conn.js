// database connection cofig
const { MongoClient, MongoDBNamespace } = require('mongodb');
const Db = process.env.COMPASS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

var _db; 

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db("Army_MathHammer");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        })
    },

    getDb: function () {
        return _db;
    },
};