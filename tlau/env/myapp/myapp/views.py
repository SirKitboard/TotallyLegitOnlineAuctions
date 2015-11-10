from pyramid.view import view_config
from pyramid.response import Response

import pyramid.httpexceptions as exc

import mysql.connector


@view_config(route_name='home', renderer='templates/mytemplate.pt')
def my_view(request):
    return {'project': 'myapp'}


def hello_world(request):
    return Response('Hello EOD')


def allItems(request):
    cnx = mysql.connector.connect(user='root', password='SmolkaSucks69', host='127.0.0.1', database='305')
    cursor = cnx.cursor()

    query = ("SELECT * FROM Items ")

    cursor.execute(query)

    items = []
    for (ID, Name, Type, ManufactureYear, CopiesSold, Stock) in cursor:
        items.append({
            'id': ID,
            'name': Name,
            'type': Type,
            'manufactureYear': ManufactureYear,
            'copiesSold': CopiesSold,
            'stock': Stock
        })

    cursor.close()
    cnx.close()

    if(len(items.length) == 0):
        raise exc.HTTPNoContent()

    return items


def getItem(request):
    itemID = request.matchdict['id']
    cnx = mysql.connector.connect(user='root', password='SmolkaSucks69', host='127.0.0.1', database='305')
    cursor = cnx.cursor()

    query = ("SELECT * FROM Items WHERE ID = " + str(itemID))

    cursor.execute(query)

    item = None

    for (ID, Name, Type, ManufactureYear, CopiesSold, Stock) in cursor:
        item = {
            'id': ID,
            'name': Name,
            'type': Type,
            'manufactureYear': ManufactureYear,
            'copiesSold': CopiesSold,
            'stock': Stock
        }

    if(item is None):
        raise exc.HTTPNoContent()

    cursor.close()
    cnx.close()

    return item


def addItem(request):
    requiredKeys = ['name', 'type', 'manufactureYear', 'stock']
    postVars = request.POST
    acceptedKeys = []

    for key in requiredKeys:
        if(key in postVars):
            acceptedKeys.append(postVars[key])
        else:
            raise exc.HTTPBadRequest()

    query = ("INSERT INTO Items (Name, Type, ManufactureYear, Stock) VALUES (%s, %s, %d, %d)")

    cnx = mysql.connector.connect(user='root', password='SmolkaSucks69', host='127.0.0.1', database='305')
    cursor = cnx.cursor()

    cursor.execute(query, tuple(acceptedKeys))

    cursor.close()
    cnx.close()
