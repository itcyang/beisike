import request from "./http"
import mock from "@/mock/mock"



class Apls {
	//登录
	mokeLogin(data) {
		return mock.get("/login", { params: data })
	}
	//首页轮播
	GetBannerList(data) {
		return request({
			method: "get",
			url: "/json1811.ashx",
			params: data
		})
	}
	//首页商品数据
	GetIndexCakeList(data) {
		return request({
			method: "get",
			url: "/json1811.ashx",
			params: data
		})
	}
	//广告接口  女神
	GetNSCakeByName(data) {
		return request({
			method: "get",
			url: "/json1811.ashx",
			params: {
				Name: data.Name,
				c: "NsCakeCenter",
				m: "GetNSCakeByName",
				v: Number(new Date()),
			}
		})
	}
	// 商品详情接口  魔法猜心  经典
	GetCakeByName(data) {
		return request({
			method: "get",
			url: "/json1811.ashx",
			params: {
				City: data.City,
				ProName: data.ProName,
				c: "Product",
				m: "GetCakeByName",
				v: Number(new Date()),
			}
		})
	}


	//严选
	GetRuPCakeByName(data) {
		return request({
			method: "get",
			url: "/json1811.ashx",
			params: {
				Name: data.Name,
				c: "NsCakeCenter",
				m: "GetRuPCakeByName",
				v: Number(new Date()),
			}
		})
	}
	//伴手礼
	GetjzCakeInfo(data) {
		return request({
			method: "get",
			url: "/json1811.ashx",
			params: {
				City: data.City,
				ProName: data.ProName,
				c: "IndexCenter",
				m: "GetjzCakeInfo",
				v: Number(new Date()),
			}
		})
	}

	//分类数据接口 
	GetJdListNew() {
		return request({
			method: "get",
			url: "/json1811.ashx",
			params: {
				c: "NsCakeCenter",
				m: "GetJdListNew",
				v: Number(new Date()),
			}
		})
	}

}


export default new Apls();