import { execute } from "../../services/mysql-connector";

class User {
  constructor() {
    this.findAll = this.findAll.bind(this);
  }

  async findAll() {
    const users = await execute(`SELECT * FROM user`, [])
    return users
  }

  async findByEmail(email: string) {
    const user = await execute(`SELECT * FROM user WHERE email = ?`, [email]).then((res: any) => res[0])
    return user
  }
}

export default new User();