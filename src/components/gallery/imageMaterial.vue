<!--
  引入：
    import imageMaterial from '@/components/shopMaterial/imageMaterial';
  父：
    <imageMaterial
      :showImgMaterial="showImgMaterial"
      :multiple="true"
      :totalNum="1"
      :selectNum="1"
      @onlyclose="onlyclose"
      @subMit="subMit"
    ></imageMaterial>

      :limitType="true"  *是否限制了上传数量  Boolean  true支持  false不支持
      :multiple="true"   *是否支持多选  Boolean  true支持  false不支持
      :totalNum="1"      *可选择的总数  Number  
      :selectNum="1"     *已选择数量  Number
  子：

-->
<template>
  <!-- 图片库 -->
  <el-dialog
    class="imgDia" 
    title="图片库" 
    :visible.sync="showImgMaterial" 
    width="70%"
    append-to-body
    :before-close="handleClose">
    <div class="box">
      <div class="flex-row-start">
        <el-row style="width:100%;" :gutter="20">
          <!-- 左侧操作区域 -->
          <el-col :span="6">
            <div class="materinalOperation">
              <el-card class="box-card">
                <div class="search" style="margin-bottom:20px;">
                  <el-input placeholder="搜索分组" v-model="getGalleryForm.galleryName" class="input-with-select searchInput">
                    <el-button @click="getGaller" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
                <div class="class flex-column-center">
                  <div class="classList" :style="{height: OperationHeight + 'px'}" :height="OperationHeight + 'px'">
                    <ul class="infinite-list" style="overflow:auto;height:100%;">
                      <li v-for="tag in imageClassTags" :key="tag.name" @click="activeClass(tag)" class="li infinite-list-item">
                        <el-tag style="width:100%;" :type="tag.type">{{tag.galleryName }} {{tag.id === -1 ? '' : '( ' + tag.totalAmount + ' )' }}</el-tag>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <!-- 右侧图片展示区域 -->
          <el-col :span="18">
            <div class="materinalContent">
              <el-card class="box-card" style="margin-bottom:20px">
                <h3 style="margin-bottom:20px;">{{activeClassName}}</h3>
                <div class="flex-row-between">
                  <el-button type="primary" :disabled="selectImgArr.length > 0" @click="showUploadImg">上传图片</el-button>
                  <div class="search">
                    <el-input placeholder="搜索图片" v-model="getImgsForm.imageName" class="input-with-select searchInput">
                      <el-button @click="getImgs" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                  </div>
                </div>
              </el-card>
              <el-card class="box-card">
                <div v-if="imgs.length > 0">
                  <div class="classList" :style="{height: ImageBoxHeight + 'px'}">
                    <ul class="flex-row-start1 ul" style="overflow-x: hidden;overflow-y:auto;height:100%;">
                      <li v-for="(item,index) in imgs" :key="index" class="item" @click="clickItem(item,index)">
                        <div>
                          <img style="width: 200px; height: 200px" :src="item.imageUrl" alt="">
                          <div class="imgNameBox">{{item.imageName}}</div>
                          <div style="text-align:center;color:#909399;">{{item.width + ' x ' + item.height}}</div>
                        </div>
                        <div class="pos" v-show="showPos(item)">{{showNum(item)}}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="fy flex-row-end">
                    <div>
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 30]"
                        :page-size="getImgsForm.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="imgsTotal">
                      </el-pagination>
                    </div>
                  </div>
                </div>
                <div v-else>暂无图片，可以点击左上角“上传图片”按钮添加</div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="flex-row-between" style="margin-top:10px;">
        <div v-if="limitType">已选 {{selectNum + selectImgArr.length}} 张，还可以选择 {{totalNum - selectNum - selectImgArr.length}} 张</div>
        <div v-else>已选 {{selectNum + selectImgArr.length}} 张</div>
        <div>
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="subMit">确 定</el-button>
        </div>
      </div>
    </div>
    <!-- 上传图片 -->
    <el-dialog class="imgDia1" title="上传图片" :visible.sync="uploadImg" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" append-to-body width="65%">
      <el-form :model="uploadImgForm" ref="editGalleryForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="本地图片">
          <el-upload ref="upload" 
            :class="{hide:hideUpload}"
            :action="action" 
            name="files" 
            :multiple="multiple"
            list-type="picture-card" 
            :on-success="imgUp" 
            :on-remove="imgRemove" 
            :on-exceed="handleExceed" 
            :limit="limitType ? totalNum-selectNum : 9999" 
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip" v-if="limitType">单次最多上传{{this.totalNum - this.selectNum}}张图片，仅支持 gif、 jpeg、 png、 bmp 4种格式, 大小不超过3.0 MB</div>
            <div slot="tip" class="el-upload__tip" v-else>仅支持 gif、 jpeg、 png、 bmp 4种格式, 大小不超过3.0 MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择分组">
          <el-select v-model="uploadImgForm.galleryId" placeholder="请选择">
            <el-option v-for="item in updateClassArr" :key="item.name" :label="item.galleryName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button @click="uploadImgClose">关 闭</el-button>
          <el-button :loading="uploadImgLoading" type="primary" @click="uploadImgFun">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
