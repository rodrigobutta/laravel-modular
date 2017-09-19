@extends('master/index')


@section('content')

    <section class="resultados-busqueda">
        <div class="results">
            <div class="wrapper">
                <div class="component section-top">
                    <div class="title">resultados<br> de la búsqueda</div>
                </div>
            </div>

            <?php
            $wheres['tasks'] = 'Equipos';
            $wheres['task_categories'] = 'Familias';
            $wheres['pages'] = 'Otros resultados';
            $now = '';
            ?>


            <div class="component searchresults">
                @if(count($posts) > 0)

                    @foreach($posts as $post)
                        <?php if($post['table'] != $now) {
                            echo '<h3><div class="wrapper">' . $wheres[$post['table']] . '</div></h3>';
                            $now = $post['table'];
                        } ?>

                        <div class="page">
                            <div class="wrapper">
                                <a href="{{ $post['link'] }}">{{ $post['title'] }}</a>
                            </div>
                        </div>

                    @endforeach

                @else

                    <div class="page">
                        <div class="wrapper">
                            <h4>No hay resultados.</h4>
                        </div>
                    </div>

                @endif
            </div>


            <nav class="buttons wrapper">
                @if($posts->prevUrl != '')
                    <a href="{{ URL::to('/busqueda').$posts->prevUrl }}" class="btn-front prev">&lt; Anterior</a>
                @endif
                @if($posts->nextUrl != '')
                    <a href="{{ URL::to('/busqueda').$posts->nextUrl }}" class="btn-front next">Siguiente &gt;</a>
                @endif
            </nav>


        </div>
    </section>

@endsection

@section('extra-js')
    <script>
        $(function(){
            $('input[name="term"]').on('keyup', function(e) {
                if (e.keyCode == 13) {
                    search();
                }
            });
            $('.searchbox button').on('click', function(e) {
                search();
            });
        });

        function search() {
            var term = $('input[name="term"]').val();
            document.location.href = '{{ URL::to('/busqueda') }}/'+term;
        }
    </script>
@endsection