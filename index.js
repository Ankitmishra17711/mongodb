const MongoClient = require ('mongodb').MongoClient; // it enable us to connect with mongodb
const assert = require ('assert'); 
const dboper = require('./operations');//

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
    
    dboper.insertDocument(db,{name: "Vadonut",description: 'Test'},'dishes',(result)=> {
       
        console.log('INSERT DOCUMENTS:\n',result.ops);


        dboper.findDocuments(db,'dishes',(docs)=>{
            console.log('FOUND DOCUMENTS:\n',docs);


            dboper.updateDocument(db, {name: 'Vadonut'},{description: 'Updated Test'},'dishes',(result) =>{
             
                
                console.log('UPDATED DOCUMENTS:\n',result.result);
                dboper.findDocuments(db,'dishes',(docs)=>{
                    console.log('FOUND DOCUMENTS:\n',docs);

                    db.dropCollection('dishes',(result)=>{
                        console.log('DROPPED COLLECTION:',result);
                        client.close();
                    });
                
                });
        
                
            });
         });
    });

   
});