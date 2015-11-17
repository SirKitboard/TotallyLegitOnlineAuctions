from pyramid.config import Configurator

from pyramid.session import SignedCookieSessionFactory
my_session_factory = SignedCookieSessionFactory('itsaseekreet')


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.set_session_factory(my_session_factory)

    # Define all routes
    config.add_route('home', '/')

    # Item Routes
    config.add_route('allItems', 'api/items')
    config.add_route('getItem', 'api/items/{id}', request_method='GET')
    config.add_route('addItem', 'api/items', request_method='POST')
    config.add_route('updateItem', 'api/items/{id}', request_method='PUT')
    config.add_route('hello', '/hello')
    config.add_route('deleteItem', 'api/items/{id}', request_method='DELETE')
    # config.add_route('sessionTest', '/ses')

    # User Routes
    config.add_route('login', 'api/login')
    config.add_route('logout', 'api/logout')
    config.add_route('currentUser', 'api/currentUser')

    # Employee Routes
    config.add_route('allEmployees', 'api/employees', request_method='GET')
    config.add_route('getEmployee', 'api/employees/{id}', request_method='GET')
    config.add_route('addEmployee', 'api/employees', request_method='POST')

    # Customer Routes
    config.add_route('allCustomers', 'api/customers', request_method='GET')
    config.add_route('addCustomer', 'api/customers', request_method="POST")
    config.add_route('getCustomer', 'api/customers/{id}', request_method='GET')

    config.scan()
    return config.make_wsgi_app()
