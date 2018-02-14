describe("Testing model", function() {

   

 it("Can be created with default values for its attributes.", function() {
   var contact = new Contact();
   expect(contact.get("firstname")).toBe("");
   expect(contact.get("lastname")).toBe("");
   expect(contact.get("email")).toBe("");
   expect(contact.get("telnumber")).toBe("");
 });
 it("Will set passed attributes on the model instance when created.", function() {
    
    var contact = new Contact({
      firstname: "ram",
      lastname: "dev",
      email: "ram@gmail.com",
      telnumber: "849-896-9080"
    });

   

  expect(contact.get("firstname")).toBe("ram");
  expect(contact.get("lastname")).toBe("dev");
  expect(contact.get("email")).toBe("ram@gmail.com");
  expect(contact.get("telnumber")).toBe("849-896-9080");
 });
 it("Fires a custom event when the state changes.", function() {
   var spy = jasmine.createSpy("update");

  var contact = new Contact();

   // how do we monitor changes of state?
   contact.bind("change", spy);

   // what would you need to do to force a change of state?
   contact.set({
     firstname: "ram1",
     lastname: "dev1",
     email: "ram@gmail.com",
     telnumber: "849-896-9080"
   });

   expect(spy).toHaveBeenCalled();
 });
});

describe("Testing model", function() {
    var MOCK_GET_DATA = {
         firstname: "ram", 
         lastname: "dev",
          email: "ram@gmail.com", 
          telnumber: "849-896-9080" 
        };

  
}); 
