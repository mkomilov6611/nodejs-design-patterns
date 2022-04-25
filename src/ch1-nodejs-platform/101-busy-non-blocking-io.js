/* Pseudo Example! */

resources = [socketA, socketB, socketC];

while (!resources.isEmpty()) {
  for(resource of resources) {
    // try to read
    if(data === NO_DATA_AVAILABLE) {
      continue
    }     
    
    if(data === RESOURCE_CLOSED) {
      resources.remove(i)
    }
    
    else {
      // some data was received, process it
      consumeData(data)
    }
  }
}

/* As you can see it is possible to handle different resources(operations) in the same thread, but its still not efficient. As our loop is here only
   consume precious CPU for iterating over resources that are unavailable most of the time.
*/
