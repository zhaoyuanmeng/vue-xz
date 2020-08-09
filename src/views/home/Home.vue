<template>
  <el-row class="home"
          :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover"
               style="">
        <div class="user">
          <img :src="userImg"
               alt="" />
          <div class="userinfo">
            <p class="name">zyd</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="loginfo">
          <p>上次的登录时间：<span>2020-6-6</span></p>
          <p>上次的登录时间：<span>2020-6-6</span></p>
        </div>
      </el-card>
      <el-card shadow="hover"
               style="height:522px;margin-top:20px">
        <el-table :data="tableData">
          <el-table-column show-overflow-tooltip
                           v-for="(val,key) in tableLabel"
                           :key="key"
                           :prop="key"
                           :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover"
                 v-for="item in countData"
                 :key="item.name"
                 :body-style="{display:'flex'}">
          <i :class="`el-icon-${item.icon}`"
             class="icon"
             :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart style="height:280px;magin-top:20px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="tu">
        <el-card shadow="hover">
          <echart style="height:260px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart style="height:260px" :chartData="echartData.video" :isAxisChart="false"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import echart from '../../components/Echart'
export default {
  components: {
    echart
  },
  data () {
    return {
      userImg: require('../../assets/imgs/tx.jpg'),
      tableData: [],
      tableLabel: {
        monthBuy: '本月购买',
        totalBuy: '总购买',
        todayBuy: '今日购买',
        name: '课程名'
      },
      echartData: {
				// 第一个图表的数据配置
        order: {
          xData: [],
          series: []
        },
        video: {
          series: []
        },
        user: {
					xData: [],
          series: []
        }
      },
      countData: [
        {
          name: '哈哈哈1',
          value: 1234,
          icon: 'success',
          color: 'red'
        },
        {
          name: '哈哈哈2',
          value: 1234,
          icon: 'success',
          color: 'red'
        },
        {
          name: '哈哈哈3',
          value: 1234,
          icon: 'success',
          color: 'red'
        },
        {
          name: '哈哈哈4',
          value: 1234,
          icon: 'success',
          color: 'red'
        },
        {
          name: '哈哈哈5',
          value: 1234,
          icon: 'success',
          color: 'red'
        },
        {
          name: '哈哈哈6',
          value: 1234,
          icon: 'success',
          color: 'red'
        }
      ]

    }
  },
  mounted () {

  },
  methods: {
    getTabData () {
      this.$http.get('/home/getData').then(
        res => {
          res = res.data
					this.tableData = res.data.tableData
					const order = res.data.orderData
					// 第一个图的数据
					this.echartData.order.xData = order.date
					//因为series里面的数据是相同的name的数据 所以思路是按照相同的key值存放数据
					// 第一步找出所有的name 也就是键值
					let keyArray = Object.keys(order.data[0])
					// console.log(res.data)
					keyArray.forEach(key=>{
						this.echartData.order.series.push({
							name:key,
							data:order.data.map(item=>item[key]),
							type:'line'
						})
					})
					//  console.log(this.echartData.order.series)
				// 第二个图的数据
					const video = res.data.videoData
					this.echartData.video.series.push({
						data: video,
            type: 'pie'
					})
				// 第三个图的数据
				 const user = res.data.userData
				 this.echartData.user.xData = user.map(item => item.date)
         this.echartData.user.series.push({
					name: '新增用户',
          data: user.map(item => item.new),
          type: 'bar'
					})
					this.echartData.user.series.push({
					name: '活跃用户',
          data: user.map(item => item.active),
					type: 'bar',
					barGap: 0
					})

        },
        err => {
          console.log(err)
        }
      )
    }
	},
	// 组件数据渲染之前的操作 一般都是获取ajax数据
  created () {
    this.getTabData()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home.scss";
</style>