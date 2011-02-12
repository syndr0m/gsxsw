function Channel(name) {
	this.name = name;
	this.messages = new Array();
}

// push a message
Channel.prototype.push = function (message) {
	this.messages.push(message);
};

// pull num messages 
Channel.prototype.pull = function (num) {
	var r = [], m = this.messages, l = m.length;
	while (num) { var i = l - num; if (i in m) r.push(m[i]); num-- }
	return r;
};

module.exports = Channel;
