"use strict";
const Mongoose = require("mongoose");
class DataAccess {
    constructor() {
        DataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstace)
            return this.mongooseInstace;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log('Connected to mongodb');
        });
        this.mongooseInstace = Mongoose.connect("mongodb://localhost:27017/authbd001");
        return this.mongooseInstace;
    }
}
DataAccess.connect();
module.exports = DataAccess;
