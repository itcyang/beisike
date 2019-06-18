import Vue from "vue";
import Vuex from "vuex";
import Store from "storejs"
Vue.use(Vuex);

//定义属性值  data
const state = {
	shopCart: { "N": 0, "list": [] },
	total: 0
}
//定义同步方法
const mutations = {
	vuexInit(state) {
		state.shopCart = Store.get("shopCart") || { "N": 0, "list": [] };
		console.log(Store.get("shopCart"))
		var tol = 0;
		state.shopCart.list.forEach(ele => {
			tol += ele.num * ele.CurrentPrice;
		})
		state.total = tol;
	},
	add(state, data) {
		if (state.shopCart.list.length != 0) {
			var con = true;
			state.shopCart.list.forEach(ele => {
				if (ele.id == data.id) {
					con = false;
					ele.num += data.num;
					return
				}
			});
			if (con) {
				state.shopCart.list.push(data);
			}
			state.shopCart.N += data.num;
		} else {
			state.shopCart.list.push(data);
			state.shopCart.N += data.num;
		}
		var tol = 0;
		state.shopCart.list.forEach(ele => {
			tol += ele.num * ele.CurrentPrice;
		})
		state.total = tol;
		Store.set("shopCart", state.shopCart);
	},
	jia(state, data) {
		state.shopCart.list.forEach(ele => {
			if (ele.id == data.id) {
				ele.num++;
				state.shopCart.N++;
			}
		})
		var tol = 0;
		state.shopCart.list.forEach(ele => {
			tol += ele.num * ele.CurrentPrice;
		})
		state.total = tol;
		Store.set("shopCart", state.shopCart);
	},
	jian(state, data) {
		state.shopCart.list.forEach(ele => {
			if (ele.id == data.id) {
				ele.num--;
				state.shopCart.N--;
			}
		})
		var tol = 0;
		state.shopCart.list.forEach(ele => {
			tol += ele.num * ele.CurrentPrice;
		})
		state.total = tol;
		Store.set("shopCart", state.shopCart);
	},
	//清空购物车
	cleanCart(state) {
		state.shopCart = { "N": 0, "list": [] };
		Store.set("shopCart", state.shopCart);
	}
}
//定义 computed(属性计算)
const getters = {
	count(state) {
		return state.num * state.price;
	}
}

//定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions = {
	syFn(context) {
		// context.state  可以取 state 属性
		// context.commit  可以调用 mutations 同步方法 属性
		// context.dispatch可以调用 actions 异步方法 属性
		// 在组件里面调用 也是一样,同上面的方法一直 
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
