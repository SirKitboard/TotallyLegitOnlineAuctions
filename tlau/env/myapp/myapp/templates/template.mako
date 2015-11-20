<!DOCTYPE html>
<html lang="${request.locale_name}">
<head>
    <meta charset="utf-8">

    <meta name="description" content="Home Page">
    <meta name="author" content="Team ¯\_(ツ)_/¯">
    <link rel="shortcut icon" href="${request.static_url('myapp:static/pyramid-16x16.png')}">

    <title>${self.title()}</title>

    <!-- Bootstrap core CSS -->
    <link type="text/css" href="${request.static_url('myapp:static/css/materialize/materialize.min.css')}" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <!-- Custom styles for this scaffold -->
    <link href="${request.static_url('myapp:static/css/index.css')}" rel="stylesheet">
    <link href="${request.static_url('myapp:static/css/template.css')}" rel="stylesheet">
    <link href="${request.static_url('myapp:static/css/navbar.css')}" rel="stylesheet">

</head>
<body>
    <nav>
        <div class="nav-wrapper">
            <a href="#" class="brand-logo">Totally Legit Auctions</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a class="sign-in">Why not sign in?</a><i class="material-icons">person_add</i></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
        </div>
    </nav>

    ${self.body()}

</body>
</html>