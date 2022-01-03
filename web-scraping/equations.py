import requests
from bs4 import BeautifulSoup
import json
import os

# parse html
URL = "https://en.wikipedia.org/wiki/List_of_equations_in_nuclear_and_particle_physics"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
latex = soup.find_all('annotation')

# get equations
eqs = []
for tag in latex:
    eqs.append({
        "arr": [],
        "latex": tag.text.strip()
    })

# read/write to equations.json
branch = "nuclear / particle physics"
file = open(os.path.join(os.path.dirname(__file__) ,  "..\server\data\equations.json"), "r")
eqsDict = json.load(file)
eqsDict[branch] = eqs
eqsJson = json.dumps(eqsDict, indent=4, sort_keys=True)
file.close()

file = open(os.path.join(os.path.dirname(__file__) ,  "..\server\data\equations.json"), "w")
file.write(eqsJson)
file.close()

toprint = eqsJson
print(toprint)