import { request } from "../../request/index.js";
// pages/user_card_add/index.js
Page({
  data: {
    name: null,
    card: null,
    selected: {},
    options: [{
      id: '000',
      name: '类型选择'
    },{
      id: '001',
      name: '建设银行'
    },{
      id: '002',
      name: '工商银行'
    },{
      id: '003',
      name: '招商银行'
    },{
      id: '004',
      name: '农业银行'
    }]
  },
  change(e){
    this.setData({
      selected: { ...e.detail }
    })
  },
  onShow: function () {
    let name = wx.getStorageSync('name');
    this.setData({
      name
    })
  },
  async addCard(){
    let data = {}
    let code = this.data.card+""
    data["code"] = code.substr(code.length-4)
    data["name"] = this.data.selected.name
    await request({url:"/v1/bank/add",data:data,method:"post"})

    wx.showToast({
      title: '添加成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,
      success: (result) => {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      },
      fail: () => {},
      complete: () => {}
    });
  }
})