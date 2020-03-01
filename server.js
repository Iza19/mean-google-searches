var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var SEARCHES_COLLECTION = "searches";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var db;

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
  db.collection(SEARCHES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get search");
    } else {
      res.status(200).json(doc);
    }
  });
});
app.delete("/api/searches/:id", function (req, res) {
  db.collection(SEARCHES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete search");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});


app.get('/', function (req, res) {
  res.send('hello world')
})
