const Service = require("egg").Service;
class StudentService extends Service {
  async getStudentList() {
    try {
      const StudentList = await this.app.model.Student.findAll();
      return StudentList;
    } catch (error) {
      return null;
    }
  }
  async createStudentList(name, age, birth, about) {
    try {
      await this.app.model.Student.create({
        name,
        age,
        birth,
        about,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
module.exports = StudentService;
