import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
	// 请求超时时间
	timeout:3000
})

// 请求拦截器（主要是给请求头加东西比如token）
service.interceptors.request.use(
	config => {
		return config
	},
	err => {
		console.log(err)
	}
)
// 响应的拦截器
service.interceptors.response.use(
	response => {
		let res = {}
		// 相当于接受返回的数据
		res.status = response.status
		res.data = response.data
		return res
	},
	err =>	{
		console.log(err)
	}
)
export default service