import { request } from "../../request/index.js";
Page({
  data: {
    realPeople: 932,
    isCheck: false,
    currentTime: null,
    timestamp: null,
    id: null
  },
  checkboxChange(){
    this.setData({
      isCheck: !this.data.isCheck
    })
  },
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { id } = options;
    this.setData({
      id
    }) 
    let d = new Date();
    let currentTime= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+(d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds())
    let timestamp = Date.parse(new Date())
    this.setData({
      currentTime,
      timestamp
    })
  },
  async yaohao(){
    await request({url:"/v1/luck/launch/"+this.data.id,method:"put"});
    wx.showToast({
      title: '摇号成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,
      success: (result) => {
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/yaohao_search/index'
          });
        }, 1500);
      },
      fail: () => {},
      complete: () => {}
    });
      
  }
})