const MongoClient = require ('mongodb').MongoClient; // it enable us to connect with mongodb
const assert = require ('assert'); //

//to start a connection with mongodb server we create a const name url
// which is the url where mongodb server can be access

const url = 'mongodb://localhost:27017';// 27017 is a port number in which mongodb server wil run
const dbname = 'conFusion'; // we created the db earlier and we will acess that

/* to access the server(connect method will do this)
this takes url as the first parameter 
and second para will be a call back function is has two parameter 
(error value and client which we use to  connect to our db  and will perform various operations ) */


   MongoClient.connect(url,(err,client)=>{ // callback function

    assert.equal(err , null); // assert will allow to perfrom various checks(will check the error)
    
    console.log('connected correctly to the server') // if there will not be error the this will get printed on the screen
    const db = client.db(dbname); // to connect to the database
    
    
    
 const collection = db.collection('dishes') // try to access dishes collection within the db
 
 
 
    collection.insertOne ({"name": "Uthappizza" , "description": "test"},(err, result)=>{
    assert.equal(err, null);

       console.log('After Insert:\n');
       console.log(result.ops);   // it will tell how many operations are carried out


       collection.find({}).toArray((err , docs)=>{ // will search everything that will be in the colection
       assert.equal(err ,null);
        
       console.log('Found:\n');
       console.log(docs); // will return all thecritersi which u were asked for
        

        db.dropCollection('dishes' ,(err ,result)=>{ // will drop the specified collection here
        assert.equal(err,null);

        client.close(); // to close thr db

         });   
       
     });

  });

});