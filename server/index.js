const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sha256 = require('sha256')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const db = mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b4e5ea176be042',
  password: '6576e358',
  database: 'heroku_a8cb681c4e72fec',

  // mysql://b4e5ea176be042:6576e358@us-cdbr-east-05.cleardb.net/heroku_a8cb681c4e72fec?reconnect=true
  // host: 'localhost',
  // user: 'root',
  // password: 'password',
  // database: 'shipitdb',

  // port: '3306'
  // host: process.env.DB_HOST,
  // user: process.env.DB_USERNAME,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
});

const sqlcreatedeliveryperson = `CREATE TABLE if not exists deliveryperson (D_ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, pass VARCHAR(200) NOT NULL, username VARCHAR(45) NOT NULL, name  VARCHAR(45), veh_num VARCHAR(45), avail VARCHAR(45));`;
db.query(sqlcreatedeliveryperson,(err,res)=>{
    if(err){
        console.log("ERROR")
    }else{
        console.log("created deliveryperson!")
    }    
})

const sqlcreatemanager = `CREATE TABLE if not exists manager (M_ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, pass VARCHAR(200) NOT NULL, username VARCHAR(45) NOT NULL, name  VARCHAR(45), num VARCHAR(45));`;
db.query(sqlcreatemanager,(err,res)=>{
    if(err){
        console.log("ERROR")
    }else{
        console.log("created manager!")
    }    
})

const sqlcreatecustomer = `CREATE TABLE if not exists customer (C_ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, pass VARCHAR(200) NOT NULL, username VARCHAR(45) NOT NULL, name VARCHAR(45), num VARCHAR(45), lastlogin VARCHAR(45));`;
db.query(sqlcreatecustomer,(err,res)=>{
    if(err){
        console.log("ERROR")
    }else{
        console.log("created customer!")
    }    
})

const sqlcreateorder = `CREATE TABLE if not exists orders (O_ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, C_ID INT, D_ID INT, item_type VARCHAR(45) NOT NULL, order_date VARCHAR(45) NOT NULL, weight VARCHAR(45) NOT NULL, pick_up_address VARCHAR(45) NOT NULL, destination_address VARCHAR(45) NOT NULL, delivery_status VARCHAR(45) NOT NULL, total_charge VARCHAR(45) NOT NULL, payment_status VARCHAR(45) NOT NULL, FOREIGN KEY (C_ID) REFERENCES customer(C_ID), FOREIGN KEY (D_ID) REFERENCES deliveryperson(D_ID));`;
db.query(sqlcreateorder,(err,res)=>{
    if(err){
        console.log("ERROR")
    }else{
        console.log("created orders!")
    }    
})

const sqlcreatefeedback = 'CREATE TABLE if not exists feedback (F_ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL, C_ID INT, comments VARCHAR(500) NOT NULL, FOREIGN KEY (C_ID) REFERENCES customer (C_ID))'
db.query(sqlcreatefeedback, (err, res) => {
  if (err) {
    console.log("ERROR")
  } else {
    console.log("created feedback!")
  }
})

function mustBeLoggedIn(req, res, next) {
  try  
  {jwt.verify(req.cookies.cookieToken.split(' ')[0], "jwtsecret", function (err, decoded) {
      if (err) {
        console.log('miss')
        res.send(false)
      } else {
        console.log('saf')
        next()
      }
      })
  }
  catch{
    console.log('err')
    res.send(false)
  }
}

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const phone = req.body.phone;
  const name = req.body.name;
  const lastlogin = Date.now();
  db.query(
    "SELECT * FROM customer WHERE username = ?;",
    [username],
    (err, result) => {
      if(err){
        console.log(err);}
      else{
        if (result.length == 0){
          hash = sha256(password);
          db.query(
            "INSERT INTO customer (username, pass, name, num, lastlogin) VALUES (?,?,?,?,?)",
            [username, hash,name,phone,lastlogin],
            (err, result) => {
              if(err){
                console.log(err);
              }
              else{
                res.send(true);}})
                  ;}
                  else{res.send("FALSE");}}});}
);

