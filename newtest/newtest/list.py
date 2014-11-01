#coding=utf-8

from django.shortcuts import render_to_response

address = [
        {'name':'zhang3', 'address':'add1'},
        {'name':'li4', 'address':'add2'}
        ]

def index(request):
    return render_to_response('list.html', {'address':address})
