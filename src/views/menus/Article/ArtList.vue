<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="pubVisible = true"
          >发表文章</el-button
        >
      </div>
      <!-- 文章表格区域 -->
      <!-- 分页区域 -->
    </el-card>
    <!-- 发表文章的对话框 -->
    <!-- fullscreen 表示让对话框全屏 -->
    <el-dialog
      title="发表文章"
      :visible.sync="pubVisible"
      fullscreen
      :before-close="beforeClose"
      @closed="pubClosed"
    >
      <el-form
        ref="pubRef"
        :rules="pubRules"
        :model="pubForm"
        label-width="80px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容">
          <!-- 使用 v-model 进行双向的数据绑定 -->
          <quill-editor v-model="pubForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面">
          <!-- 用来显示封面的图片 -->
          <img
            src="../../../assets/images/cover.jpg"
            alt=""
            class="cover-img"
            ref="imgRef"
          />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="fileRef"
            @change="fileChange"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="chooseImg">+ 选择封面</el-button>
        </el-form-item>
        <!-- 发布按钮 -->
        <el-form-item>
          <el-button type="primary" @click="pubArticle('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticle('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看文章详情的对话框 -->
  </div>
</template>

<script>
// 引入默认图片
import img from '@/assets/images/cover.jpg'
export default {
  name: 'ArtList',
  data() {
    return {
      // 查询参数对象
      q: {
        // 当前是第几页
        pagenum: 1,
        // 每页展示多少条
        pagesize: 2,
        // 筛选的参数
        cate_id: '',
        state: ''
      },
      // 文章分类列表数据
      cateList: [],
      // 文章列表 对话框
      pubVisible: false,
      //   文章分类列表数据
      pubForm: {
        title: '',
        cate_id: '',
        content: '',
        state: '',
        // 用户选择的封面图片（null 表示没有选择任何封面）后端接口要的是blob二进制文件
        cover_img: null
      },
      // 表单的验证规则对象
      pubRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '文章标题的长度为1-30个字符',
            trigger: 'blur'
          }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    //   调用初始化文章分类的列表数据
    this.getCateList()
  },
  methods: {
    //   发表文章对话框关闭前事件
    beforeClose() {
      this.$confirm('此操作将导致文章信息丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.pubVisible = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 初始化文章分类的列表数据
    async getCateList() {
      const { data: res } = await this.$http.get('/my/cate/list')
      //   console.log(res.data)
      this.cateList = res.data
    },
    // 选择图片
    chooseImg() {
      this.$refs.fileRef.click()
    },
    // 选择图片改变事件
    fileChange(e) {
      //   console.log(e.target.files)
      //   打印一个元素的真正类型
      //   console.log(Object.prototype.toString.call(file[0]))
      const files = e.target.files
      if (files.length === 0) {
        // 用户没有选择图片
        // console.log('用户没有选择图片')
      } else {
        // 用户选择了图片
        // console.log('用户选择了图片')
        // 给后端传递的文件字段赋值, 后端要的是一个blob二进制文件
        this.pubForm.cover_img = files[0]
        // 渲染前端对话框的图片, 使用 URL自带的浏览器的方法 把 文件的二进制流 转换成 url地址
        const url = URL.createObjectURL(files[0])
        // 覆盖默认的src属性
        // this.$refs.imgRef.src = url
        this.$refs.imgRef.setAttribute('src', url)
      }
    },
    // 发布文章按钮状态
    pubArticle(state) {
      this.pubForm.state = state
      // 1.表单预校验
      this.$refs.pubRef.validate(async (valid) => {
        if (!valid) return
        if (this.pubForm.content === '') {
          this.$message.warning('1111')
          return
        }
        if (this.pubForm.cover_img === null) {
          this.$message.warning('2222')
          return
        }
        const fd = new FormData()
        for (const key in this.pubForm) {
          fd.append(key, this.pubForm[key])
        }
        console.log(fd)
        const { data: res } = await this.$http.post('/my/article/add', fd)
        console.log(res)
        if (res.code === 0) {
          this.$message.success(res.message)
          // 关闭对话框
          this.pubVisible = false
          // TODO：刷新文章列表数据
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 对话框完全关闭之后的处理函数
    pubClosed() {
      // 重置表单数据
      // resetFields()是elementUI自带的表单清除, 只能清除属于element的内容, 并且绑定prop属性才会被清空
      this.$refs.pubRef.resetFields()
      // 把不是elementUI的内容清空
      this.pubForm.content = ''
      this.pubForm.cover_img = null
      this.pubForm.state = ''
      // 重置封面图片的 src 地址
      // 把图片的src属性更换成默认图片, js中要使用图片要import先引入
      this.$refs.imgRef.setAttribute('src', img)
    }
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
// 设置富文本编辑器的默认最小高度
/deep/ .ql-editor {
  min-height: 300px;
}
// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>
