<?php
    // TODO meter todo esto en un viewcomposer


    $all_actions = taskActions();

    $form_gtm_class = 'Contacto';

    $company_categories = [];
    foreach (helperCompanyCategories() as $cc){
        $company_categories[$cc->id] = $cc->name;
    }

    foreach ($all_actions as $c) {
        $c->available = true;
    }



    $form_title = "Contactá a Intranet";


?>


{!! Form::open(array('method' => 'post', 'class' => 'contact-form ' . $type, 'novalidate' => 'novalidate')) !!}


    <input name="type" type="hidden" value="{{ empty($type)?null:$type }}">
    <input name="task_id" type="hidden" value="null">
    <input name="categories[]" type="hidden" value="null">
    <input name="download_path" type="hidden" value="null">

    <div class="form-response-overlay">
        <p>Cargando..</p>
    </div>

    <div class="form-group field">
        {!! Form::text('name', null, array('required','class'=>'form-control')) !!}
        <label for="name">Nombre *</label>
    </div>
    <div class="form-group field">
        {!! Form::text('surname', null,array('required','class'=>'form-control')) !!}
        <label for="surname">Apellido *</label>
    </div>

    <div class="form-group field">
        {!! Form::text('company', null,array('class'=>'form-control')) !!}
        <label for="surname">Empresa</label>
    </div>
    <div class="form-group field select">
        {!! Form::select('company_category', $company_categories, null ,array('class'=>'form-control','title'=>'Rubro','placeholder'=>'Rubro')) !!}
    </div>

    <div class="form-group field">
        {!! Form::text('email', null,array('required','class'=>'form-control')) !!}
        <label for="surname">E-mail *</label>
    </div>
    <div class="form-group field">
        {!! Form::text('phone', null,array('required','class'=>'form-control')) !!}
        <label for="surname">Teléfono *</label>
    </div>

    <div class="form-group field select">
        {!! Form::select('countries', countries(), currentCountry(),array('required','class'=>'form-control','title'=>'País','placeholder'=>'País')) !!}
    </div>
    <div class="form-group field select">
        {!! Form::select('states', [], null,array('class'=>'form-control','title'=>'Provincia/Estado','style' => 'display: none;','placeholder'=>'Provincia/Estado','disabled'=>'disabled')) !!}
    </div>
    <div class="form-group field select">
        {!! Form::select('cities', [], null,array('class'=>'form-control','title'=>'Ciudad','style' => 'display: none;','placeholder'=>'Ciudad','disabled'=>'disabled')) !!}
    </div>

    <div class="form-group checkboxes actions">
        <label for="actions">Me interesa</label>
        <ul id="actions" class="tree">
            <?php
            // TODO REB: PONER TODA ESTA LOGICA EN ALGUN VIEW COMPOSER O ALGO
            $curDepth = 0;
            $counter = 0;
            foreach ($all_actions  as $c){
                if ($c->depth == $curDepth){
                    if ($counter > 0) echo "</li>";
                }
                elseif ($c->depth > $curDepth){
                    echo "<ul>";
                    $curDepth = $c->depth;
                }
                elseif ($c->depth < $curDepth){
                    echo str_repeat("</li></ul>", $curDepth - $c->depth), "</li>";
                    $curDepth = $c->depth;
                }

                if($c->available){
                    ?>
                    <li>
                        <div class="custom-checkbox">
                            <input id="action_{{ $c->id }}" class="action_checkbox" type="checkbox" name="actions[]" rel="{{ $c->name }}" value="{{ $c->id }}" {{ $c->checked }}/>
                            <label for="action_{{ $c->id }}">{{ $c->title }}</label>
                        </div>
                    <?php
                }

                $counter++;
            }
            echo str_repeat("</li></ol>", $curDepth), "</li>";
            ?>
        </ul>
    </div>

    <div class="form-group field textarea" style="width:100%">
        <label for="mensaje">Mensaje</label>
        {!! Form::textarea('message', null,array('required','class'=>'form-control')) !!}
    </div>

    <div class="form-group field button">
        {!! Form::button('Enviar',array('type'=>'submit', 'class' => 'btn btn-primary btn-lg ' . $form_gtm_class)) !!}
    </div>

{!! Form::close() !!}
