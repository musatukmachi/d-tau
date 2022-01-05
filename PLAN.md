# INTEGRAL - Physics Analysis Tool

### Monitization
- put on RapidAPI

## Features

### Database
- Database of all physics equations
- store equations as:
  - Name
  - string representation of equation
  - array of variables involved
  - store also a computation version of equation: an id associated with a script

### Analysis
- Sorting and analysis algorithms on this database
  - find all equations linked to selected variable
- Choose variables and make plots according to database of equations
- make any variable to subject of an equation
- search variables -> gives all equations containing these variables
- create graph structure of all variables related to each other

### Automated Theorem Proving
- put equations fact/rule set in prolog and query this to check for valid equation search
- will need a way to solve for units when searching for new equations