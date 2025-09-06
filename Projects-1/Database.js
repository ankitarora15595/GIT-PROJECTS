const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://aroraankit015:5NjnEwM20hvAs6yl@lecture1.jz1rmyu.mongodb.net/";
const client = new MongoClient(uri);
const dbName = "MYDATA";
async function main() {
        await client.connect();
        console.log("Connected to the database successfully");
        const db = client.db(dbName);
        const collections = db.collection("LEARNDATA-1");
        console.log("Collections in the database:");
        const findResult = await collections.find({}).toArray();
        console.log("Found DOCs : ",findResult);        



        const data = {
            firstname: "Megha1",
            Lastname: "Saluja1",
            mob: "123456789110",
        };

        const insertResult = await collections.insertOne(data); 
        console.log("Inserted document:", insertResult);
        return "done";        
}
 
main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());