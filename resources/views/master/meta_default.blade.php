@section('meta')

    <meta name="description" content="{{siteSettings('description')}}">
    <meta name="keywords" content="{{siteSettings('tags')}}">

    <meta property="og:title" content="{{ siteSettings('siteName') }}"/>
    <meta property="og:url" content="{{ Request::url() }}"/>
    <meta property="og:description" content="{{ siteSettings('description') }}"/>
    <meta property="og:image" content="{{ Resize::img(siteSettings('og_image'),'mainMedia') }}"/>

@stop