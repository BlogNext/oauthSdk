/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-12 14:05:23
 * @LastEditros: 
 * @LastEditTime: 2021-05-19 17:04:16
 */
import qs from 'qs'
import request from "./utils";


class OAuthSSO {
  private client_id: string;
  private redirect_url: string;
  private login_url: string;

  constructor(client_id: string = '', redirect_url: string = '') {
    this.client_id = client_id;
    this.redirect_url = redirect_url;
    this.login_url = `https://login.laughingzhu.cn/`
  }


  // 博客登录，颁发令牌方法
  async login () {
    if(window) {
      /**
       * 浏览器环境
       */
    
      const searchQuery = qs.parse(location.search, {ignoreQueryPrefix: true })
      if(searchQuery.pre_auth_code) {

        let res = await this.loginRequest(this.redirect_url, {pre_code: searchQuery.pre_auth_code})
        if(res.code === 0) {
          console.log('登录成功', res)
          
          let stateObj = {
            ...searchQuery,
            pre_auth_code: null,
            token: res.data
          }
          location.replace(`${location.href.split('?')[0]}?${qs.stringify(stateObj, { addQueryPrefix: true })}`)
        } else {
          // login error
          console.log('登录失败')
        }
      }
  
  
      
    } else {
      /**
       * 非浏览器环境，node
       */
      return false;
    }
  }

  /**
   * @description 跳转登录页页面，获取pre_oauth_code
   */
  _init () {
    location.href = `${this.login_url}?client_id=${this.client_id}&redirect_url=${this.redirect_url}`
  }




  // api

  /**
   * @description 颁发令牌api
   * @param data 
   * @returns 
   */
  async loginRequest (url: string, data: any) {
    return request(`${url}`, {
      method: 'POST',
      data
    })
  }

}



export default OAuthSSO;