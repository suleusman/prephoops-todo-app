<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Prephoops Todo App</title>
<script src="{{ asset('js/app.js') }}" defer></script>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
       
        <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
        
        <!-- Styles -->
        <style>        </style>

        <style>
            body {
                font-family: 'Roboto', sans-serif;
            }
            a:link{
                color:red;
            }
        </style>
    </head>
    <body >
        <div class="container">
        <div class="d-flex flex-row-reverse">
             @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a href="{{ url('/home') }}" class="text-sm text-gray-700 underline">Home</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                        @endif
                    @endauth
                </div>
            @endif
        </div>
        </div>
       
       <div class="d-flex align-items-center justify-content-center" style="height: 350px">
            <div class="row">
                <div class="col-md-8">
                <h1>Welcome To The Prep Network Challenge</h1>
                </div>
            </div>
        </div>
    </body>
</html>
