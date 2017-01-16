var models = require('../models.js');
var union = require('lodash.union');
var intersection = require('lodash.intersection');
var uniq = require('lodash.uniqby');

module.exports = {
  get: function(req, res) {
    var setA = [];
    var setB;
    var jaccordIndex = [];
    var len;
    //Fetch locations to compare user interests
    var currentID = Number(req.query.id_users);
    console.log(req.query);
    models.locations.get(function(err, results) {
      if (err) {
        console.log('Error: ', err);
      }
      var data = results;
      models.users.getNumber(function(err, results) {
        if (err) {
          console.log('Error: ', err);
        }
        len = results;
        for (var i = 0; i < data.length; i++) {
          if (data[i].id_users === currentID) {
            setA.push(data[i].name);
          }
        }


        //Must build setB once for each user
        for (var i = 1; i <= len; i++) {
          setB = [];
          if (i === currentID) {
            continue;
          }
          for (var j = 0; j < data.length; j++) {
            if (data[j].id_users === i) {
              setB.push(data[j].name);
            }
          }

        console.log(setA, setB);
          //Compute jaccord index to quantify similarity b/w setA & setB
          var setIntersection = intersection(setA, setB);
          var setUnion = union(setA, setB);
          jaccordIndex.push([setIntersection.length / setUnion.length, i]);
        }

        jaccordIndex = uniq(jaccordIndex, function(el) {
          return el[1];
        });

        

        //Select the 4 most similar users
        jaccordIndex = jaccordIndex.sort(function(a, b) {
          return a[0] < b[0];
        }).slice(0, 4);

        // var users = [];
        // for (var i = 0; i < jaccordIndex.length; i++) {
        //   var params = [jaccordIndex[i][1]];
        //   models.users.getOne(params, function(err, results) {
        //     if (err) {
        //       console.log('Error: ', err);
        //     }
        //     users.push(results);
        //   });
        // }
        res.json(jaccordIndex);
      });
    });
  }
}