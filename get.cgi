#!/usr/bin/python
print """Content-Type: application/json;charset=UTF-8
"""

import sys, cgi, json
try:
 pattern = cgi.FieldStorage()['id'].value
except:
 pattern = 'Bigs'

patternFile = open('patterns/'+pattern+'.rle','r')
echo = {'id':pattern, 'rle':patternFile.read()}
patternFile.close()
print(json.JSONEncoder().encode(echo))
