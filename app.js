//Tạo server
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

const index = require('./routes/index');
const {showOfficesDetails, addOffices, addOfficesSubmit, editOffices, editOfficesSubmit, deleteOffices} = require('./routes/offices');
const {showEmployees, showEmployeesDetail, addEmployees,addEmployeesSubmit, editEmployees, editEmployeesSubmit, deleteEmployees} = require('./routes/employees');

app.listen(8080, function(){
console.log('Server is running on Localhost:8080 ...')
});

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Routing Office
app.get("/", index);

app.get("/offices/add", addOffices);
app.post("/offices/add",addOfficesSubmit);
app.get("/offices/:officeCode",showOfficesDetails);
app.get("/offices/edit/:officeCode",editOffices);
app.post("/offices/edit/:officeCode",editOfficesSubmit);
app.get("/offices/delete/:officeCode",deleteOffices);

//Routing Employees
app.get("/offices/employees/add", addEmployees);
app.post("/offices/employees/add", addEmployeesSubmit);
app.get("/offices/employees/:officeCode",showEmployees);
app.get("/offices/employees/:officeCode/:employeeNumber",showEmployeesDetail);
app.get("/offices/employees/:officeCode/edit/:employeeNumber", editEmployees);
app.post("/offices/employees/:officeCode/edit/:employeeNumber", editEmployeesSubmit);
app.get("/offices/employees/:officeCode/delete/:employeeNumber", deleteEmployees);


//E JS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");
app.use(express.static(__dirname + "/public"));



//Database
const mysql = require('mysql');
const db = mysql.createConnection ({
host: 'localhost',
user: 'root',
password: '123456',
database: 'myoffice'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;