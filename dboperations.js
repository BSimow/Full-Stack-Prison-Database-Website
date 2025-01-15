  // connect to your database
var config = require('./dbconfig');
const sql = require('mssql');
const router = require('./routes');

async function getdata() {
    try {
        let pool = await sql.connect(config);
        console.log("Connected!");
    }
    catch (error) {
        console.log(error);
    }
}

async function CheckForWarden(){
  try{
    console.log("Checking for warden");
    cmd = "SELECT * FROM guards WHERE warden =1;";
    return getdata_withQuery(cmd).then(result => {
      //console.log(result[0]);
      //console.log(result[0].length);
      if (result[0].length == 0){
        console.log("No warden found");
        console.log("Selecting first guard with highest clearance"); 
        cmd = "UPDATE guards SET Gtype = 'Warden', Warden = 1, Clearance = 0 WHERE GID = (select TOP 1 GID from guards where Clearance = 1 ) AND (NOT EXISTS (SELECT 1 FROM guards WHERE GType = 'Warden' AND Warden = 1));";
        getdata_withQuery(cmd).then(result => {
          console.log("Warden assigned");   
        });
      }
      else{
        console.log("warden exists");
      }
    });
  }catch(error){
    console.log(error);
  }
}

function getForeignKeys() {
    var AvailCIDs = [];
    var GIDs  = [];
    var AllCIDs  = [];
    var CBnames  = [];
    var PIDs=[];
    cmd = "SELECT CID FROM cell WHERE (CellStatus = 'Empty' OR CellStatus = 'Occupied'); SELECT GID FROM guards; SELECT CBname FROM cellblock; SELECT PID FROM Inmates; SELECT CID FROM cell;";
    
    return getdata_withQuery(cmd).then(result => {
      //console.log(result); // Check the value of the result
      
      for(let i = 0; i < result[0].length; i++){
        AvailCIDs[i] = result[0][i].CID;
      }

      for(let i = 0; i < result[1].length; i++){
        GIDs[i] = result[1][i].GID;
      }
  
      for(let i = 0; i < result[2].length; i++){
        CBnames[i] = result[2][i].CBname;
      }
      for(let i = 0; i < result[3].length; i++){
        PIDs[i] = result[3][i].PID;
      }
      for(let i = 0; i < result[4].length; i++){
        AllCIDs[i] = result[4][i].CID;
      }
      return [AvailCIDs, GIDs, CBnames,PIDs,AllCIDs];
    }).catch(error => {
      console.log(error); // Handle any errors
    });
  }


async function getdata_withQuery(cmd) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request().query(cmd);
        return res.recordsets;
    } catch(error){
        return error;
    }
}

function InsertInmate(InmateInfo,res)
{
  cmd = "INSERT INTO Inmates (PFirst, PLast, Gender, PSentence, PConduct,Parole, PGang, CID) VALUES ('"+ InmateInfo.PFirst +"', '"+ InmateInfo.PLast +"','"+ InmateInfo.Gender +"' ,'"+ InmateInfo.Sentence +"','"+ InmateInfo.Conduct +"','"+ InmateInfo.Parole + "', '"+ InmateInfo.PGang +"', "+ InmateInfo.CellOfInmate +");";
  console.log(cmd);
  getdata_withQuery(cmd).then(result => {
    if(Object.prototype.toString.call(result) == "[object Error]"){
      console.log(typeof result);
      res.render('error', { message: 'Error', error: result});
    }
    else{
      res.redirect("/inmates");
    }
  });
}

function InsertCellBlock(CellBlockInfo,res)
{
  cmd = "INSERT INTO cellblock (CBname, CBType, NoCams) VALUES ('"+ CellBlockInfo.CBname +"', '"+ CellBlockInfo.CBType +"','"+ CellBlockInfo.NoCams +"');";
  console.log(CellBlockInfo);
  getdata_withQuery(cmd).then(result => {
    if(Object.prototype.toString.call(result) == "[object Error]"){
      console.log(typeof result);
      res.render('error', { message: 'Error', error: result});
    }
    else{
         res.redirect("/cellblocks");
    }
  });
}
function InsertCell(CellInfo,res)
{
  console.log(CellInfo);
  cmd = "INSERT INTO cell (CellStatus, MaxCap, CBname) VALUES ('"+ CellInfo.CellStatus +"', '"+ CellInfo.MaxCap +"','"+ CellInfo.CBname +"');";
  getdata_withQuery(cmd).then(result => {
    if(Object.prototype.toString.call(result) == "[object Error]"){
      console.log(typeof result);
      res.render('error', { message: 'Error', error: result});
    }
    else{
      res.redirect("/cells");
    }
  });
}
function InsertGuard(GuardsInfo,res)
{
  cmd = "INSERT INTO Guards (GFirst, GLast, GType, Clearance) VALUES ('"+ GuardsInfo.GFirst +"', '"+ GuardsInfo.GLast +"','"+ GuardsInfo.GType +"' ,'"+ GuardsInfo.Clearance +"');";
  getdata_withQuery(cmd).then(result => {
      if(Object.prototype.toString.call(result) == "[object Error]"){
        console.log(typeof result);
        res.render('error', { message: 'Error', error: result});
      }
      else{
        res.redirect("/guards");
      }
  });
}

function InsertShift(ShiftInfo,res)
{
  console.log(ShiftInfo.Day);
  cmd = "INSERT INTO shifts (Day, Time_, GID, CBname) VALUES ('"+ ShiftInfo.Day +"', '"+ ShiftInfo.Time_ +"','"+ ShiftInfo.GID +"' ,'"+ ShiftInfo.CBname +"');";
  getdata_withQuery(cmd).then(result => {
    if(Object.prototype.toString.call(result) == "[object Error]"){
      console.log(typeof result);
      res.render('error', { message: 'Error', error: result});
    }else{
      res.redirect("/shifts");
    }
  });
}

