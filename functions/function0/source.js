exports = async (arg) => {
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    var doc = collection.findOne({owner_id: context.user.id});

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  
  return new Promise(async (resolve, reject) => {
    try {
      var value0 = context.values.get("value0");
      var value1 = context.values.get("value1");
      
      var collection = context.services.get("mongodb-atlas").db("tracker").collection("tasks");
      var doc = collection.findOne({_partition: context.user.id});
      
      const response = await context.http.get({ url: "https://df1412-simple-webhook.glitch.me/webhook" });
      const responseJson = EJSON.parse(response.body.text());
      resolve({arg: arg, userId:context.user.id, docs: doc, value0:  value0, value1: value1, req: responseJson});
    } catch (e) {
      reject(e)
    }
  });
}