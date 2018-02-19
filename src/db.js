// 数据库关联
import Sequelize from 'sequelize'

const sequelize = new Sequelize('nodeTest', 'root', 'weiying_199125', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

export default sequelize
