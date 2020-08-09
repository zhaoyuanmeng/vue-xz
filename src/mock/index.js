import Mock from 'mockjs'
import homeApi from './home'
import userApi from './user'
import permissionApi from './permission'

// 相当于这个文件是mock处理程序的入口文件他加载其他的模块

// 设置一个延时200-2000ms来模拟真实的情景
Mock.setup({
	timeout: '200-2000'
})

// 首页相关  
// 第一个参数表示要拦截的路径 ajax请求的地址  
// 第二个参数是拦截的方法是啥 get post 
// 第三个参数是返回的数据 是一个函数
Mock.mock(/\/home\/getData/,'get',homeApi.getStatisticalData)


// 用户相关
// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// 权限相关
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)