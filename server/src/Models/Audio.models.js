module.exports.AudioModels = (sequelize, DataTypes)=>{
	return sequelize.define('song',{
		id:{
			type: DataTypes.INTEGER,
			autoIncrement : true,
			primaryKey: true
		},
		songDescription : {
			type: DataTypes.STRING ,
			allowNull: false
		},
		source : {
			type: DataTypes.STRING,
			allowNull : false
		}		
	},{
		timestamps:true,
		createdAt: 'created',
		updatedAt: true 
	})
}