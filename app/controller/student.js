"use strict";

const Controller = require("egg").Controller;

class StudentController extends Controller {
  async index() {
    const list = await this.ctx.service.student.getStudentList();
    if (list) {
      this.ctx.body = {
        code: 2000,
        date: list,
      };
    } else {
      this.ctx.body = {
        code: 5000,
        msg: "服务器异常",
      };
    }
  }
  async new() {}
  async create() {
    const name = this.ctx.request.body.name;
    const age = this.ctx.request.body.age;
    const birth = this.ctx.request.body.birth;
    const about = this.ctx.request.body.about;
    const res = await this.ctx.service.student.createStudentList(
      name,
      age,
      birth,
      about
    );
    if (res) {
      this.ctx.body = {
        code: 2000,
        msg: "添加成功",
      };
    } else {
      this.ctx.body = {
        code: 5000,
        msg: "添加失败",
      };
    }
  }

  async show() {}
  async edit() {}
  async destroy() {
    const id = this.ctx.params.id;
    await this.app.model.Student.destroy({
      where: {
        id,
      },
    });
    this.ctx.body = "删除成功";
  }
  async update() {
    const id = this.ctx.params.id;
    const name = this.ctx.request.body.name;
    const age = this.ctx.request.body.age;
    const about = this.ctx.request.body.about;
    await this.app.model.Student.update(
      {
        name,
        age,
        about,
      },
      {
        where: {
          id,
        },
      }
    );
    this.ctx.body = "修改成功";
  }
}

module.exports = StudentController;
