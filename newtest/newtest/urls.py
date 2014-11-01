from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'newtest.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', 'newtest.helloworld.index'),
    url(r'^add/$', 'newtest.add.index'),
    url(r'^list/$', 'newtest.list.index'),

   # url(r'^admin/', include(admin.site.urls)),
)
