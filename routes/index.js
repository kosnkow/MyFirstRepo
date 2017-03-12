var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res) {
  var mongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/sampsite';

  mongoClient.connect(url, function (err, db){
    if(err){
      console.log('Unable co connect to the server', err);
    }
    else{
      console.log('connection estabilies to', url);
      
      var collection = db.collection('students');
      collection.find({}).toArray(function(err,result){
        if(err){
          res.send(err);
        } else if(result.length){
          res.render('studentsList', {
            "studentsList" : result
          })
        } else{
          res.send('No document found');
        }

        db.close();
      })
    }
  })
});



module.exports = router;
