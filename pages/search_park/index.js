// pages/search_park/index.js
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'xxxxx'
});
const app = getApp()

import { request } from "../../request/index.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    showDialog: false,
    mapId: "myMap" //wxml中的map的Id值
  },
  // 点击回到原点
  moveTolocation: function () {
    // console.log(123)
    let Id = this.data.mapId
    var mapCtx = wx.createMapContext(Id);
    mapCtx.moveToLocation();
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    // console.log('地图定位！')
    this.getParkItems();
    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude,
          markers: this.getLingyuanMarkers(),
        })
      }
    });
  },
  onShow(){
    // this.getParkItems();
  },
  async getParkItems(){
    const res = await request({url:"/v1/community/list",data: {"size":20}, method: "post"});
    // console.log(res.list);
    for(let i=0; i<res.list.length; i++){  
      res.list[i]["closeDate2"] = res.list[i].closeDate.split(" ")[0]
      res.list[i]["openDate2"] = res.list[i].openDate.split(" ")[0]
      res.list[i]["recognizeDate2"] = res.list[i].recognizeDate.split(" ")[0]
    }
    this.setData({
      list: res.list
    })
  },
  regionchange(e) {
    // console.log(e.type)
  },
  // 点击标点获取数据
  markertap(e) {
    console.log(e);
    var id = e.markerId
    var name = this.data.markers[id - 1].name

    let communityId     = this.data.markers[id-1].communityId
    let coverUrl = this.data.markers[id-1].coverUrl
    let highestPrice = this.data.markers[id-1].highestPrice
    let lowestPrice = this.data.markers[id-1].lowestPrice
    let place = this.data.markers[id-1].place
    let openState = this.data.markers[id-1].openState
    let recognizeState = this.data.markers[id-1].recognizeState
    let closeDate = this.data.markers[id-1].closeDate
    let recognizeDate = this.data.markers[id-1].recognizeDate
    let openDate = this.data.markers[id-1].openDate

    console.log(name)
    this.setData({
      name,
      showDialog: true,
      communityId,
      coverUrl,
      highestPrice,
      lowestPrice,
      place,
      openState,
      recognizeState,
      closeDate,
      recognizeDate,
      openDate
    })
  },
  toggleDialog: function () {
    this.setData({
      showDialog: false,
    })
  },

  getLingyuanMarkers() {
    let markers = [];
    let i = 1;
    for (let item of this.data.list) {
      let marker = this.createMarker(item);
      marker["id"] = i;
      i++;
      markers.push(marker)
    }
    return markers;
  },
  // moveToLocation: function () {
  //   this.mapCtx.moveToLocation()

  // },

             
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "/icons/location.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      coverUrl: point.coverUrl || '',
      communityId: point.communityId || '',
      highestPrice: point.highestPrice || '',
      lowestPrice: point.lowestPrice || '',
      place: point.place || '',
      openState: point.openState || '',
      recognizeState: point.recognizeState || '',
      closeDate: point.closeDate || '',
      openDate: point.openDate || '',
      recognizeDate: point.openDate || '',
      width: 30,
      height: 30,
      label: {
        content: point.name,
        color: '#22ac38',
        fontSize: 14,
        bgColor: "#fff",
        borderRadius: 30,
        borderColor: "#22ac38",
        borderWidth: 1,
        padding: 3
      },
      callout: {
        content: point.name,
        fontSize: 0,
      }
    };
    return marker;

  }
})