#pylint: disable=C,F
from pyramid.view import view_config
from pyramid.response import Response
from datetime import datetime
from decimal import Decimal


import pyramid.httpexceptions as exc

import mysql.connector

@view_config(route_name='salesReport', renderer='json')
def salesReport(request):
    session = request.session
    if('currentUser' not in session):
        raise exc.HTTPForbidden()
    elif(session['currentUser']['type'] == 0):
        raise exc.HTTPForbidden()
    elif(session['currentUser']['employeeType'] != 0):
        raise exc.HTTPForbidden()

    getVars = request.GET

    validKeys = ['month', 'year', 'itemID', 'customerID', 'itemType']

    acceptedValues = []
    queryAppend = []
    report = []

    query = "SELECT * FROM Sales_Report WHERE "

    for key in validKeys:
        if key in getVars:
            if(key == 'month'):
                queryAppend.append('MONTH(Time) = %s')
                acceptedValues.append(getVars[key])
            elif(key == 'year'):
                queryAppend.append('YEAR(Time) = %s')
                acceptedValues.append(getVars[key])
            else:
                queryAppend.append(key + " = %s")
                acceptedValues.append(getVars[key])

    query = query + ' AND '.join(queryAppend)

    try:
        cnx = mysql.connector.connect(user='root', password='SmolkaSucks69', host='127.0.0.1', database='305')
        cursor = cnx.cursor(dictionary=True)

        cursor.execute(query, tuple(acceptedValues))

        for row in cursor:
            reportValues = {}
            for key in row:
                if(isinstance(row[key], datetime)):
                    reportValues[key] = row[key].isoformat()
                elif(isinstance(row[key], Decimal)):
                    reportValues[key] = str(row[key])
                else:
                    reportValues[key] = row[key]
            report.append(reportValues)



        cursor.close()
        cnx.close()
    except mysql.connector.Error as err:
        return Response("Something went wrong: {}".format(err), status=500)

    return report
