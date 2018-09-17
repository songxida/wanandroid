// pages/home/index.js
var currentPage = 0; // 当前页
var isRefresh = false; // 是否正在刷新中

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner属性
    indicatorDots: true,
    indicatorColor: "#fff",
    indicatorActiveColor: "#8B8B8B",
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    vertical: false,
    previousMargin: '16rpx',
    nextMargin: '16rpx',
    // banner 数据
    bannerOriginalData: null,
    bannerData: null,

    // list 数据
    listOriginalData:null,
    listData:[], // 列表数据
    defaultImg: 'http://www.wanandroid.com/resources/image/pc/default_project_img.jpg',

    // scrollView
    scrollViewHeight: 0,
    scrollTop:0,
    hidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;

    // 设置scrollView的高度
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          scrollViewHeight: res.windowHeight
        });
      },
    })

    // 请求banner信息
    this.getBannerData(self);
    // 请求列表list信息
    this.getListData(self);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 获取banner信息
   */
  getBannerData: function(self) {
    wx.request({
      url: 'http://www.wanandroid.com/banner/json',
      method: "GET",
      success: function(result) {
        self.setData({
          bannerOriginalData: result.data,
          bannerData: result.data.data,
        })
      },
      fail: function() {
        console.log("banner数据请求失败!!!");
      }
    })
  },

  /**
   * 获取list数据
   */
  getListData: function(self){
    self.setData({
      hidden:false,
    });

    wx.request({
      url: 'http://www.wanandroid.com/article/list/'+currentPage+'/json',
      method: 'GET',
      success: function(result){
        isRefresh = false;

        var list = result.data.data.datas;
        var selfList = self.data.listData;

        for(var i = 0; i < list.length; i++){
          selfList.push(list[i]);
        }

        self.setData({
          hidden:true,
          listOriginalData: result.data.data,
          listData: selfList,
        });
        console.log(result.data.data);
      },
      fail: function(){
        console.log("首页列表数据请求失败!!!");
      }
    })
  },

  /**
   * 上拉到底部加载的方法
   */
  bindLoadMore: function(event){
    if(!isRefresh){
      isRefresh = true;
      var self = this;

      currentPage ++;
      self.getListData(self);
    }
  },

  /**
   * 下拉刷新的方法
   */
  topRefresh:function(event){
    if(!isRefresh){
      isRefresh = true;
      currentPage = 0;
      this.setData({
        listOriginalData: null,
        listData: [],
        scrollTop: 0,
      });
      var self = this;
      this.getListData(self);
    }
  },

  /**
   * 滚动时加载的方法
   */
  scroll: function(event){
    // 在到达底部之前记录位置
    if(!isRefresh){
      this.setData({
        scrollTop: event.detail.scrollTop
      });
      // console.log(event.detail.scrollTop);
    }
  },

})