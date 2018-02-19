import db from '../db'
import sequelize from 'sequelize'

// 创建表
export const User = db.define('user', {
	// 表格类型参数等等
	// id, createdAt, updatedAt, deletedAt,
	userId: sequelize.INTEGER,
	user: sequelize.STRING,
	password: sequelize.STRING,
}, {
	// updatedAt: false,
})

// 初始化表
User._init = () => {
	User.drop();
	User.sync();
	//
}

User.sync()
