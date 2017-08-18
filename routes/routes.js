var mongoose = require( 'mongoose' );

exports.home = function (req, res) {
  res.json({
    message: "Hooray! Welcome to Employee Management System",
    status: "Success"
  });
}
