const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {

	const Variant = sequelize.define('Variant', {
		body: { type: DataTypes.JSON },
		subject: { type: DataTypes.STRING },
		grade: { type: DataTypes.STRING },
	},{ timestamps: false });
	
	Variant.getVariant = function (varId, callback) {
		this.findOne(
		{
			where: { id: varId },
			attributes: ['id', 'body'],
			rejectOnEmpty: true
		}
		).then((variant) => {
			callback(null, variant);
		}).catch(function (err) {
			callback(err, null);
		});
	}
	
	return Variant;
};