import { 
  getGalleryByShopId ,
  getGalleryImageByGroup ,
  addGalleryImage ,
} from '@/api/shop/shopMaterial'
export default {
  props: ["showImgMaterial","limitType","multiple","totalNum","selectNum"],
  watch:{
    showImgMaterial(newvalue,oldValue){
      if(newvalue){
        console.log('执行了')
        this.selectImgArr = []
        this.getGaller()
        this.hideUpload = this.totalNum-this.selectNum-this.selectImgArr.length == 0
      }
    }
  },
  data(){
    return{
      selectImgArr:[],                    // 选中的图片
      hideUpload: false,
      imageClassTags:[],                  // 分组按钮
      getGalleryForm:{},                  // 获取分组数据
      getImgsForm:{                       // 分组下的图片数据
        pageSize:30,
        pageNum:1
      },
      imgs:[],
      imgsTotal:0,

      uploadImg:false,                    // 上传图片弹出框
      uploadImgLoading:false,             // 上传图片loading
      uploadImgForm:{                     // 上传图片数据
        galleryId:0
      },                   
      galleryList:[],                     // 准备上传的图片数据
      activeClassName:'',                 // 默认选中的分组名称

      updateClassArr:[],
      ImageBoxHeight:0,             // 默认数据 - 图片区域高度
      OperationHeight:0,            // 默认数据 - 操作区域高度
      action:''                     // 默认数据 - 上传图片地址
    }
  },
  created(){
    // 分组默认数据
    this.getGalleryForm.shopId = this.shop.shopId
    this.getGalleryForm.type = 1
    // 分组下的图片默认数据
    this.getImgsForm.shopId = this.shop.shopId
    this.getImgsForm.type = 1
    this.action = `/product/business/gallery/uploadGalleryImage?shopId=${this.shop.shopId}`
    this.getGaller()
  },
  mounted() {
    console.log('执行了mounted')
    this.$nextTick(function() {
      this.OperationHeight = window.innerHeight - 282;
      this.ImageBoxHeight = window.innerHeight - 400;
    })
    window.onresize = () => {
      return (() => {
        this.OperationHeight = window.innerHeight - 282;
        this.ImageBoxHeight = window.innerHeight - 400;
      })();
    };
  },
  methods:{
    handleClose(){
      this.$emit('onlyclose',true)
    },
    // 图片判断是否展示不展示
    showPos(e){
      if(this.selectImgArr.findIndex(item=>item.id == e.id) === -1){
        return false;
      }else{
        return true;
      }
    },
    showNum(e){
      return (this.selectImgArr.findIndex(item=>item.id == e.id)) + 1;
    },
    // 点击图片
    clickItem(e){
      if(this.selectImgArr.findIndex(item=>item.id == e.id) === -1){
        if(this.limitType && (this.totalNum - this.selectNum - this.selectImgArr.length <= 0 )){
          this.$message.error('已超过添加最大图片数量');
          return;
        }
        this.selectImgArr.push(e)
      }else{
        this.selectImgArr.splice(this.selectImgArr.findIndex(item => item.id === e.id), 1)
      }
    },
    // 父 - 确定
    subMit(){
      console.log('this.selectImgArr',this.selectImgArr)
      if(this.selectImgArr.length == 0){
        this.$message.error('请先选择图片');
        return;
      }
      this.$emit('subMit',this.selectImgArr);
    },
    // 图片 - 获取分组下图片列表
    getImgs(){
      getGalleryImageByGroup(this.getImgsForm).then(res=>{
        console.log('获取分类下图片',res)
        let data = res.data.list;
        data.forEach(e=>e.checked = false)
        this.imgs = data;
        this.imgsTotal = res.data.total;
      })
    },
    // 图片 - 上传
    imgUp(file, fileList){
      console.log(file, fileList);
      let obj = {};
      obj.imageName = file.data[0].orginName
      obj.imageSize = file.data[0].size
      obj.imageUrl = file.data[0].name
      obj.width = file.data[0].width
      obj.height = file.data[0].height
      obj.uid = file.data[0].uid
      this.galleryList.push(obj)
      this.selectImgArr.push(obj)
      this.hideUpload = this.totalNum-this.selectNum-this.selectImgArr.length == 0
    },
    // 图片 - 删除
    imgRemove(file, fileList){
      console.log('图片删除',file, fileList);
      if(file.response){
        this.galleryList = [];
        fileList.forEach(e=>{
          let gObj = {};
          gObj.imageName = e.response.data[0].orginName
          gObj.imageSize = e.response.data[0].size
          gObj.imageUrl = e.response.data[0].name
          gObj.width = e.response.data[0].width
          gObj.height = e.response.data[0].height
          this.galleryList.push(gObj)
        })
        let uid = file.response.data[0].uid
        this.selectImgArr.splice(this.selectImgArr.findIndex(item => (item.uid && item.uid) === uid), 1)
        this.hideUpload = this.totalNum-this.selectNum-this.selectImgArr.length == 0
        console.log('删除后的已选择',this.selectImgArr)
      }
    },
    // 图片 上传请求
    uploadImgFun(){
      this.uploadImgForm.type = 1 
      this.uploadImgForm.shopId = this.shop.shopId 
      if(this.galleryList.length == 0){
        this.$message.error('请先上传图片');
        return;
      }
      this.uploadImgLoading = true;
      this.uploadImgForm.galleryList = this.galleryList;
      addGalleryImage(this.uploadImgForm).then(res=>{
        console.log('上传图片保存',res)
        if(res.code == 200){
          this.$message({
            message: '恭喜，上传成功',
            type: 'success'
          });
          this.uploadImg = false;
          this.uploadImgForm.galleryId = 0
          this.galleryList = []
          this.$refs['upload'].clearFiles()
          this.subMit()
          setTimeout(()=>{
            this.uploadImgLoading = false;
          },1000)
        }else{
          this.uploadImgLoading = false;
          this.$message.error(res.message);
        }
      })
    },
    showUploadImg(){
      if(this.limitType && (this.totalNum - this.selectNum - this.selectImgArr.length <= 0) ){
        this.$message.error('已超过添加最大图片数量');
        return;
      }
      this.uploadImg = true;
    },
    // 图片 - 弹出框关闭
    uploadImgClose(done){
      this.$confirm('确认关闭？').then(_ => {
        console.log('执行了',this.galleryList)
        this.galleryList = []
        this.selectImgArr = []
        this.uploadImg = false
        this.hideUpload = this.totalNum-this.selectNum-this.selectImgArr.length == 0
        this.$refs.upload.clearFiles()
        done();
      }).catch(_ => {});
    },
    // 图片 - 数量限制
    handleExceed(files, fileList) {
      this.$message.warning(`单次最多上传${this.totalNum-this.selectNum-this.selectImgArr.length}张图片，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 图片 - 格式检测
    beforeAvatarUpload(file) {
      console.log('file',file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/bmp';
      console.log(isJPG)
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt3M;
    },
    // 分类 - 获取图片库分类
    getGaller(){
      console.log('请求分类的数据',this.getGalleryForm)
      getGalleryByShopId(this.getGalleryForm).then(res=>{
        console.log('获取图片库分组',res)
        let data = res.data;
        data.forEach(e=>{ e.type = 'info' })
        if(this.activeClassName == ''){
          this.activeClassName = data[0].galleryName
          data[0].type = ''
          this.getImgsForm.galleryId = data[0].id;
        }else{
          let index = data.findIndex(item => item.galleryName == this.activeClassName);
          data[index].type = ''
          this.getImgsForm.galleryId = data[index].id;
        }
        let arr = []
        for(var i=1;i<data.length;i++){
          arr.push(data[i])
        }
        this.updateClassArr = arr;
        this.changeClassArr = arr;
        console.log('arr',arr)
        this.getImgs()
        this.imageClassTags = data
      })
    },
    // 分类 - 选择当前组
    activeClass(e){
      console.log('点击了分组按钮')
      this.imageClassTags.forEach(el => el.type = 'info')
      e.type  = ''
      this.allChecked = false;
      this.getImgsForm.galleryId = e.id
      this.activeClassName = e.galleryName;
      this.getImgs()
    },
    // 图片 - 分页
    handleSizeChange(val) {
      this.getImgsForm.pageSize = val;
      this.getImgs()
    },
    // 图片 - 分页
    handleCurrentChange(val) {
      this.getImgsForm.pageNum = val;
      this.getImgs()
    },
    // 文本框输入
    change(e){
      this.$forceUpdate()
    }
  },
  computed: {
    ...mapState([
      'user',
      'shop'
    ])
  },
}
</script>
<style>
.hide .el-upload--picture-card {
  display: none;
}
</style>
<style lang="less" scoped>
// .imgDia /deep/ .el-dialog{
//   z-index: 100000 !important;
// }
// .imgDia1 /deep/ .el-dialog{
//   z-index: 100001 !important;
// }
.materinalOperation{
  max-width: 400px;
}
.box{
  box-sizing: border-box;
  width: 100%;
  padding:20px;
  border:1px solid #eee;
  border-radius: 4px;
}
.search{
  position: relative;
  text-align: center;
  .searchInput{
    width: 100%;
  }
}
.addClass{
  margin-bottom: 20px;
}
.classList{
  width: 100%;
  text-align: center;
  .li{
    width: 100%;
    cursor: pointer;
    margin-bottom: 10px;
    .tagBtn{
      .tagInfo{
        position: relative;
        .tag{
          z-index: 9999;
          width: 18px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          // display: none;
          position: absolute;
          top: -20px;
          &.close{
            right: -28px;
          }
          &.edit{
            right: 4px;
          }
        }
      }
      &:hover .tag{
        display: block;
      }
    }
  }
  .ul{
    flex-wrap: wrap;
  }
  .item{
    position: relative;
    margin: 0 20px 20px 0 ;
    width: 200px;
    cursor: pointer;
    .imgNameBox{
      width: 100%;
      text-align: center;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:1;/*我设置的是文字超过1行显示...；行数可以随便改；*/
      overflow:hidden;
    }
    .pos{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.7);
      color: #fff;
      text-align: center;
      line-height: 248px;
      font-size: 100px;
      font-weight: bold;
    }
  }
}
</style>
<style scoped>
  .classList /deep/ .el-scrollbar__bar.is-horizontal{
    display: none;
  }
</style>
