const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {

	const Progres = sequelize.define('Progres', {
		userId: { type: DataTypes.INTEGER },
		varId: { type: DataTypes.INTEGER },
		time_left: { type: DataTypes.INTEGER, defaultValue: 5000 },
		done: { type: DataTypes.BOOLEAN, defaultValue: false },
		problems: { type: DataTypes.JSON },
		state: { type: DataTypes.INTEGER, defaultValue: 0 },
	},{ timestamps: true });
	
	Progres.createProgres = function (userId, varId, problems, callback) {
		this.create({
			userId: userId, 
			varId: varId,
			problems: problems, 
		}).then((progres) => {
			callback(null, progres);
		}).catch(function (err) {
			callback(err, null);
		});
	}
	
	Progres.findProgres = function (id, userId, callback) {
		this.findOne(
		{
			where: { id: id },
			attributes: ['id', 'userId', 'body'],
			rejectOnEmpty: true
		}
		).then((progres) => {
			if (progres.userId === userId) {
				callback(null, progres.toJSON());
			} else {
				throw ({name: 'IncorrectUser'});
			}
		}).catch(function (err) {
			callback(err, null);
		});
	}
	
	return Progres;
};