app.post("/registerdp",mustBeLoggedIn, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const vehicle_num = req.body.vehicle_num;
  const name = req.body.name;
  const avalibity = "Free";

  db.query(
    "SELECT * FROM deliveryperson WHERE username = ?;",
    [username],
    (err, result) => {
      if(err){
        console.log(err);}
      else{
        if (result.length == 0){
            hash = sha256(password);
            db.query(
              "INSERT INTO deliveryperson (pass, username, name, veh_num, avail) VALUES (?,?,?,?,?)",
              [hash, username,name,vehicle_num,avalibity],
              (err, result) => {
                if(err){
                  console.log(err);
                }
                else{
                db.query('Select * from deliveryperson where username = ?',[username], (err,result_1)=>{
                  db.query('Select min(O_ID) as O_ID from orders where delivery_status = "Order Placed" and payment_status = "Unpaid"', (err,result2)=>{
                    if (result2[0].O_ID === null){
                      db.query('Update deliveryperson set avail = "Free" where D_ID = ?',[result_1[0].D_ID]);
                    }
                    else{
                      db.query('Update orders set D_ID = ?,delivery_status =? where O_ID = ? and delivery_status = "Order Placed"', [result_1[0].D_ID,"Processing",result2[0].O_ID ]);
                      db.query('Update deliveryperson set avail = "Not Free" where D_ID = ?',[result_1[0].D_ID]);
                    }
                  })
                })                  
                  res.send(true);}});
                }
                else{res.send("FALSE");}
              }});
  }
);

app.post("/login/normaluser", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const lastlogin = Date.now()
  
  db.query(
    "SELECT * FROM customer WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {res.send({ err: err });}
      if (result.length > 0) {
          if (sha256(password)==result[0].pass) {
            db.query('UPDATE customer SET lastlogin = ? WHERE C_ID = ?;',[lastlogin,result[0].C_ID])
            const username = req.body.username
            const user = {name:username }
            var token = jwt.sign(user,"jwtsecret")
            const tosend = {accesstoken:token}
            token = token+" "+result[0].C_ID
            res.cookie("cookieToken", token)
            res.send(true)
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        }
      else {res.send({ message: "User doesn't exist" });}});}
);

app.post("/login/admin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM manager WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        if (sha256(password)==result[0].pass) {
            const username = req.body.username
            const user = {name:username }
            var token = jwt.sign(user,"jwtsecret")
            const tosend = {accesstoken:token}
            token = token+" "+result[0].C_ID
            res.cookie("cookieToken", token)
            res.send(true)
        }
        else {
          res.send({ message: "Wrong username/password combination!" });
        }
        }
      else {
        res.send({ message: "User doesn't exist" });}});}
);

app.post("/login/dp", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(password);
  db.query(
    "SELECT * FROM deliveryperson WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        if (sha256(password)==result[0].pass) {
            console.log("we r here");
            const username = req.body.username
            const user = {name:username }
            var token = jwt.sign(user,"jwtsecret")
            token = token+" "+result[0].D_ID
            res.cookie("cookieToken", token)
            res.send(true)
        }
        else {
          res.send({ message: "Wrong username/password combination!" });
        }
        }
      else {res.send({ message: "User doesn't exist" });}});}
);

//normal user

app.post("/feedback", mustBeLoggedIn, (req, res) => {
  const comments = req.body.comments
  const cid = req.cookies.cookieToken.split(' ')[1]
  db.query("INSERT INTO feedback (comments,C_ID) VALUES(?,?)",
  [comments,cid], (err, result) => {
    if (err) {
      console.log(err);
    
    } else {
      res.send(true);
    }
  });
});

app.post('/orderplace', mustBeLoggedIn, (req,res) => {
  const cid = req.cookies.cookieToken.split(' ')[1]
  const itemtype = req.body.item_type;
  const order_date =Date.now();
  const pickup = req.body.pickup;
  const destination = req.body.dest;
  const weight = req.body.weight;
  const total_charge = 200 + weight*500/10;
  const payment_status = "Unpaid";
  const deliverystatus = "Order Placed";

  var order_id = 0

  db.query("INSERT INTO orders (C_ID, item_type, order_date,weight, pick_up_address,destination_address,delivery_status,total_charge,payment_status) VALUES (?,?,?,?,?,?,?,?,?)",
  [cid,itemtype,order_date,weight,pickup,destination,deliverystatus,total_charge,payment_status], (err,result)=>{
  if(err){
    console.log(err);
  }else{
    res.send(true);
  }});
  db.query('select min(D_ID) as D_ID from deliveryperson where avail = "Free"',(err,result)=>{
    const dpid = result[0].D_ID
    if(result[0].D_ID === null)
    {
      console.log(cid)
    }
    else{
      console.log(result)
      db.query('Update orders set D_ID = ?,delivery_status = ? where C_ID = ? and item_type = ? and order_date = ?', [dpid,"Processing",cid,itemtype,order_date]);
      db.query('Update deliveryperson set avail = "Not Free" where D_ID = ?',[dpid]);
    }
  });

  
});

app.post("/ordertrack", mustBeLoggedIn, (req, res) => {
  const cid = req.cookies.cookieToken.split(' ')[1]

  db.query("SELECT * FROM orders where payment_status = 'Unpaid' and C_ID = ?",[cid], (err, result) => {
    if (err) {
      console.log(err)
    
    } else {
      console.log(result)
      res.send(result)
    }
  })
});

