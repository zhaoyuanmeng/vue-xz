<template>
  <div class="manage">
    <el-dialog :title="operateType ==='edit'?'更新用户':'增加用户'"
               :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel"
                   :form="operateForm">
      </common-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="isShow = true">+ 新增</el-button>
      <common-form inline
                   :formLabel="formLabel"
                   :form="serchForm">
        <el-button type="primary"
                   @click="serach">搜索</el-button>
        <el-dialog title="搜索结果"
                   :visible.sync="serachShow">
          <el-table :data="gridData">
            <el-table-column property="name"
                             label="姓名"
                             width="150"></el-table-column>
            <el-table-column property="age"
                             label="年龄"
                             width="200"></el-table-column>
            <el-table-column property="sexLabel"
                             label="性别"></el-table-column>
            <el-table-column property="addr"
                             label="地址"></el-table-column>
          </el-table>
        </el-dialog>
      </common-form>
    </div>
    <common-table :tableLabel="tableLabel"
                  :config="config"
                  :tableData="tableData"
                  @changePage="changePage"
                  @edit="editUser"
                  @del="delUser">
    </common-table>

  </div>
</template>

<script>
import CommonTable from '../../components/CommonTable'
import CommonForm from '../../components/CommonForm'
export default {
  components: {
    CommonTable,
    CommonForm
  },
  data () {
    return {
      operateType: 'add',
      isShow: false,
      serachShow: false,
      gridData: [],
      config: {
        page: 1,
        // 分多少也
        total: 20,
        // 加载状态
        ladding: false
      },
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: "姓名"
        },
        {
          prop: 'age',
          label: "年龄"
        },
        {
          prop: 'sexLabel',
          label: "性别"
        },
        {
          prop: 'birth',
          label: "出生日期"
        },
        {
          prop: 'addr',
          label: "地址"
        },
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          options: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址'
        }
      ],
      serchForm: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          options: []
        },
      ]
    }
  },
  methods: {
    getList (name = '') {
      this.config.loading = true
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : ''
      this.$http
        .get('/api/user/getUser', {
          params: {
            page: this.config.page,
            name
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            // console.log(item)
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
        })
    },
    // 编辑的操作
    editUser (val) {
      this.isShow = true
      this.operateType = 'edit'
      this.operateForm = val
    },
    // 删除的操作
    delUser (val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        // 删除数据在这里
        let id = val.id
        this.$http.get('/api/user/del', {
          params: {
            id
          }
        }).then(res => {
          console.log(res.data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    changePage () {
      this.getList()
    },
    // 表单确认操作
    confirm () {
      if (this.operateType == 'edit') {
        // post的第二个参数在body里面被拦截
        // get的第二个参数在url里面被拦截 
        this.$http.post('/api/user/edit', this.operateForm).then(res => {
          console.log(res.data)
          this.isShow = false
          this.getList()
        })
      } else {
        // 这里是增加用户的操作
        // 后期完善利用ajax和正则表达式验证
        // 安全问题 验证规则等等
        alert("增加成功")
         this.isShow = false
      }
    },
    // 搜索的操作
    serach (event) {
      // 拿所有的数据和文本中输入的数据做对比
      // 如果没有就返回false 如果有就返回相应的数据信息 然后展示

      // 当前的数据
      var inputData = this.serchForm.keyword
      // 数据表格中的数据
      var tableData = this.tableData
      console.log(inputData)
      console.log(tableData)
      // 进行筛选
      this.gridData = tableData.filter((item) => item.name == `${inputData}` || item.age == `${inputData}`|| item.sexLabel == `${inputData}`)
      this.serachShow = true
    }
  },
  created () {
    this.getList()
  },
}  
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>