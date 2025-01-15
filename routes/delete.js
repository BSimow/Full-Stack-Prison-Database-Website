var express = require('express');
var router = express.Router();
var sql = require("../dboperations");
var availabeCells = [];
var CBnames = [];
var GIDs = [];
var CIDs = [];

router.get('/inmate', function (req, res, next) {
    sql.getdata();
    sql.getForeignKeys().then(result => {
      availabeCells = result[0];
      GIDs = result[1];
      CBnames = result[2];
      PIDs= result[3];
      console.log(PIDs);
      res.render('deleteInmate', { title: 'Delete Inmate',pids: PIDs});
    });
});

router.post('/inmate', function (req, res, next) {
    const PID = req.body.pid;

    sql.Delete("inmate","PID",PID,res);
});


router.get('/guards', function (req, res, next) {
    sql.getdata();
    sql.getForeignKeys().then(result => {
      availabeCells = result[0];
      GIDs = result[1];
      CBnames = result[2];
      console.log(GIDs);
      res.render('deleteGuard', { title: 'Delete Guard',gids: GIDs});
    });
});

router.post('/guards', function (req, res, next) {
    const GID = req.body.gid;
    console.log(GID);
    // cmd = "DELETE FROM guards WHERE GID = "+ GID +";";
    // sql.getdata_withQuery(cmd).then(result => {
    //     console.log(result);
    //     cmd = "SELECT * FROM guards;";
    //     sql.getdata_withQuery(cmd).then(result => {
    //         res.render('guards',{ title: 'Guards' , guards: result[0]});
    //         //res.json(result[2]);
    //     })
    // })

    sql.Delete("guard","GID",GID,res);
});

router.get('/cellblock', function (req, res, next) {
  sql.getdata();
  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1]; 
    CBnames = result[2];
    res.render('deleteCellBlock', { title: 'Delete Cell Blocks',cbnames: CBnames});
  });
});

router.post('/cellblock', function (req, res, next) {
  const CBname = req.body.cbname;
  console.log(CBname);
  sql.Delete("cellBlock","CBname",CBname,res);
});

router.get('/cell', function (req, res, next) {
  sql.getdata();
  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1]; 
    CBnames = result[2];
    CIDs = result[4];
    res.render('deleteCell', { title: 'Delete Cell',cids: CIDs});
  });
});

router.post('/cell', function (req, res, next) {
  const CID = req.body.cell;
  //console.log(CID);
  sql.Delete("cell","CID",CID,res);
});


module.exports = router;