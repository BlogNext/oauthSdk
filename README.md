<!--
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-14 10:54:31
 * @LastEditros: 
 * @LastEditTime: 2021-05-14 15:53:39
-->
# oauthSdk
基于oauth2.0实现单点登录，client 客户端接入文档

项目接入
```
npm install @laughingzhu/oauthsdk
```

对应文件
```
# 引入包
import OAuthSSO from '@laughingzhu/oauthsdk'

# 初始化sdk
let oauth: OAuthSSO | null = null
oauth = new OAuthSSO(client_id, redirect_url);

# 根据pre_auth_code获取令牌
oauth.login()

```

login 方法成功会重定向到client页面，带着参数token，及令牌
后续需要在请求header中带着