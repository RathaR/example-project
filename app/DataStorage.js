var _ = require('lodash');
var fs = require('fs');

function saveToFile(data, file) {
	fs.writeFileSync('file', JSON.stringify(data), 'utf8');
}

var DataStorage = function(data, file) {
	this._file = file || '';
	this._data = data || [];
};

DataStorage.prototype.getAll = function() {
	return this._data.slice();
};

DataStorage.prototype.getOne = function(id) {
	var allData = this.getAll();
	return _.chain(allData)
		.filter({_id : id})
		.first()
		.value();
};

DataStorage.prototype.filter = function(filter) {
	return _.filter(this._data, filter);
};

DataStorage.prototype.save = function(object) {
	if(!object || !object._id) {
		throw new Error('Invalid object');
	}
	var stored = this.getOne(object._id);
	if(!stored) {
		this._data.push(object);
	} else {
		_.assign(stored, object);
	}
	saveToFile(this._data, this._file);
};

module.exports = DataStorage;