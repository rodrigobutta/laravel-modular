@extends('master/index')

@section('content')

    <div id="mail_form">

        @if ($item->cover_image)
        <div class="cover" style="background-image: url({{ Resize::img($item->cover_image, 'coverCampaign')  }});">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="wrapper">
                           <div class="wrapper-inner">
                              <h1>{!! $item->cover_title !!}</h1>
                              <p>{!! $item->copy !!}</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif


        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="subtitle">{{ $item->subtitle }}</h2>
                </div>
            </div>
        </div>

        @yield('campaignForm')

    </div>

@endsection


@section('extra-js')

    <script>
        var route_contact_store = "{{route('campaign.store',['slug' => $item->slug])}}";


        $(function(){


            campaignFormBind();

        });

    </script>

@endsection
