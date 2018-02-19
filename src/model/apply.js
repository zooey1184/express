import db from '../db'
import sequelize from 'sequelize'

// 创建表
export const ApplyCard = db.define('applyCard', {
	// 表格类型参数等等
	// id, createdAt, updatedAt, deletedAt,
	cardId: sequelize.INTEGER,
	uid: sequelize.INTEGER,
	cardName: sequelize.STRING,

}, {
	// updatedAt: false,
})

// 初始化表
ApplyCard._init = () => {
	ApplyCard.drop();
	ApplyCard.sync();
	// 
}

ApplyCard.sync()
 