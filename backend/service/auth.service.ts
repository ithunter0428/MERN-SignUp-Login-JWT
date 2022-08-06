const db = require("../app/model/db");
const Model = require("./userModel")(db.sequelize, db.Sequelize);

class AuthService {
    async createUser(data:any) {
      try {
        const user = Model.build(data)
        await user.save()
      } catch (err) {
        throw new Error()
      }
    }
    async findUserByEmail(email: string) {
      return Model.findOne({
        email: email,
      }).exec()
    }
  }
  export default new AuthService()