exports = function(dbEvent){
  
  const { _id,operationType, fullDocument,ns,documentKey,updateDescription,clusterTime } = dbEvent;
  console.log(EJSON.stringify(_id));
  console.log(operationType);
  console.log(EJSON.stringify(fullDocument));
  console.log(EJSON.stringify(ns));
  console.log(EJSON.stringify(documentKey));
  console.log(EJSON.stringify(updateDescription));
  console.log(EJSON.stringify(clusterTime));
  
  // Only run if this event is for an updated or replaced document
  // if (dbEvent.operationType !== "INSERT" || dbEvent.operationType !== "REPLACE") { return }

  // Get an array that contains the names of any updated fields
  const updatedFields = Object.keys(updateDescription.updatedFields);

  // Check if a specific field (specific by the value of `fieldName`) was updated.
  const fieldName = "status"
  const fieldRegex = new RegExp(fieldName);
  const fieldWasUpdated = updatedFields.some(
    field => fieldRegex.test(field)
  );

  if (fieldWasUpdated) {
    // Format a message with the updated field's value.
    const fieldValue = dbEvent.fullDocument[fieldName];
    const msg = `The field ${fieldName} was updated to have value: ${fieldValue}`;

    console.log(msg)
  }
};