var express = require('express');
var router = express.Router();
var sql = require("../dboperations");
var availabeCells = [];
var CBnames = [];
var GIDs = [];

router.get('/cellblocks', function (req, res, next) {
  sql.getdata();

  const CBtypes = ["Normal_M","Normal_F","Solitary_M","Solitary_F"];
  
  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1];
    CBnames = result[2];
    CIDs = result[4];
    // console.log(availabeCells);
    // console.log(GIDs);
    // console.log(CBnames);

    res.render('updateCellBlocks', { title: 'Update Cell Block',cbnames:CBnames,cbtypes: CBtypes});
  });});

router.post('/cellblocks', function (req, res, next) {
  var CellBlockInfo ={
    selec: req.body.propselect,
    CBname: req.body.cbname,
    NoCams: req.body.nocams,
    CBType: req.body.cbtype,
  };
  sql.UpdateCellBlock(CellBlockInfo,res);
});

router.get('/cells', function (req, res, next) {
  sql.getdata();

  const maxcaps = [1,2,3,4];
  const cellstatuses = ["Empty","Full","Occupied","Maintenance"];
  sql.getForeignKeys().then(result => {
    availabeCells = result[0];
    GIDs = result[1];
    CBnames = result[2];
    CIDs = result[4];
    // console.log(availabeCells);
    // console.log(GIDs);
    // console.log(CBnames);

    res.render('updateCells', { title: 'Update Cell',cids: CIDs ,cellstatuses: cellstatuses, maxcaps: maxcaps, cbnames: CBnames});
  });
});

router.post('/cells', function (req, res, next) {
    var CellInfo ={
        selec: req.body.propselect,
        CellStatus: req.body.cellstatus,
        MaxCap: req.body.maxcap,
        CBname: req.body.cbname,
        CID: req.body.cid,
    };
    //console.log(CellInfo);
    sql.UpdateCell(CellInfo,res);
});

router.get('/guards', function (req, res, next) {
  sql.getdata();

  const type = ["Riot Unit","Watch Tower","CCTV Operator","Security Officer"];
  const clearance = [1,2,3,4];

  sql.getForeignKeys().then(result => {
    console.log(result);
    availabeCells = result[0];
    GIDs = result[1];
    CBnames = result[2];
    // console.log(availabeCells);
    // console.log(GIDs);
    // console.log(CBnames);

    res.render('updateGuards', { title: 'Update Guard',gids:GIDs,gtypes: type,clearances: clearance});
  });
});

router.post('/guards', function (req, res, next) {
  var GuardInfo ={
    selec: req.body.propselect,
    GID: req.body.gid,
    GFirst: req.body.gfirst,
    GLast: req.body.glast,
    GType: req.body.gtype,
    Clearance: req.body.clearance,
  };
  //console.log(GuardInfo);
  sql.UpdateGuard(GuardInfo,res);
});

module.exports = router;