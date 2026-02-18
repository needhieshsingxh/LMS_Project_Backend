import mongoose from "mongoose";

class DatabaseConnection{
    constructor(){
        this.retryCount  = 0;
        this.isConnected = false;

        mongoose.set("strictQuery", true)
        mongoose.connection.on("connected", ()=>{
            console.log("Mongodb CONNECTED SUCCESSFULLY")
            this.isConnected = true;
        })
        mongoose.connection.on("disconnected", ()=>{
            console.log("Mongodb disconnected successfully")
            this.isConnected = false
        
        })                
        mongoose.connection.on("diconnected", ()=>{
                console.log("Mongodb connection Error")
                this.handleDisconnection()
        })

        process.on("SIGTERM", this.handleAppTermination.bind(This))
    }

    async connect() {
       try {
         if(!process.env.MONGO_URI){
             throw new Error("MONGO db URI is not defined in env variables");
         }
     
 
     const connectionOptions = {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         maxPoolSize: 10,
         serverSelectionTimeoutMS: 5000,
         family: 4,
         socketTimeout: 45000
 
     };
     if(process.env.NODE_ENV === "development"){
         mongoose.set("debug", true);
     }
 
     await mongoose.connect(process.env.MONGO_URI, connectionOptions);
     this.retryCount = 0
       } catch (error) {
            console.error(error.message);
            await this.handleConnectionError()

       }
    }
    async handleConnectionError() {
        if(this.retryCount < MAX_RETRIES){
            this.retryCount++;
             console.log(`Retrying connection... Attemp ${this.retryCount} of ${MAX_RETRIES}`)
             await new Promise(resoleve => setTimeout(()=>{
                resoleve
             }, RETRY_INTERVAL))
             return this.connect()
        }else{
            console.error(`Failed to connect to MONGODB after ${MAX_RETRIES} attempts`)
        }
    }
 
    async handleDisconnection(){
        if(!this.isConnected){
            console.log("Attempting to reconnected to mongodb...")
            this.connect()
        }
    }
 
    async handleAppTermination(){
        try{
            await mongoose.connecttion.close();
            console.log("Mongodb connection close through app termination")
            process.exit(0);
        }catch(error){
            console.error("Error during database disconnection", error)
            process.exit(1)
        }
    }
 
    getConnectionStatus(){
        return {
            isConnected: this.isConnected,
            readyState: mongoose.connection.readyState,
            host: mongoose.connection.host,
            name: mongoose.connection.name
        }
    }
}


const dbConnection = new DatabaseConnection()

export default dbConnection.connection.bind(dbConnection)
export const getDBStatus = dbConnection.getConnectionStatus.bind(dbConnection);