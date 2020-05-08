const assert =require ('assert');

exports.insertDocument = (db ,document ,collection ,callback)=>{
    const coll = db.collection(collection);
    coll.insert(document,(err, result)=>{
      assert.equal(err, null);
      console.log("INSERTED"+result.result.n+ //n will tell us how many  documents are inserted
      "DOCUMENTS INTO THE COLLECTION"+collection);
      callback(result);
            


    });
};

exports.findDocuments = (db  ,collection ,callback)=>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err,docs)=>{
        assert.equal(err,null);
       // console.log(err,null);
        callback(docs);

    });

};


exports.removeDocument = (db ,document ,collection ,callback)=>{
    const coll = db.collection(collection);
    coll.deleteOne(document,(err, result) => {
        assert.equal(err,null);
        console.log("REMOVED THE DOCUMENT",document);
        callback(result);
  });

};


exports.updateDocument = (db ,document, update ,collection ,callback)=>{
    const coll = db.collection(collection);
    coll.updateOne(document,{$set: update},null,(err,result)=>{
        assert.equal(err,null);
     console.log("UPDATED THE DOCUMENT WITH",update);
     callback(result);
    });
};



