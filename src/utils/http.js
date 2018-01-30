import axios from 'axios'
import Config from './config'

function http(options){
	return new Promise((resolve, reject) => {
		axios.defaults.headers["token"] = localStorage.getItem("token");
		axios.defaults.headers.post["Content-Type"] = "application/json";
		axios.defaults.withCredentials = true;	
		
		axios(options).then(mess => {
			resolve(mess.data);
		}, error => {
			reject(error);
		})
	})
}
/** 
 * @params {object} options: {method: 'post', url: '', params: {}, data: JSON.stringify({})}
*/
export default function(options={}){
	var defaults = Object.assign({}, {
		method: 'post'
	}, options);
	defaults.url = Config.baseUrl + defaults.url;
	return http(defaults);
}
