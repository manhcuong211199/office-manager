module.exports = {
    showEmployees: function(req, res){
        let query = "SELECT * FROM `employees` WHERE officeCode=" + req.params.officeCode + "";
        db.query(query, (err, result) =>{
            res.render('employees', {title: 'My Office', employees : result})
        })
    },
    showEmployeesDetail: function(req,res){
        let query = "SELECT * FROM `employees` WHERE employeeNumber=" + req.params.employeeNumber + "";
        db.query(query, (err, result) =>{
            res.render('employeesDetail',{title:'My Office', employees : result[0]})
        })
    },
    addEmployees: function(req, res){
        let query = "SELECT * FROM `employees`";
        db.query(query, (err, result) =>{
            res.render('employeesAdd',{title: 'My Office', employees : result})
        })
    },
    addEmployeesSubmit: function(req, res){
        let query = `INSERT INTO \`employees\` VALUES ("${req.body.employeeNumber}",
        "${req.body.lastName}",
        "${req.body.firstName}",
        "${req.body.extension}",
        "${req.body.email}",
        "${req.body.officeCode}",
        "${req.body.reportsTo}",
        "${req.body.jobTitle}")`;
        // let query = "INSERT INTO `employees` VALUES('"
        //     + req.body.employeeNumber + "','" + req.body.lastName + "','"
        //     + req.body.firstName + "','" + req.body.extension + "','"
        //     + req.body.email + "','" + req.body.officeCode + "',"
        //     + req.body.reportsTo + ",'" + req.body.jobTitle + "')"
        console.log("query",query);
        // if (req.body.reportsTo == '') {
        //     req.body.reportsTo = null;
        // };
        
        db.query(query, (err, result) =>{
            console.log(result);
            res.redirect('/offices/employees/' + req.body.officeCode)
        })
    },
    editEmployees: function(req, res){
        let query = "SELECT * FROM `employees` WHERE employeeNumber =" + req.params.employeeNumber + "";
        db.query(query, (err, result) => {
            res.render('employeesEdit', {title: 'My Office', employees : result})
        })
    },
    editEmployeesSubmit: function(req, res){
        let query = `UPDATE \`employees\` SET 
        lastName="${req.body.lastName}", 
        firstName="${req.body.firstName}", 
        extension="${req.body.extension}", 
        email="${req.body.email}", 
        officeCode="${req.body.officeCode}", 
        reportsTo="${req.body.reportsTo}", 
        jobTitle="${req.body.jobTitle}" WHERE employeeNumber="${req.params.employeeNumber}"`;
        console.log("query edit:", query);
        
        db.query(query, (err, result) =>{
            // console.log("result edit:", result);
            
            res.redirect('/offices/' + req.body.officeCode + '/employees/' + req.params.employeeNumber)
        })
    },
    deleteEmployees: function(req, res){
        let query = "DELETE FROM `employees` WHERE employeeNumber=" + req.params.employeeNumber + "";
        db.query(query, (err, result) => {
            res.redirect('/offices/employees/' + req.params.officeCode)
        })
    }
}