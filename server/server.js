import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

//controllers
//user function handlers
import UserLoginHandler from './controllers/user/userLoginHandler.js';
import UserRegisterHandler from './controllers/user/UserRegisterHandler.js';
import RequestClassHandler from './controllers/bloodbank/RequestClassHandler.js';

//employee function handlers
import EmployeeLoginHandler from './controllers/employee/EmployeeLoginHandler.js';
import EmployeeRegisterHandler from './controllers/employee/EmployeeRegisterHandler.js';
import UpdateBlood from './controllers/bloodbank/UpdateStockHandler.js';
import UpdateHealthHandler from './controllers/bloodbank/UpdateHealthHandler.js';
import HandleRequestHandler from './controllers/bloodbank/HandleRequestHandler.js';

//dashboard
import DashboardHandler from './controllers/dashboard/DashboardHandler.js';
import SearchHandler from './controllers/bloodbank/SearchHandler.js';

//create the app
var app = express();

// middilewares set app to use the body-parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bbms',
});

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

//multer usage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

//test image
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file.filename);
  const image = req.file.filename;
  const sql = 'UPDATE images SET image=?';
  const sql2 = 'INSERT into images (image) VALUES(?)';
  db.query(sql2, [image], (err, result) => {
    if (err) return res.json({ msg: 'err' });
    return res.json({ status: 'suckass' });
  });
});

app.get('/', (req, res) => {
  const sql = 'Select image from images where id in (select max(id) from images)';
  db.query(sql, (err, result) => {
    if (err) return res.json('Error');
    return res.json(result);
  });
});

//Get empReg
app.get('/emp/overview', (req, res) => {
  const sql = 'Select image, empName, empMail from emp_details';
  db.query(sql, (err, result) => {
    if (err) return res.json('Error');
    return res.json(result);
  });
});

//user functionalities
UserRegisterHandler(app, db);
UserLoginHandler(app, db);
RequestClassHandler(app, db);

//employee functionalities
EmployeeRegisterHandler(app, db);
EmployeeLoginHandler(app, db);
UpdateHealthHandler(app, db);
HandleRequestHandler(app, db);

//bloodbank functionalities
DashboardHandler(app, db);
UpdateBlood(app, db);
SearchHandler(app, db);

//listening the port
app.listen(3001, (err) => {
  if (err) throw err;
  else console.log('listening to port : 3001');
});
