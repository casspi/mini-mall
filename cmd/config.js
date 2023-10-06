// 整个打包项目的配置文件 该配置只在打包的时候参与作用 不会打包进入实际业务代码

// directory 配置
const directoryConfig = {
  // 根目录遍历(开发目录最好不要改不然很多配置都得改)
  rootDirectoryPath: '/src/',
  // 排除遍历的目录
  excludeDirectory: [
    'assets',
    'wxs',
    'config',
    'mixins',
    'plugins',
    'utils',
  ],
  // 遍历文件的后缀名
  includeExtName: ['.js', '.wxs'],
  // 输出根目录(完全可以改)
  rootOutputPath: '/dist/',
};

module.exports = {
  directoryConfig,
};
