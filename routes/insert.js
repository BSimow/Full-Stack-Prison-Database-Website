var express = require('express');
var router = express.Router();
var sql = require("../dboperations");
var availabeCells = [];
var CBnames = [];
var GIDs = [];

router.get('/', function (req, res, next) {
  //nothing
});

router.get('/inmate', function (req, res, next) {
  sql.getdata();

  const genders = ['M','F'];
  const conduct = ["Good","Bad"];
  const parole = ['Yes','No'];

  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1];
    CBnames = result[2];
    // console.log(availabeCells);
    // console.log(GIDs);
    // console.log(CBnames);

    res.render('insertInmate', { title: 'Insert Inmate',CIDs: availabeCells ,genders: genders,conducts: conduct,paroles: parole});
  });
});


router.post('/inmate', function (req, res, next) { 
  var InmateInfo ={
    PFirst: req.body.prisonerFirstName,
    PLast: req.body.prisonerLastName,
    CellOfInmate: req.body.cell,
    Gender: req.body.gender,
    Sentence: req.body.sentence,
    PGang: req.body.pgang,
    Conduct: req.body.conduct,
    Parole: req.body.parole
  };

  sql.InsertInmate(InmateInfo,res);
});


router.get('/guard', function (req, res, next) {
  sql.getdata();

  const type = ["Riot Unit","Watch Tower","CCTV Operator","Security Officer"];
  const clearance = [1,2,3,4];

  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1];
    CBnames = result[2];
    // console.log(availabeCells);
    // console.log(GIDs);
    // console.log(CBnames);

    res.render('insertGuard', { title: 'Insert Guard',types: type,clearances: clearance});
  });
});

router.post('/guard', function (req, res, next) { 
  var GuardInfo ={
    GFirst: req.body.guardFirstName,
    GLast: req.body.guardLastName,
    GType: req.body.type,
    Clearance: req.body.clearance,
  };

  sql.InsertGuard(GuardInfo,res);
});

router.get('/shift', function (req, res, next) {
  sql.getdata();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const time = ["Day","Night"];

  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1];
    CBnames = result[2];
    // console.log(availabeCells);
    // console.log(GIDs);
    // console.log(CBnames);

    res.render('insertShift', { title: 'Insert Shift',cbnames: CBnames ,gids: GIDs,days: days,times: time});
  });
});

router.post('/shift', function (req, res, next) { 
  var ShiftInfo ={
    Day: req.body.day,
    Time_: req.body.time,
    GID: req.body.gid,
    CBname: req.body.cbname,
  };
  //console.log(ShiftInfo)
  sql.InsertShift(ShiftInfo,res);
});

router.get('/cellblock', function (req, res, next) {
  sql.getdata();

  const CBtypes = ["Normal_M","Normal_F","Solitary_M","Solitary_F"];

  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1];
    CBnames = result[2];
    // console.log(availabeCells);
    // console.log(GIDs);
    // console.log(CBnames);

    res.render('insertCellBlock', { title: 'Insert Cell Block',cbtypes: CBtypes});
  });
});

router.post('/cellblock', function (req, res, next) {
  tempName = "CB_" + req.body.cbname
  var CellBlockInfo ={
    CBname: tempName.toUpperCase(),
    NoCams: req.body.nocams,
    CBType: req.body.cbtype,
  };
  //console.log(ShiftInfo)
  sql.InsertCellBlock(CellBlockInfo,res);
});

router.get('/cell', function (req, res, next) {
  sql.getdata();

  const maxcap = [1,2,3,4];
  const cellstatus = ["Empty","Full","Occupied","Maintenance"];
  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1];
    CBnames = result[2];
    // console.log(availabeCells);
    // console.log(GIDs);
    // console.log(CBnames);

    res.render('insertCell', { title: 'Insert Cell Block',maxcaps: maxcap,cellstatuses: cellstatus,cbnames: CBnames});
  });
});
router.post('/cell', function (req, res, next) {
  var CellInfo ={
    CellStatus: req.body.cellstatus,
    MaxCap: req.body.maxcap,
    CBname: req.body.cbname,
  };
  console.log(CellInfo);
  sql.InsertCell(CellInfo,res);
});

router.get('/testconnect', function (req, res, next) {
    sql.getdata();
    res.render('index', { title: 'Express' });
});

router.get('/getdata_withQuery', function (req, res, next) {
  cmd = "SELECT * FROM cells";
  sql.getdata_withQuery(cmd).then(result => {
    res.json(result[0]);
  })
});

module.exports = router;