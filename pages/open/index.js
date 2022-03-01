// pages/collect/index.js
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '', // 搜索框输入的文字
    realname: '', // 点击搜索时的文字
    locateCity: '',
    options1: [{
      id: '000',
      name: '状态',
      isCheck: true
    }, {
      id: '001',
      name: '未开始认筹',
      isCheck: false
    }, {
      id: '002',
      name: '已开始认筹',
      isCheck: false
    }, {
      id: '003',
      name: '未开盘',
      isCheck: false
    }, {
      id: '004',
      name: '已开盘',
      isCheck: false
    }],
    options2: [{
      id: '000',
      name: '区域',
      isCheck: true
    }, {
      id: '001',
      name: '拱墅区',
      isCheck: false
    }, {
      id: '002',
      name: '上城区',
      isCheck: false
    }, {
      id: '003',
      name: '西湖区',
      isCheck: false
    }, {
      id: '004',
      name: '萧山区',
      isCheck: false,
    }, {
      id: '005',
      name: '富阳区',
      isCheck: false,
    }, {
      id: '006',
      name: '滨江区',
      isCheck: false,
    }],
    options3: [{
      id: '000',
      name: '价格',
      isCheck: true
    }, {
      id: '001',
      name: '10万以下',
      lowestPrice: 0,
      highestPrice: 100000,
      isCheck: false
    }, {
      id: '002',
      name: '10万~20万',
      lowestPrice: 1000000,
      highestPrice: 200000,
      isCheck: false
    }, {
      id: '003',
      name: '20万~30万',
      lowestPrice: 200000,
      highestPrice: 300000,
      isCheck: false
    }, {
      id: '004',
      name: '30万~40万',
      lowestPrice: 300000,
      highestPrice: 400000,
      isCheck: false
    }, {
      id: '005',
      name: '40万以上',
      lowestPrice: 400000,
      highestPrice: 0,
      isCheck: false
    }],
    options4: [{
      id: '000',
      name: '优惠活动',
      isCheck: true
    }, {
      id: '001',
      name: '有优惠活动',
      isCheck: false,
      hasDiscount: true
    }, {
      id: '002',
      name: '无优惠活动',
      isCheck: false,
      hasDiscount: false
    }],
    selected: {},
    // tabs: [
    //   {
    //     id: 0,
    //     value: "未开始认筹",
    //     isActive: true
    //   },
    //   {
    //     id: 1,
    //     value: "开始认筹",
    //     isActive: false
    //   },
    //   {
    //     id: 2,
    //     value: "未开盘",
    //     isActive: false
    //   },
    //   {
    //     id: 3,
    //     value: "已开盘",
    //     isActive: false
    //   }
    // ],
    // 接口要的参数
    QueryParams:{
      // "area": "",
      // "city": "杭州市",
      // "current": 1,
      // "hasDiscount": true,
      // "highestPrice": 500000,
      // "isOpen": true,
      // "lowestPrice": 100000,
      // "name": "",
      "size": 5
    },
    list: []
  },
  async change (e) {
    console.log(e);
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })

    if(e.currentTarget.dataset.option=='1'){
      let options1 = this.data.options1;
      for(let i=0; i<options1.length; i++){
        options1[i].isCheck=false
      }
      options1[parseInt(this.data.selected.id)].isCheck=true
      this.setData({
        options1
      })
    }else if(e.currentTarget.dataset.option=='2'){
      let options2 = this.data.options2;
      for(let i=0; i<options2.length; i++){
        options2[i].isCheck=false
      }
      options2[parseInt(this.data.selected.id)].isCheck=true
      this.setData({
        options2
      })
    }else if(e.currentTarget.dataset.option=='3'){
      let options3 = this.data.options3;
      for(let i=0; i<options3.length; i++){
        options3[i].isCheck=false
      }
      options3[parseInt(this.data.selected.id)].isCheck=true
      this.setData({
        options3
      })
    }else if(e.currentTarget.dataset.option=='4'){
      let options4 = this.data.options4;
      for(let i=0; i<options4.length; i++){
        options4[i].isCheck=false
      }
      options4[parseInt(this.data.selected.id)].isCheck=true
      this.setData({
        options4
      })
    }

    let QueryParams = {
      "size": 10
    }

    // option1
    for(let i=0; i<this.data.options1.length; i++){
      if(this.data.options1[i].isCheck==true){
        if(i!==0){
          if(i===1){
            QueryParams["isRecognize"]=false
            QueryParams["isOpen"]=false
          }else if(i===2){
            QueryParams["isRecognize"]=true
            QueryParams["isOpen"]=false
          }else if(i==3){
            QueryParams["isOpen"]=false
          }else if(i==4){
            QueryParams["isOpen"]=true
          }
        }
        break;
      }
    }
    // option2
    for(let i=0; i<this.data.options2.length; i++){
      if(this.data.options2[i].isCheck==true){
        if(i!==0){
          QueryParams["area"]=this.data.options2[i].name
        }
        break;
      }
    }
    // option3
    for(let i=0; i<this.data.options3.length; i++){
      if(this.data.options3[i].isCheck==true){
        if(i!==0){
          if(this.data.options3[i].highestPrice!==0){
            QueryParams["highestPrice"]=this.data.options3[i].highestPrice
          }
          if(this.data.options3[i].lowestPrice!==0){
            QueryParams["lowestPrice"]=this.data.options3[i].lowestPrice
          }
        }
        break;
      }
    }
    // option4
    for(let i=0; i<this.data.options4.length; i++){
      if(this.data.options4[i].isCheck==true){
        if(i!==0){
          QueryParams["hasDiscount"]=this.data.options4[i].hasDiscount
        }
        break;
      }
    }
    QueryParams["name"]=this.data.realname.trim()
    this.setData({
      QueryParams
    })
    
    const res = await request({url:"/v1/community/list", data:QueryParams, method: "post"});
    this.setData({
      list: res.list
    })

    console.log(QueryParams);
  },
  TimeId:-1,
  handleInput(){
    // 1 获取输入框的值
    const value = this.data.name
    // 2 检测合法性
    if(!value.trim()){
      this.setData({
        list:[]
      })
      // 值不合法
      return;
    }
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.searchClick();
    }, 1000);
  },
  close () {
    // 关闭select
    this.selectComponent('#select').close()
  },
  onLoad(){
    
    // console.log(this.data.list[0].place.split(",")[2]);
  },
  onShow(){
    this.getParkItems();
    let that = this,
      cityOrTime = wx.getStorageSync('locatecity') || {},
      time = new Date().getTime(),
      city = '';
    
      that.setData({
        locateCity: cityOrTime.city
      })
    
 
    this.getCity();
  },
  async getCity(){
    await setInterval(() => {
      const city = wx.getStorageSync('city') || '';
      this.setData({
        city
      })
    }, 1000);
  },
  async getParkItems(){
    const res = await request({url:"/v1/community/list",data: this.data.QueryParams, method: "post"});
    console.log(res);
    this.setData({
      list: res.list
    })
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  collectClick(e){
    console.log(e.currentTarget.dataset.index);
    let that = this;
    let message = this.data.list[e.currentTarget.dataset.index].hasCollect?'您确定要将该项目移除收藏吗？':'您确定要将该项目添入收藏吗？'
    wx.showModal({
      title: '收藏管理',
      content: message,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#0089ff',
      success: (result) => {
        if (result.confirm) {
          request({url:"/v1/community/collect/"+e.currentTarget.dataset.communityid, method: "put"});
          let list = that.data.list;
          list[e.currentTarget.dataset.index].hasCollect = !list[e.currentTarget.dataset.index].hasCollect;
          that.setData({
            list
          })
        }
      }
    });
  },
  async searchClick(){
    this.setData({
      realname: this.data.name
    })
    let QueryParams = this.data.QueryParams
    QueryParams["name"] = this.data.name
    const res = await request({url:"/v1/community/list", data:QueryParams, method: "post"});
    this.setData({
      list: res.list
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom(){
    let QueryParams = this.data.QueryParams
    QueryParams.size +=4
    console.log(QueryParams);
    this.setData({
      QueryParams
    })
    this.getParkItems();
  },
  // 下拉刷新事件 
  onPullDownRefresh(){
    this.getParkItems();
  }
})