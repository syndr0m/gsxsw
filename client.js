function Client(line, clients, channels) {
	this.line = line; // socket
	this.clients = clients;
	this.channels = channels;
	this.registered = new Array(); // list of channel Names.
	console.log('new client');
}

Client.prototype.register = function (channelName) {
	this.registered.push(channelName);
	console.log(channelName+' registered');
};

// push a message into a channel
Client.prototype.push = function (channelName, message) {
	// saving messages
	var channel = this.channels.findOrCreate(channelName);
	channel.push(message);
	// sending it to clients (FIXME: bad algorithm)
	var self = this;
	var serializedMessage = JSON.stringify(['display', channelName, message]);
	this.clients.forEach(function (c) {
		if (c.registered.indexOf(channelName) >= 0) {
			c.line.send(serializedMessage);
			console.log('sending message : '+serializedMessage);
		}
	});
};

// pull num messages from a channel
Client.prototype.pull = function (channelName, num) {
	var channel = this.channels.findOrCreate(channelName);
	var messages = [];
	if (channel)
		messages = channel.pull(num);
	var self = this;
	messages.forEach(function (m) {
		var serializedMessage = JSON.stringify(['display', channelName, m]);
		self.line.send(serializedMessage);
		console.log('sending message : '+serializedMessage);
	});
};

module.exports = Client;
