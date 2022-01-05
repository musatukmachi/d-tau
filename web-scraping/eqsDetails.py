import requests
from bs4 import BeautifulSoup
import json
import os
import re

def getValidName(tag):
    name = ''
    tr = tag.find_parent('tr')
    if tr is None:
        return name
    else:
        name = tr.findChild().text.strip()
        name = re.sub('\{\\\\displaystyle.*\}', '', name)
        name = re.sub('\\n', '', name)
        name = re.sub('.=.*$', '', name)
        if len(name) > 40 or len(name) == 1:
            name = ''
            return name
        else:
            return name

def getLatexArr(tag):
    temp = re.sub('=', ' = ', tag.text.strip())
    temp = re.sub('\s_', '_', temp)
    temp = re.sub("\s'", "'", temp)
    

    return temp

# parse html
URL = "https://en.wikipedia.org/wiki/List_of_equations_in_classical_mechanics"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
latexAll = soup.find_all('annotation')
equations = []
count = 0
for tag in latexAll:
    name = getValidName(tag)
    latexEq = getLatexArr(tag)
    print(latexEq)
    equations.append({
        "id": count,
        "name": name,
        "latex": latexEq
    })
    count += 1

# # get variables
# variables = []
# count = 0
# for tag in latex:
#     variables.append({
#         "id": count,
#         "name": ,
#         "latex": tag.text.strip()
#     })
#     count++

# # read/write to variables.json
# branch = "classical mechanics"
# file = open(os.path.join(os.path.dirname(__file__) ,  "..\server\data\variables.json"), "r")
# eqsDict = json.load(file)
# eqsDict[branch] = eqs
# eqsJson = json.dumps(eqsDict, indent=4, sort_keys=True)
# file.close()

# file = open(os.path.join(os.path.dirname(__file__) ,  "..\server\data\variables.json"), "w")
# file.write(eqsJson)
# file.close()

# toprint = eqsJson
# print(toprint)