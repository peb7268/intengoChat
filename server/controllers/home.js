
var home 	= {};

home.index 	= function(req, res){
	res.send('<h1>Hello world yo</h1>');
};

module.exports = home;