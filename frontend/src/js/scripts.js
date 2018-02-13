Backbone.Model.prototype.idAttribute = "_id";

// Backbone Model

var Contact = Backbone.Model.extend({
  defaults: {
    firstname: "",
    lastname: "",
    email: ""
  }
});

// Backbone Collection

var Contacts = Backbone.Collection.extend({
  url: "http://localhost:6300/api/contacts"
});

// instantiate a Collection

var contacts = new Contacts();

// Backbone View for one blog

var ContactView = Backbone.View.extend({
  model: new Contact(),
  tagName: "tr",
  initialize: function() {
    this.template = _.template($(".contacts-list-template").html());
  },
  events: {
    "click .edit-contact": "edit",
    "click .update-contact": "update",
    "click .cancel": "cancel",
    "click .delete-contact": "delete"
  },
    edit: function() {
      $(".edit-contact").hide();
      $(".delete-contact").hide();
      this.$(".update-contact").show();
      this.$(".cancel").show();

      var firstname = this.$(".firstname").html();
      var lastname = this.$(".lastname").html();
      var email = this.$(".email").html();

      this.$(".firstname").html('<input type="text" class="form-control firstname-update" value="' +  firstname +'">');
      this.$(".lastname").html( '<input type="text" class="form-control lastname-update" value="' + lastname + '">');
      this.$(".email").html( '<input type="text" class="form-control email-update" value="' + email +'">');
  },
    update: function() {
      this.model.set("firstname", $(".firstname-update").val());
      this.model.set("lastname", $(".lastname-update").val());
      this.model.set("email", $(".email-update").val());

      this.model.save(null, {
        success: function(response) {
          console.log(
            "Successfully UPDATED blog with _id: " + response.toJSON()._id
          );
        },
        error: function(err) {
          console.log("Failed to update blog!");
        }
      });
    },
  cancel: function() {
    contactsView.render();
  },
  delete: function() {
    this.model.destroy({
      success: function(response) {
        console.log(
          "Successfully DELETED contact with _id: " + response.toJSON()._id
        );
      },
      error: function(err) {
        console.log("Failed to delete contact!");
      }
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Backbone View for all blogs

var ContactsView = Backbone.View.extend({
  model: contacts,
  el: $(".contacts-list"),
  initialize: function() {
          var self = this;
          this.model.on("add", this.render, this);
          // this.model.on("change", function() {
          //     setTimeout(function() {
          //       self.render();
          //     }, 30);
          //   },this );
          this.model.on("remove", this.render, this);

          //server request
          this.model.fetch({
            success: function(response) {
              _.each(response.toJSON(), function(item) {
                console.log("Successfully GOT contacts  with _id: " + item._id);
              });
            },
            error: function() {
              console.log("Failed to get contacts!");
            }
          });
  },
  render: function() {
    var self = this;
    this.$el.html("");
    _.each(this.model.toArray(), function(contact) {
      self.$el.append(new ContactView({ model: contact }).render().$el);
    });
    return this;
  }
});

var contactsView = new ContactsView();



$(document).ready(function() {
  $(".add-blog").on("click", function() {
              var contact = new Contact({
                        firstname: $(".firstname-input").val(),
                        lastname: $(".lastname-input").val(),
                        email: $(".email-input").val()
                       });
    $(".firstname-input").val("");
    $(".lastname-input").val("");
    $(".email-input").val("");

    contacts.add(contact);

    contact.save(null, {
      success: function(response) {
        console.log(
          "Successfully SAVED contact with _id: " + response.toJSON()._id
        );
      },
      error: function() {
        console.log("Failed to save contact!");
      }
    });
  });
});
