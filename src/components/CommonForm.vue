<template>
  <el-form :model="form"
           ref="form"
           :inline="inline"
           label-width="100px">
    <el-form-item v-for="item in formLabel"
                  :key="item.model" :label="item.label">
      <el-input v-model="form[item.model]"
                :placeholder="'请输入'+item.label"
                v-if="!item.type"></el-input>
      <el-select v-model="form[item.model]"
                 placeholder="请选择"
                 v-if="item.type === 'select'">
        <el-option v-for="item in item.options"
                   :label="item.label"
                   :key="item.value"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-switch v-model="form[item.model]"
                 v-if="item.type === 'switch'">
      </el-switch>
      <el-date-picker v-model="form[item.model]"
                      type="date"
                      placeholder="选择日期"
                      v-if="item.type === 'date'"
                      value-format="yyyy-MM-dd"> 
      </el-date-picker>
    </el-form-item>
    <!-- 设置一个插槽 因为按钮数量不固定 -->
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    // 绑定的数据
    form: Object,
    // 绑定的类型 和label名字
    formLabel: Array,
    // 默认是false 行内表单
    inline: Boolean
  }
}
</script>

<style lang="scss" scoped>
</style>