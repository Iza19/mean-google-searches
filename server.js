var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var SEARCHES_COLLECTION = "searches";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Handle error responses
function handle_error(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// SEARCH

/*  "/api/searches"
 *    GET: finds all searches
 *    POST: creates a new search
 */
app.get("/api/searches", function (req, res) {
  db.collection(SEARCHES_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handle_error(res, err.message, "Failed to get searches.");
    } else {
      res.status(200).json(docs);
    }
  });
});
app.post("/api/searches", function (req, res) {
  var new_search = req.body;
  new_search.create_date = new Date();

  if (!req.body.name) {
    handle_error(res, "Invalid search input", 400);
  } else {
    db.collection(SEARCHES_COLLECTION).insert_one(new_search, function (err, doc) {
      if (err) {
        handle_error(res, err.message, "Failed to create new search.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/searches/:id"
 *    GET: find search by id
 *    DELETE: deletes search by id
 */
app.get("/api/searches/:id", function (req, res) {
});
app.delete("/api/searches/:id", function (req, res) {
});
