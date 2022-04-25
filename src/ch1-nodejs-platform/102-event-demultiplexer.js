/* Pseudo Example */

watchList.add(socketA, FOR_READ)
watchList.add(fileB, FOR_READ)
//... all IO requests are to be watched by demultiplexer

eventQueue = demultiplexer.watch(watchList)

while(demultiplexer.hasEvents()) {
  // Event Loop
  for(event of eventQueue) {
    // This read will never block and will always return data
    data = event.resource.read()
    
    if(data === RESOURCE_CLOSED) {
      demultiplexer.unwatch(event.resource); 
    }  
    
    else {
      // some actual data was received, process it
      consumeData(data);
    }
  }
}
