module.exports =  function(req, res) {
    let query = "SELECT * FROM `offices`";
    db.query(query, (err, result) => {
        res.render('index', { title: 'My Office', offices : result});
    });
 };