
    <!-- Google Webfont -->
    {{-- <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'> --}}
    {{-- <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700|Open+Sans:400,700" rel="stylesheet"> --}}
    {{-- <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700|Raleway:400,700" rel="stylesheet"> --}}
    {{-- <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"> --}}
    {{-- <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400,700" rel="stylesheet"> --}}
    {{-- <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Open+Sans:400,700" rel="stylesheet"> --}}
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Raleway" rel="stylesheet">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.0/SmoothScroll.min.js"></script>


    @if(env('APP_DEBUG'))
        {!! HTML::style('public/css/vendor.css') !!}
        {!! HTML::style('public/css/app.css') !!}
        {!! HTML::script('public/js/vendor.js') !!}
        {!! HTML::script('public/js/app.js') !!}
    @else
        {!! HTML::style('public/build/vendor.min.css') !!}
        {!! HTML::style('public/build/app.min.css') !!}
        {!! HTML::script('public/build/vendor.min.js') !!}
        {!! HTML::script('public/build/app.min.js') !!}
    @endif


    {{-- {!! HTML::style('public/css/themify-icons.css') !!} --}}
    {{-- {!! HTML::style('public/css/bootstrap.css') !!} --}}
    {{-- {!! HTML::style('public/css/owl.carousel.min.css') !!} --}}
    {{-- {!! HTML::style('public/css/owl.theme.default.min.css') !!} --}}
    {{-- {!! HTML::style('public/css/magnific-popup.css') !!} --}}
    {{-- {!! HTML::style('public/css/superfish.css') !!} --}}
    {{-- {!! HTML::style('public/css/animate.css') !!} --}}
    {{-- {!! HTML::style('public/css/font-awesome.css') !!} --}}
    <!--[if IE]>
       {!! HTML::style('public/css/explorer.css') !!}
    <![endif]-->

    <!-- vendor.js -->
    {{-- {!! HTML::script('public/vendor/js/jquery-1.10.2.min.js') !!} --}}
    {{-- {!! HTML::script('public/vendor/js/jquery.easing.1.3.js') !!} --}}
    {{-- {!! HTML::script('public/vendor/js/bootstrap.js') !!} --}}
    {{-- {!! HTML::script('public/vendor/js/owl.carousel.min.js') !!}     --}}
    {{-- {!! HTML::script('public/vendor/js/jquery.magnific-popup.min.js') !!}     --}}
    {{-- {!! HTML::script('public/vendor/js/hoverIntent.js') !!} --}}
    {{-- {!! HTML::script('public/vendor/js/superfish.js') !!} --}}
    {{-- {!! HTML::script('public/vendor/js/fastclick.js') !!}\ --}}
    {{-- {!! HTML::script('public/vendor/js/jquery.waypoints.min.js') !!} --}}
    {{-- {!! HTML::script('public/vendor/js/domready.js') !!} --}}
    {{-- {!! HTML::script('public/vendor/js/classie.js') !!} --}}
    {{-- {!! HTML::script('public/vendor/js/affix.js') !!} --}}
    {{-- {!! HTML::script('resources/assets/vendor/jquery-form/jquery.form.js') !!} --}}

    {{-- {!! HTML::script('public/js/frontend.js') !!} --}}
    {{-- {!! HTML::script('public/js/home.js') !!} --}}