app.get("/orderhistory", mustBeLoggedIn, (req, res) => {
  const cid = req.cookies.cookieToken.split(' ')[1]
  console.log('f')
  db.query("SELECT * FROM orders where payment_status = 'Paid' and C_ID = ?",[cid], (err, result) => {
    if (err) {
      console.log(err)
    
    } else {
      console.log(result)
      res.send(result)
    }
  })
});

//normal end

//manager use cases

app.get('/revenuereport',mustBeLoggedIn, (req,res) => {
  db.query("SELECT * FROM orders WHERE payment_status = 'Paid'", (err, result) =>{
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.send(result);
    }
  })
})

app.post('/checkfeedback', mustBeLoggedIn, (req, res) =>{
  db.query("SELECT * FROM feedback", (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
});

app.post('/pendingorders', mustBeLoggedIn, (req, res) =>{
  db.query("SELECT * FROM orders WHERE payment_status = 'Unpaid'", (err, result) =>{
    if(err){
      console.log(err);
    }else{
      console.log(result)
      res.send(result);
    }
  })
});

app.get('/traffic', mustBeLoggedIn, (req, res) =>{
  const date = Date.now();

  db.query("SELECT username FROM customer WHERE lastlogin > ?",[date-(1000*60*60*24*7)], (err, result) =>{
    if(err){
      console.log(err);
    }else{
      console.log(result)
      res.send(result);
    }
  })
});

app.post('/favdest', mustBeLoggedIn, (req, res) =>{
  console.log('in')

  db.query("SELECT destination_address, count(destination_address) as times FROM orders group by destination_address order by times  DESC", (err, result) =>{
    if(err){
      console.log(err);
    }else{
      console.log(result)
      res.send(result);
    }
  })
});


//manager end

//DP use cases

app.post('/Packageweightverification',mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]
  const weight = req.body.data.weight;
  db.query('UPDATE orders SET weight = ? WHERE D_ID = ? and delivery_status = "Processing";',[weight,did], (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(true);
      console.log('update weighr')
    }
  })
  db.query('UPDATE orders SET total_charge = ? WHERE D_ID = ? and delivery_status = "Processing";',[200+weight*500/10,did], (err, result) =>{
    if(err){

    }else{
    }
  })

});

app.post('/pickup',mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]
  console.log(did);
  db.query('UPDATE orders SET delivery_status = ? WHERE D_ID = ? and delivery_status = "Processing"',["Shipping",did], (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(true);
    }
  })
});

app.post('/paymentup',mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]

  db.query('UPDATE orders SET payment_status = ? WHERE  delivery_status = "Shipping" and  D_ID = ?;',["Paid",did], (err, result) =>{
    if(err){
      
    }else{
      res.send(true);
      console.log(result)
    }
  })

});

app.post('/delivered',mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]
  console.log("delivered");
  db.query('UPDATE orders SET delivery_status = ? WHERE D_ID = ? and delivery_status = "Shipping"',["Delivered",did], (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(true);
    }});
  db.query('Select min(O_ID) as O_ID from orders where delivery_status = "Order Placed" and payment_status = "Unpaid"', (err,result)=>{
    if (result[0].O_ID === null){
      db.query('Update deliveryperson set avail = "Free" where D_ID = ?',[did]);
    }
    else{
      db.query('Update orders set D_ID = ?,delivery_status =? where O_ID = ? and delivery_status = "Order Placed"', [did,"Processing",result[0].O_ID ]);
    }
  });

});



// new get reqs exectued before input in dropdown
app.get('/packageweight', mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]

  db.query('Select C_ID from orders where D_ID = ? and delivery_status = "Processing"',[did], (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    } 
  })
});

app.get('/pickupupdate', mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]

  db.query('Select C_ID from orders where D_ID = ? and delivery_status = "Processing"',[did], (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
});

app.get('/paymentupdate', mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]

  db.query('Select C_ID from orders where D_ID = ? and delivery_status = "Shipping"',[did], (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
});

app.get('/deliveryupdate', mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]

  db.query('Select C_ID from orders where D_ID = ? and delivery_status = "Shipping"',[did], (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
});
//Dp use cases end

app.get('/api', (req,res)=>{
  res.send("HELLOO");
});


app.get('/validate',mustBeLoggedIn, (req,res)=>{
    res.send(true);
});

app.post('/dporder', mustBeLoggedIn, (req,res)=>{
  const did = req.cookies.cookieToken.split(' ')[1]
  db.query('Select * from orders where payment_status="Unpaid" and D_ID = ?', [did] , (err, result) =>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    } 
  })
})
app.post("/deletecookie",mustBeLoggedIn, (req,res)=>{
  const token = " "
  res.cookie("cookieToken", token);
  console.log("exit")
  res.send(true);
})

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running on port 3001");
});
