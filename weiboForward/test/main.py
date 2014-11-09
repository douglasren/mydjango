# -*- coding: utf-8 -*-

import weiboLogin
import urllib
import urllib2
import time

filename = 'in.txt'#保存微博账号的用户名和密码，第一行为用户名，第二行为密码

WBLogin = weiboLogin.weiboLogin()
if WBLogin.login(filename)==1:
    print 'Login success!'
    WBLogin.forward()
else:
    print 'Login error!'
    exit()
