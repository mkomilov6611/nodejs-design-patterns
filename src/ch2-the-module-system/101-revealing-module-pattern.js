const myModule = (()=> {
  const privateFoo = () => {}
  const privateBar = [];
  
  const exported = {
    publicFoo: () => {},
    publicBar: () => {}
  }
  
  return exported;
})(); // Immediately Invoked Function Expression (IIFE)

console.log(myModule.privateFoo) // unexposed (undefined)
console.log(myModule.publicFoo) // exposed functionality
