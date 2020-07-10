exports = async (dbEvent) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Triggered")
      const {
        _id,
        operationType,
        fullDocument,
        ns,
        documentKey, 
        updateDescription,
        clusterTime 
      } = dbEvent;
      
      if (dbEvent.operationType !== "insert") { 
        return resolve(null);
      }
      const data = EJSON.parse(fullDocument.data);
      switch (fullDocument.collection) {
        case "Task" : {
          var collection = context.services.get("mongodb-atlas").db("tracker").collection("tasks");
          var doc = collection.findOne({_id: data._id});
          data.category = new BSON.ObjectId(data.category._id);
          collection.insertOne(data);
          console.log("Done")
          return resolve(true)
        } break;
      }
    } catch (e) {
      reject(e);
    }
  });
};