function Delete(name,idtable,idin,res)
{   
    capitalname = name.charAt(0).toUpperCase() + name.slice(1) + "s";
    if(name.charAt(name.length - 1) == "s"){
      namePlural = name;
    }else
    {
      namePlural = name + "s";
    }
    //console.log(namePlural);
    if(typeof idin == "string"){
      cmd = "DELETE FROM " + namePlural +" WHERE "+ idtable +" = "+ '\'' + idin +'\'' +";";
    }else{
      cmd = "DELETE FROM " + namePlural +" WHERE "+ idtable +" = '"+ idin +"';";
    }
    getdata_withQuery(cmd).then(result => {
      if(Object.prototype.toString.call(result) == "[object Error]"){
          console.log(typeof result);
          res.render('error', { message: 'Error', error: result});
      }else{
        res.redirect(namePlural);
      }
    })
}

async function getCellsAttributes()
{
  var cellstatuses = [];
  var maxcaps = [];
  var cbnames = [];

  cmd = "SELECT CellStatus FROM cell; SELECT MaxCap FROM cell; SELECT CBname FROM cell;";
  return getdata_withQuery(cmd).then(result => {
    //console.log(result); // Check the value of the result
    try{
      for(let i = 0; i < result[0].length; i++){
        cellstatuses[i] = result[0][i].CellStatus;
      }

      for(let i = 0; i < result[1].length; i++){
        maxcaps[i] = result[1][i].MaxCap;
      }

      for(let i = 0; i < result[2].length; i++){
        cbnames[i] = result[2][i].CBname;
      }
      return [cellstatuses, maxcaps, cbnames];
    }catch (e){
      console.log(e);
    }
   
  });
}

function UpdateCell(CellInfo,res)
{
  console.log(CellInfo);
  switch(CellInfo.selec){
      case 'cellstatus':
        cmd = "UPDATE cell SET CellStatus = '"+ CellInfo.CellStatus +"' WHERE CID = "+CellInfo.CID +";";
        break;
      case 'maxcap':
        cmd = "UPDATE cell SET MaxCap = '"+ CellInfo.MaxCap +"'WHERE CID = "+CellInfo.CID +";";
        break;
      case 'cbname':
        cmd = "UPDATE cell SET CBname = '"+ CellInfo.CBname +"WHERE CID = "+CellInfo.CID +";";
        break;
      case '':
        return;
    }
  getdata_withQuery(cmd).then(result => {
    if(Object.prototype.toString.call(result) == "[object Error]"){
      console.log(typeof result);
      res.render('error', { message: 'Error', error: result});
    }
    else{
      res.redirect("/cells");}
  });
}

function UpdateCellBlock(CBInfo,res)
{
  console.log(CBInfo);
  switch(CBInfo.selec){
      case 'cbtype':
        cmd = "UPDATE cellblock SET CBType = '"+ CBInfo.CBType +"' WHERE CBname = '"+CBInfo.CBname +"';";
        break;
      case 'noCams':
        if(CBInfo.NoCams != ''){
          cmd = "UPDATE cellblock SET NoCams = '"+ CBInfo.NoCams +"'WHERE CBname = '"+CBInfo.CBname +"';";
        }
        else{
          cmd = "UPDATE cellblock SET NoCams = NULL WHERE CBname = '"+CBInfo.CBname +"';";
        }
        break;
      case '':
        return;
    }
  getdata_withQuery(cmd).then(result => {
    if(Object.prototype.toString.call(result) == "[object Error]"){
      console.log(typeof result);
      res.render('error', { message: 'Error', error: result});
    }
    else{
      // cmd = "SELECT * FROM cellblocks;";
      //   getdata_withQuery(cmd).then(result => {
      //     console.log(result);
      //     res.render("cellblocks",{ title: "CellBlocks" , cellBlocks: result[0]});
      //   });
      // }

      res.redirect('/cellblocks');
    }
  });
}

function UpdateGuard(GuardInfo,res)
{
  console.log(GuardInfo);
  switch(GuardInfo.selec){
      case 'gfirst':
        cmd = "UPDATE guards SET GFirst = '"+ GuardInfo.GFirst +"' WHERE GID = "+GuardInfo.GID +";";
        break;
      case 'glast':
        cmd = "UPDATE guards SET GLast = '"+ GuardInfo.GLast +"'WHERE GID = "+GuardInfo.GID +";";
        break;
      case 'gtype':
        cmd = "UPDATE guards SET GType = '"+ GuardInfo.GType +"'WHERE GID = "+GuardInfo.GID +";";
        break;
      case 'clearance':
        cmd = "UPDATE guards SET Clearance = '"+ GuardInfo.Clearance +"'WHERE GID = "+GuardInfo.GID +";";
        break;
      case '':
        return;
    }
  getdata_withQuery(cmd).then(result => {
    if(Object.prototype.toString.call(result) == "[object Error]"){
      console.log(typeof result);
      res.render('error', { message: 'Error', error: result});
    }
    else{
      res.redirect('/guards');
    }
  });
}

// function CheckForWarden(res){

// }

module.exports = {
    getdata: getdata,
    getForeignKeys: getForeignKeys,
    getdata_withQuery:getdata_withQuery,
    Delete:Delete,
    InsertInmate:InsertInmate,
    InsertCellBlock:InsertCellBlock,
    InsertCell:InsertCell,
    InsertGuard:InsertGuard,
    InsertShift:InsertShift,
    getCellsAttributes:getCellsAttributes,
    UpdateCell:UpdateCell,
    UpdateCellBlock:UpdateCellBlock,
    UpdateGuard:UpdateGuard,
    CheckForWarden:CheckForWarden
};