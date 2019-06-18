import axios from 'axios'

import MockAdapter from 'axios-mock-adapter';
import { UsersData } from './data/userInfo'

let mock = new MockAdapter(axios);

mock.onGet('/login').reply(config => {
	var loginData = config.params;
	var usersData = UsersData[0];
	if (loginData.uname == usersData.username && loginData.upwd == usersData.password){
		return [200,{status:1,data:usersData,msg:"登录成功"}];
	}else{
		return [200,{status:-1,msg:"账号或密码错误"}];
	} 
});

export default axios;




