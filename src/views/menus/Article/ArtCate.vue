<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addVisible = true"
          >添加分类</el-button
        >
      </div>
      <!-- 表格区域 -->
      <!-- :data 是将要渲染的数据, 必须是数组
           有几列就有几个 <el-table-column>
           prop 是这一列要渲染的数组中的 哪个字段数据
           label 是每一列的表头
           type="index" 自动渲染序号 -->
      <!-- stripe 是否为斑马纹 table
      border 是否带有纵向边框 -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <!-- 使用插槽，自定义该列的内容 -->
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showEditRow(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="removeClass(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类 对话框 -->
    <el-dialog
      title="添加文章分类"
      :visible.sync="addVisible"
      @closed="addClosed"
      width="40%"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addCate">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 修改文章分类 对话框 -->
    <el-dialog
      title="修改文章分类"
      :visible.sync="editVisible"
      @closed="editClosed"
      width="40%"
    >
      <el-form
        :model="editForm"
        :rules="addRules"
        ref="editRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="editForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="editForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editCate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ArtCate',
  data() {
    return {
      // 文章分类列表
      cateList: [],
      // 添加分类 对话框状态
      addVisible: false,
      // 修改分类 对话框状态
      editVisible: false,
      // 添加分类 表单数据
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 修改分类表单数据
      editForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 添加分类和修改分类 校验规则
      addRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
          }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 请求文章分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('/my/cate/list')
      //   console.log(res)
      if (res.code === 0) {
        // 请求成功 赋值到当前组件的文章分类列表
        this.cateList = res.data
      }
    },
    // 添加分类对话框关闭事件
    addClosed() {
      this.$refs.addRef.resetFields()
    },
    // 修改分类对话框关闭事件
    editClosed() {
      this.$refs.editRef.resetFields()
    },
    // 添加分类对话框
    addCate() {
      this.$refs.addRef.validate(async (valid) => {
        // 校验不通过
        if (!valid) return
        // 校验通过发起请求
        const { data: res } = await this.$http.post(
          '/my/cate/add',
          this.addForm
        )
        // console.log(res)
        if (res.code === 0) {
          // 请求成功 // 提示用户
          this.$message.success(res.message)
          //   关闭对话框
          this.addVisible = false
          //   重新获取文章分类数据
          this.getCateList()
        } else {
          // 请求失败 // 提示用户
          this.$message.error(res.message)
        }
      })
    },
    // 修改分类对话框
    showEditRow(row) {
      if (row.id === 1 || row.id === 2) {
        this.$message.warning('管理员不允许修改此分类')
        return
      }
      this.editForm = Object.assign({}, row)
      this.editVisible = true
    },
    // 修改文章分类
    editCate() {
      // 1.表单预校验
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return
        // 2.发起请求
        const { data: res } = await this.$http.put(
          '/my/cate/info',
          this.editForm
        )
        // console.log(res)
        if (res.code === 0) {
          // 请求成功 提示用户
          this.$message.success(res.message)
          // 重新调用获取文章分类接口
          this.getCateList()
          //   关闭对话框
          this.editVisible = false
        } else {
          // 请求失败 提示用户
          this.$message.error(res.message)
        }
      })
    },
    // 删除文章分类
    removeClass(id) {
      if (id === 1 || id === 2) {
        this.$message.warning('管理员不允许删除该文章分类')
        return
      }
      this.$confirm('此操作将永久删除该文章分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确定发起请求
          const { data: res } = await this.$http.delete('/my/cate/del', {
            params: {
              id
            }
          })
          //   console.log(res)
          if (res.code === 0) {
            this.$message({ type: 'success', message: '删除成功!' })
            //   重新调用获取文章分类接口
            this.getCateList()
          }
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
