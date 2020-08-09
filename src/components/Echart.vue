<template>
  <div style="height:100%" ref="echart">
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default () {
        return {
          // 行下标数据
          xData: [],
          // 主要数据是从series拿的
          series: []
        }
      }
    },
    // 检查是否是带坐标轴的图标 默认是
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 通过判断来确定使用哪个配置选项
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  },
  // 什么时候触发图表的渲染工作呢 就是当chart数据发生变化的时候
  // 监听对象的时候用深度监听
  watch: {
    chartData: {
      handler: function () {
        this.initChart()
      },
      deep: true
    },
    // 监视有没有点击收缩
    isCollapse(){
      setTimeout(
        ()=>{
          this.resizeChart()
        },
        300
      )
    }
  },
  data () {
    return {
      echart: null,
      // 带坐标的配置
      axisOption: {
				grid:{
					left:'10%'
				},
				tooltip:{
					trigger:'axis'
				},
				legend:{
					textStyle:{
						color:'#333'
					}
				},
        xAxis: {
          type: 'category',
					data: [],
					axisLine:{
						lineStyle:{
							color: '#17b3a3'
						}
					},
					axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
					type: 'value',
					axisLine: {
            lineStyle: {
              color: '#17b3a3'
            	}
            }
        },
				series: [],
				color:[
					'#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
				]
      },
      // 不带坐标坐标的配置
      normalOption: {
				tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      },
    }
  },
  methods: {
    // 初始化echart
    initChart () {
      // 先处理初始化数据
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    //因为图表的类型不同处理的数据方式也不同 所在在这里处理下
    initChartData () {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        // 不带坐标轴
        this.normalOption.series = this.chartData.series
      }
    },
    // 重新计算图表尺寸
    resizeChart(){
      this.echart ? this.echart.resize():''
    }

  },
  // 组件渲染以后触发的钩子函数
  mounted () {
    // 监听revise事件 也就是尺寸更改触发的事件
    window.addEventListener('resize',this.resizeChart)
  },
  destroyed () {
    // 防止内存泄漏 在回收之前释放
    window.removeEventListener('resize',this.resizeChart)
  }
}
</script>

<style lang="scss" scoped>
</style>