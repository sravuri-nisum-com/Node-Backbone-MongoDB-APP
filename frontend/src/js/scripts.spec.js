describe("Testing model", function() {

   
 it("Model should be defined", function() {
   var contact = new Contact();
    expect(contact).toBeDefined();

 });

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
 it("Fires a custom event when the state changes (updated).", function() {
   var spy = jasmine.createSpy("update");

  var contact = new Contact();

   // how do we monitor changes of state?
   contact.bind("change", spy);

   // what would you need to do to force a change of state?
   contact.set({
     firstname: "ram1",
     lastname: "dev1",
     email: "ram1@gmail.com",
     telnumber: "849-896-9089"
   });

   expect(spy).toHaveBeenCalled();
   expect(contact.get("firstname")).toBe("ram1");
   expect(contact.get("lastname")).toBe("dev1");
   expect(contact.get("email")).toBe("ram1@gmail.com");
   expect(contact.get("telnumber")).toBe("849-896-9089");

 });
 it("Fires a custom event when the state changes.", function() {
   var spy = jasmine.createSpy("delete");

  var contact = new Contact();

   
   contact.bind("change", spy);

   // what would you need to do to force a change of state?
   contact.set({
     firstname: "ram1",
     lastname: "dev1",
     email: "ram@gmail.com",
     telnumber: "849-896-9080"
   });

   expect(spy).toHaveBeenCalled();
   expect(contact.get("firstname")).toBeNull;
   expect(contact.get("lastname")).toBeNull;
   expect(contact.get("email")).toBeNull;
   expect(contact.get("telnumber")).toBeNull;
 });
});


// describe("Testing model", function() {
//     var MOCK_GET_DATA = {
//          firstname: "ram", 
//          lastname: "dev",
//           email: "ram@gmail.com", 
//           telnumber: "849-896-9080" 
//         };

  
// }); 
describe('Tests for ContactsList in collections ', function() {

    it('Can add Model instances as objects and arrays.', function() {
        var contacts= new Contacts();
        
        expect(contacts.length).toBe(0);
        
        contacts.add({
          firstname: "ram3",
          lastname: "dev3",
          email: "ram3@gmail.com",
          telnumber: "849-896-9083"
        });
        
        // how many todos have been added so far?
        expect(contacts.length).toBe(1);
        
       contacts.add([
         {
           firstname: "ram4",
           lastname: "dev4",
           email: "ram4@gmail.com",
           telnumber: "849-896-9084"
         },
         {
           firstname: "ram5",
           lastname: "dev5",
           email: "ram5@gmail.com",
           telnumber: "849-896-9085"
         }
       ]);
        
        // how many are there in total now?
        expect(contacts.length).toBe(3);
    });
    it("Can have a url property to define the basic url structure for all contained models.", function() {
       var contacts = new Contacts();
      // ///
      expect(contacts.url).toBe("http://localhost:6300/api/contacts");
    });
    
     
  });



//Views
// describe("The  add contact view", function() {
  var contactView;

  beforeEach(function() {
    contactView = new ContactView();
     contactView.render();
     contactView.$el.appendTo("body");
  });
  afterEach(function() {
    contactView.$el.remove();
  });

  it("should have an  all editable fields", function() {
    expect(contactView.$el).toContainElement("input.firstname-input");
    expect(contactView.$el).toContainElement("input.lastname-input");
    expect(contactView.$el).toContainElement("input.email-input");
    expect(contactView.$el).toContainElement("input.telnumber-input");
  });

  it("should allow a user to add contact", function() {
    expect(contactView.$el).toContainElement("button.add-blog");

    contactView.$(".add-blog").click();
     expect(contactView.$el).toContainElement(".contract-form");
    expect(contactView.$el).toContainElement(".firstname-input");
    expect(contactView.$el).toContainElement(".lastname-input");
    expect(contactView.$el).toContainElement(".email-input");
    expect(contactView.$el).toContainElement(".telnumber-input");
    expect(contactView.$(".contract-form")).toContainElement("input.firstname-input");
    expect(contactView.$(".contract-form")).toContainElement("input.lastname-input");
    expect(contactView.$(".contract-form")).toContainElement("input.email-input");
    expect(contactView.$(".contract-form")).toContainElement("input.telnumber-input");
  });
