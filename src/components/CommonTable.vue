<template>
  <div class="common-tab">
    <el-table :data="tableData"
              height="90%"
              stripe
              v-loading="config.loading">
      <el-table-column label="序号"
                       width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page-1)*20 + scope.$index +1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip
                       v-for="item in tableLabel"
                       :key="item.prop"
											 width="200"
                       :label="item.label">
        <template slot-scope="scope">
          <!-- 这里是针对于整个table的行循环来说的 相当于双重循环 row是行 这里面还有一个列循环拿到键值 -->
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       min-width="180">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pager"
                   layout="prev, pager, next"
                   :total="config.total"
                   :current-page.sync="config.page"
                   @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    handleEdit (row) {
      // 把子组件里面的值传给父组件 让父组件处理以后重新渲染数据
      this.$emit('edit', row)
    },
    handleDelete (row) {
      this.$emit('del', row)
    },
    changePage (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-tab {
  height: calc(100% - 60px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>