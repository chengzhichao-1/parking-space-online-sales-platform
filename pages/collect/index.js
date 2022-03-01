// pages/collect/index.js
import { request } from "../../request/index.js";
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "未开盘",
        isActive: true
      },
      {
        id: 1,
        value: "已开盘",
        isActive: false
      }
    ],
    openList: null,
    noOpenList: null
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
  async onShow(){
    let data1={
      "current": 1,
      "openState": true,
      "size": 10
    }
    let data2={
      "current": 1,
      "openState": false,
      "size": 10
    }
    const res1 = await request({url:"/v1/community/collect/list",data:data1,method:"post"});
    const res2 = await request({url:"/v1/community/collect/list",data:data2,method:"post"});
    this.setData({
      openList:res1.list,
      noOpenList: res2.list
    })
  },
  collectClick1(e){
    console.log(e.currentTarget.dataset.index);
    let that = this;
    let message = '您确定要将该项目移除收藏吗？'
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
          let noOpenList = that.data.noOpenList.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            noOpenList
          })
        }
      }
    });
  },
  collectClick2(e){
    console.log(e.currentTarget.dataset.index);
    let that = this;
    let message = '您确定要将该项目移除收藏吗？'
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
          let openList = that.data.openList.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            openList
          })
        }
      }
    });
  }
})