module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  /* 默认情况下sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数, +s ,
  最后一个字母带s就不加*/
  const Student = app.model.define("student", {
    // 自动生成id
    name: STRING,
    age: INTEGER,
    birth: DATE,
    about: TEXT,
  });
  return Student;
};
