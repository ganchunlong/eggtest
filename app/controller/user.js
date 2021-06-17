"use strict";

const Controller = require("egg").Controller;
let demo = [
  {
    id: 1,
    username: "用户名",
    nickname: "昵称",
    sex: "男",
  },
  {
    id: 2,
    username: "用户名",
    nickname: "昵称",
    sex: "男",
  },
  {
    id: 3,
    username: "用户名",
    nickname: "昵称",
    sex: "男",
  },
  {
    id: 4,
    username: "用户名",
    nickname: "昵称",
    sex: "男",
  },
];
class UserController extends Controller {
  //用户列表
  async index() {
    let result = [];
    let page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1;
    let limit = this.ctx.query.pagesize
      ? parseInt(this.ctx.query.pagesize)
      : 10;

    let offset = (page - 1) * limit;
    //url参数  query this.ctx.query.id
    //响应
    let Op = this.app.Sequelize.Op;
    result = await this.app.model.User.findAndCountAll({
      where: {
        sex: "男",
        // username: {
        //   [Op.like]: "%用户%",
        // },
        // id: {
        //   [Op.gt]: 6,
        // },
      },
      //attributes:['id','username','sex]
      attributes: {
        //排除字段
        exclude: ["password"],
      },
      order: [
        ["id", "DESC"],
        ["updated_at", "DESC"],
      ],
      offset,
      limit,
    });
    // result = await this.app.model.User.findAndCountAll();
    this.ctx.body = {
      msg: "ok",
      data: result,
    };
    //修改状态码
    // this.ctx.status = 201;
  }
  //读取用户数据
  async read() {
    let id = parseInt(this.ctx.params.id);
    // let detail = demo.find((item) => item.id == id);
    //通过主键查询单个数据
    // let detail = await this.app.model.User.findByPk(id);
    let detail = await this.app.model.User.findOne({
      where: {
        id,
        sex: "男",
      },
    });
    if (!detail) {
      return (this.ctx.body = {
        msg: "fail",
        data: "用户不存在",
      });
    }
    this.ctx.body = {
      msg: "ok",
      data: detail,
    };
  }
  async create() {
    // this.ctx.throw(500,"测试");
    //参数验证 写入数据库
    // let res = await this.app.model.User.create({
    //   username: "ceshi",
    //   password: "123456",
    //   sex: "女",
    // });

    //参数验证
    this.ctx.validate({
      username: {
        type: "string",
        required: true,

        desc: "用户名",
      },
      password: { type: "string", required: true, desc: "密码" },
      sex: { type: "string", required: false, desc: "性别", defValue: "男" },
    });
    // 批量新增
    let res = await this.app.model.User.bulkCreate([
      {
        username: "用户11",
        password: "123456",
        sex: "男",
      },
      {
        username: "用户21",
        password: "123456",
        sex: "男",
      },
      {
        username: "用户31",
        password: "123456",
        sex: "男",
      },
      {
        username: "用户41",
        password: "123456",
        sex: "男",
      },
      {
        username: "用户51",
        password: "123456",
        sex: "男",
      },
      {
        username: "用户61",
        password: "123456",
        sex: "男",
      },
    ]);
    this.ctx.body = res;
  }
  //创建用户 post
  async update() {
    let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
    let data = await this.app.model.User.findByPk(id);
    if (!data) {
      return (this.ctx.body = {
        msg: "fail",
        data: "该记录不存在",
      });
    }
    // data.username = "被修改了";
    // let res = await data.save();
    // let res = await data.save({
    //   fields:['username']限制
    // });
    let params = this.ctx.request.body;
    let res = await data.update(params, {
      fields: ["username"],
    });
    this.ctx.body = {
      msg: "ok",
      data: res,
    };
  }
  async destroy() {
    // let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
    // let data = await this.app.model.User.findByPk(id);
    // if (!data) {
    //   return (this.ctx.body = {
    //     msg: "fail",
    //     data: "该记录不存在",
    //   });
    // }
    // let res = await data.destroy();
    // return (this.ctx.body = {
    //   msg: "ok",
    //   data: res,
    // });
    // 批量删除
    let Op = this.app.model.Sequelize.Op;
    let res = await this.app.model.User.destroy({
      where: {
        id: {
          [Op.lte]: 7,
        },
      },
    });
    this.ctx.body = {
      msg: "ok",
      data: res,
    };
  }
}

module.exports = UserController;
