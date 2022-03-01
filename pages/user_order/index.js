// pages/user_order/index.js
import { request } from "../../request/index.js";
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待审批",
        isActive: false
      },{
        id: 2,
        value: "已认筹",
        isActive: false
      },{
        id: 3,
        value: "待签约",
        isActive: false
      },
      {
        id: 4,
        value: "待支付",
        isActive: false
      },
      {
        id: 5,
        value: "已完成",
        isActive: false
      }
    ],
    list: []
  },
  handleTabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index}=e.detail;
    // 2 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  onShow: function () {
    this.getMyItems()
  },
  async getMyItems(){
    const res = await request({url:"/v1/pay/list"});
    for(let i=0; i<res.length; i++){
      let arr=res[i].place.split(",")
      let wholePlace = ""
      for(let j=0;j<3;j++){
        wholePlace+=arr[j]
      }
      wholePlace+=res[i].community
      res[i]['wholePlace']=wholePlace
      res[i]['xiaoshuMoney']=(res[i].price/10000).toFixed(2)
    }
    this.setData({
      list: res
    })
  },
  qianyue(e){
    console.log(e);

    let that = this
    wx.showModal({
      title: '签约确认',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#0089ff',
      success: (result) => {
        if (result.confirm) {
          let parkingId = that.data.list[e.currentTarget.dataset.index].parkingId
          request({url:"/v1/pay/sign/"+parkingId,method:'put'});
          setTimeout(() => {
            wx.showToast({
              title: '签约成功',
              icon: 'success',
              duration: 1500,
              mask: true
            });
            that.getMyItems()
          }, 2000);
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },
  loan(){
    wx.navigateTo({
      url: '/pages/user_loan/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  }
})