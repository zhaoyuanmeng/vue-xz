<template>
 <div class="tabs">
	 	<!-- home首页不能关闭 -->
	  <el-tag :key="tag.name"
          v-for="tag in tabs"
          :closable="tag.name!== 'home'"
          :disable-transitions="false"
          @close="handleClose(tag)"
					@click="changeMenu(tag)"
					>
    {{tag.label}}
  </el-tag>
 </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data () {
    return {
      // dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
			inputValue: ''
    };
	},
  methods: {
		changeTheme(tag){
			return this.$route.name === tag.name ? 'dark':'Plain'
		},
		changeMenu(item){
				this.$router.push({ name: item.name})
				this.$store.commit('selectMenu',item)	
		},
    handleClose (tag) {
			let res = this.$store.state.tab.tabs[0]
		 this.$router.push({ name: 'home'})
		//  进行面包屑的操作
     this.close(tag)
		},
		...mapMutations({
			close:'closeTab'
		})
	},
	computed: {
		
		...mapState({
			tabs:state=>state.tab.tabs
		})
	}
}
</script>

<style lang="scss" scoped>
.tabs	{
	padding: 20px;
	.el-tag	{
		margin-right: 15px;
		// 加个手指
		cursor: pointer;
	}
}
</style>