#/usr/bin/python
#coding:utf-8
#shumengren2010@gmail.com
#weibo zhuan fa


import requests
import base64
import re
import urllib
import rsa
import json
import binascii
import time
session=0
uid=0
resp=0
def Login(username,password):
    global session
    global uid
    global resp
    session = requests.Session()
    url_prelogin = 'http://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&su=&rsakt=mod&client=ssologin.js(v1.4.5)&_=1364875106625'
    url_login = 'http://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.5)'
    resp = session.get(url_prelogin)
    json_data = http://blog.csdn.net/wcc526/article/details/re.search(\((.*)\), resp.content).group(1)
    data = http://blog.csdn.net/wcc526/article/details/json.loads(json_data)
    servertime = data['servertime']
    nonce = data['nonce']
    pubkey = data['pubkey']
    rsakv = data['rsakv']
    su = base64.b64encode(urllib.quote(username))
    rsaPublickey= int(pubkey,16)
    key = rsa.PublicKey(rsaPublickey,65537)
    message = str(servertime) +'\t' + str(nonce) + '\n' + str(password)
    sp = binascii.b2a_hex(rsa.encrypt(message,key))
    postdata = http://blog.csdn.net/wcc526/article/details/{
   'entry': 'weibo',
    'gateway': '1',
    'from': '',
    'savestate': '7',
    'userticket': '1',
    'ssosimplelogin': '1',
    'vsnf': '1',
    'vsnval': '',
    'su': su,
    'service': 'miniblog',
    'servertime': servertime,
    'nonce': nonce,
    'pwencode': 'rsa2',
    'sp': sp,
    'encoding': 'UTF-8',
    'url': 'http://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack',
    'returntype': 'META',
    'rsakv' : rsakv,
    }
    resp = session.post(url_login,data=http://blog.csdn.net/wcc526/article/details/postdata)
    login_url = re.findall('replace\("(.*)"\)',resp.content)
    resp = session.get(login_url[0])
    uid = re.findall('"uniqueid":"(\d+)",',resp.content)[0]
def decode_content(content):
    result = re.findall('<script>STK && STK.pageletM && STK.pageletM.view\((.*?)\)<\/script>',content)
    for i in result:
        r = i.encode("utf-8").decode('unicode_escape').encode("utf-8")
        print r.replace("\/","/")
# 投票
def add_vote():
    global session
    global uid
    global resp
    votedata=http://blog.csdn.net/wcc526/article/details/{
           'item':'4',
            'share':'1',
            'poll_id':'*******',
            'poll_category':'0',
            '_t':'0'
    } 
    headers={}
    headers={'User-Agent':'Mozilla/5.0 (X11; Linux i686; rv:8.0) Gecko/20100101 Firefox/8.0',
            'Referer':'http://vote.weibo.com/vid=*******'}
    resp = session.post("http://vote.weibo.com/poll/joined",data=votedata,headers=headers)
    print resp.status_code
# 发送微博
def add_new(content):
    global uid
    global resp
    add_url = "http://weibo.com/aj/mblog/add?_wv=5&__rnd=%s770"% int(time.time())
    add_data = http://blog.csdn.net/wcc526/article/details/{
   'text':content,
    'rank':0,
    'rankid':'',
    'location':'home',
    'module':'stissue',
    "hottopicid":"",
    '_surl':'',
    'pic_id':'',
    '_t':0,
    }
    headers={}
    headers ['set-cookie']= resp.headers['set-cookie']
    headers['Referer'] = 'http://weibo.com/u/'+uid+'?topnav=1&wvr=5'
    resp = session.post(add_url,data=http://blog.csdn.net/wcc526/article/details/add_data,headers=headers)
    print resp.status_code
# 转发
# forward('3606151827013483', "转发")
def forward(mid,content):
    global uid
    global resp
    forwardurl = "http://weibo.com/aj/mblog/forward?_wv=5&__rnd=%s"% int(time.time())
    data = http://blog.csdn.net/wcc526/article/details/{'mid':mid, 'style-type':1, 'reason':content, 'rank':0, 'location':'mblog', '_t':0}
    headers = {}
    headers['set-cookie'] = resp.headers['set-cookie']
    headers['Referer'] = 'http://weibo.com/u/'+uid+'?topnav=1&wv=5'
    respon = session.post(forwardurl, data, headers=headers)
    print respon.status_code
    forward('3606151827013483', "转发")
# 关注
# followed('2898801847',uid)
def followed(dstuid,oid):
    global uid
    global resp
    followedurl = "http://weibo.com/aj/f/followed?_wv=5&__rnd=%s"% int(time.time())
    data = http://blog.csdn.net/wcc526/article/details/{'uid':dstuid, 'rank':0, 'location':'mblog', '_t':0,'f':0,
    'oid':oid,
    'nogroup':'false',
    'challenge_uids':'',
    'check_challenge_value':'',
    'location':'home',
    'refer_sort':'interest',
    'refer_flag':'friend_bridge',
    'loc':1,
    }
    headers = {}
    headers['set-cookie'] = resp.headers['set-cookie']
    headers['Referer'] = 'http://weibo.com/u/'+oid+'?topnav=1&wv=5'
    respon = session.post(followedurl, data, headers=headers)
    print respon.status_code
if __name__=="__main__":
     fp=open("in.txt","r").readlines()
     for line in fp:
         line=line.split('\t')
         print line[0],line[1]
         try:
             Login(line[0].strip(),line[1].strip())
             add_vote()
         except:
             print "not login"
             pass
         else:
             time.sleep(181)

