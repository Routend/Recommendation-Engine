var models = require('./models.js');
var union = require('lodash.union');
var intersection = require('lodash.intersection');

module.exports = {
  users: {
    get: function(req, res) {
      var setA = [];
      var setB;
      var jaccordIndex = [];
      //Fetch locations to compare user interests
      var currentID = req.body.id_users;
      models.locations.get(function(err, results) {
        if (err) {
          console.log('Error: ', err);
        }

        for (var i = 0; i < results.length; i++) {
          if (results[i].id_users === currentID) {
            setA.push(results[i].name);
          }
        }

        //Must build setB once for each user
        for (var i = 0; i < results.length; i++) {
          setB = [];
          if (results[i].id_users === currentID) {
            continue;
          }

          for (var j = 0; j < results.length; j++) {
            if (results[i].id_users === results[j].id_users) {
              setB.push(results[i].id_users);
            }
          }

          //Compute jaccord index to quantify similarity b/w setA & setB
          var setIntersection = intersection(setA, setB);
          var setUnion = union(setA, setB);

          jaccordIndex.push([setIntersection.length / setUnion.length, results[i].id_users]);


        }

        //Select the 4 most similar users
        jaccord = jaccordIndex.sort(function(a, b) {
          return a[0] < b[0];
        }).slice(0, 4);

        var users = [];
        for (var i = 0; i < jaccordIndex.length; i++) {
          users.push(jaccordIndex[1]);
        }

        res.json(users);
      });
    }
  },

  locations: {
    get: function(req, res) {
      models.locations.get(function(err, results) {
        if (err) {
          console.log('Error: ', err);
        }

        res.json(results);
      });
    }
  }
}