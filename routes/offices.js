module.exports = {
    showOfficesDetails: function(req, res){
        let query = "SELECT * FROM `offices` WHERE officeCode = '" + req.params.officeCode + "'";
        // console.log(query);
        db.query(query, (err, result) => {
            res.render('offices',{title: 'My Office', offices : result[0]})
        })
    },
    addOffices: function(req, res){
        let query = "SELECT * FROM `offices`";
        // console.log("run to here");
        
        db.query(query, (err, result) =>{
            res.render('officesAdd',{title: 'My Office', offices : result})
        })
    },
    addOfficesSubmit: function(req, res){
        // console.log("run to here");
        let query = `INSERT INTO \`offices\` VALUES ("${req.body.officeCode}",
        "${req.body.city}",
        "${req.body.phone}",
        "${req.body.addressLine1}",
        "${req.body.addressLine2}",
        "${req.body.state}",
        "${req.body.country}",
        "${req.body.postalCode}",
        "${req.body.territory}")`;
        // console.log(query);
        db.query(query, (err, result) => {
            // console.log(result);
            
            res.redirect('/offices/' + req.body.officeCode)
        })
    },
    editOffices: function(req, res){
        let query = "SELECT * FROM `offices` WHERE officeCode = " + req.params.officeCode + "";
        // console.log(query);
        
        db.query(query, (err, result) =>{
            res.render('officesEdit',{title: 'My Office', offices : result})
        })
    },
    editOfficesSubmit: function(req, res){
        // console.log(req.body);
        
        let query = `UPDATE \`offices\` SET 
        city ="${req.body.city}", 
        phone ="${req.body.phone}", 
        addressLine1="${req.body.addressLine1}", 
        addressLine2="${req.body.addressLine2}", 
        state="${req.body.state}", 
        country="${req.body.country}", 
        postalCode="${req.body.postalCode}", 
        territory="${req.body.territory}" WHERE officeCode="${req.params.officeCode}"`;

        // console.log(query);
        
        db.query(query, (err, result) => {
            // console.log(result);
            
            res.redirect('/offices/' + req.params.officeCode)
        })
    },
    deleteOffices: function(req, res){
        let query1 = "DELETE FROM `employees` WHERE officeCode=" + req.params.officeCode + "";
        let query2 = "DELETE FROM `offices` WHERE officeCode=" + req.params.officeCode +"";
        // console.log(query);
        db.query(query1, (err, result1) =>{
            // console.log(result);
            db.query(query2, (err, result2) => {
                res.redirect('/')
            })
        })
    }
}