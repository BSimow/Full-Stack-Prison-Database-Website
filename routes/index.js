var express = require('express');
var router = express.Router();
var sql = require("../dboperations");
var availabeCells = [];
var CBnames = [];
var GIDs = [];

router.get('/', function (req, res, next) {
  sql.getdata();
  const queries = [
    {
      name: "2 Simple queries",
      description: "Select all inmates with more than 25 years of prison sentence."
    },
    {
      name: "2 Simple queries",
      description: "Select Guards with clearance more than 3."
    },
    {
      name: "2 Queries that required data across more than two tables",
      description: "Select all the inmates in cellblock CB_A."
    },
    {
      name: "2 Queries that required data across more than two tables",
      description: "Select all Guards with shifts assigned on CB_D."
    },
    {
      name: "2 Calculating queries",
      description: "Count number of shifts on each cellblock."
    },
    {
      name: "2 Calculating queries",
      description: "Count the number of cell in cellblock named CB_D."
    },
    {
      name: "1 query with pattern search in an attribute",
      description: "Find all Guards who have types as Security officer."
    },
    {
      name: "2 Aggregating queries",
      description: "Get the average number of Guards in each Cellblock."
    },
    {
      name: "2 Aggregating queries",
      description: "For each Cell, Count the number of inmates who are assigned to it."
    },
    {
      name: "1 union or intersection query",
      description: "Get IDs of cell placed in CB_A or has MaxCap of 3."
    },
    {
      name: "1 query to show that data that doesn't exist",
      description: "Get the ID of cell with no inmates."
    },
    {
      name: "1 Trigger",
      description: "If there is no guard with the Type Warden, assign a random security officer as a Warden Type."
    }
  ];
  

  console.log(queries.indexOf(queries[0]));
  
  res.render('index', { title: 'Prison',queries:queries});
});


router.get('/all', function (req, res, next) {
  sql.CheckForWarden().then(result => {
    cmd = "SELECT * FROM inmates; SELECT * FROM guards; SELECT * FROM shifts; SELECT * FROM cell; SELECT * FROM cellblock;";
    sql.getdata_withQuery(cmd).then(result => {
      console.log(result[0]);
      res.render('all',{ title1: 'Inmates', title2: 'Guards', title3: 'Cell Blocks', title4: 'Cells', title5: 'Shifts', inmates: result[0], guards: result[1], shifts: result[2], cells: result[3], cellBlocks: result[4]});
      //res.json(result[2]);
    })
  });
});

router.get('/inmates', function (req, res, next) {
    cmd = "SELECT * FROM inmates;";
    sql.getdata_withQuery(cmd).then(result => {
      res.render('inmates',{ title: 'Prisoners' , inmates: result[0]});
      //res.json(result[2]);
    })
});

router.get('/guards', function (req, res, next) {
 sql.CheckForWarden().then(result => {
    //console.log(result);
    cmd = "SELECT * FROM guards;";
    sql.getdata_withQuery(cmd).then(result => {
      res.render('guards',{ title: 'Guards' , guards: result[0]});
      //res.json(result[2]);
    })
 });
});

router.get('/shifts', function (req, res, next) {
  cmd = "SELECT * FROM shifts;";
  sql.getdata_withQuery(cmd).then(result => {
    res.render('shifts',{ title: 'Shifts' , shifts: result[0]})
    //res.json(result[2]);
  })
});

router.get('/cellblocks', function (req, res, next) {
  cmd = "SELECT * FROM cellblock;";
  sql.getdata_withQuery(cmd).then(result => {
    res.render('cellblocks',{ title: 'Cellblocks' , cellBlocks: result[0]});
    //res.json(result[2]);
  })
});

router.get('/cells', function (req, res, next) {
  cmd = "SELECT * FROM cell;";
  sql.getdata_withQuery(cmd).then(result => {
    res.render('cells',{ title: 'Cells' , cells: result[0]});
    //res.json(result[2]);
  })
});


module.exports = router;