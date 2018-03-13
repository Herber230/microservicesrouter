import Mongoose = require('mongoose');

class DataAccess
{
    static mongooseInstace: any;
    
    static mongooseConnection: Mongoose.Connection;

    constructor ()
    {
        DataAccess.connect();
    }

    static connect () : Mongoose.Connection
    {
        if (this.mongooseInstace)
            return this.mongooseInstace;

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log('Connected to mongodb')
        });

        this.mongooseInstace = Mongoose.connect("mongodb://localhost:27017/authbd001");

        

        return this.mongooseInstace;
    }

}

DataAccess.connect();

export = DataAccess;