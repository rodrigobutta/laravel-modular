@extends('admin/master/index')
@section('content')

    <div class="row">
        <div class="col-md-8">
            <h2 id="item_title">Elementos del Job</h2>
        </div>
        <div class="col-md-4">
            <div class="pull-right">
                <button class="btn btn-primary" data-toggle="modal" data-target="#modalCreate">Nuevo</button>
            </div>
        </div>
    </div>


       <div class="row">

           <div class="col-md-3 sticky-parent">

               <div class="sticky" style="float: left;">

                   <div class="box box-default ">
                       <div class="box-header">
                           {{t('Show')}} {{t('Extra Fields')}}
                       </div>
                       <div class="box-body">

                           <div class="form-group form-group-stretch">
                               {!! Form::label('view_tags', t('Tags')) !!}
                               {{ Form::checkbox('view_tags',null, Request::get('view_tags'), ['class' => 'form-control view', 'rel' => 'tags']) }}
                           </div>
                           <div class="form-group form-group-stretch">
                              {!! Form::label('view_grids', t('Grids')) !!}
                              {{ Form::checkbox('view_grids',null, Request::get('view_grids'), ['class' => 'form-control view', 'rel' => 'grids']) }}
                           </div>
                           <div class="form-group form-group-stretch">
                              {!! Form::label('view_slug', t('Slug')) !!}
                              {{ Form::checkbox('view_slug',null, Request::get('view_slug'), ['class' => 'form-control view', 'rel' => 'slug']) }}
                           </div>
                           <div class="form-group form-group-stretch">
                              {!! Form::label('view_role', t('Role')) !!}
                              {{ Form::checkbox('view_role',null, Request::get('view_role'), ['class' => 'form-control view', 'rel' => 'role']) }}
                           </div>


                       </div>
                   </div>

               </div>

           </div>

           <div class="col-md-9">

               <div class="box  box-default">

                   <div class="box-body">

                       <div class="categories-sortable-list area" id="adminChannels">
                           <ol class=' list channelList list-group'>

                               <?php

                               $curDepth = 0;
                               $counter = 0;

                               foreach ($items as $item):
                               if ($item->depth == $curDepth)
                               {
                                   if ($counter > 0) echo "</li>";
                               }
                               elseif ($item->depth > $curDepth)
                               {
                                   echo "<ol>";
                                   $curDepth = $item->depth;
                               }
                               elseif ($item->depth < $curDepth)
                               {
                                   echo str_repeat("</li></ol>", $curDepth - $item->depth), "</li>";
                                   $curDepth = $item->depth;
                               }

                               ?>
                               <li class="list-group-item item" id='channel_{{ $item->id }}' data-id='{{ $item->id }}'>
                                   <div class='info'>
                                       <span class='channel channel-1'>
                                           <p class="category-name"><i class="fa fa-chevron-right" aria-hidden="true"></i> {{ $item->title }} {!! $item->published == 0 ? '<i class="fa fa-times text-danger"></i>' : '<i class="fa fa-check text-success"></i>' !!}</p>
                                           <p class="aditional slug">{{ $item->slug }}</p>
                                           {{-- <p class="aditional role">{{ $item->profile->title }}</p> --}}
                                           <p class="aditional tags">{!! $item->familyTags(', ',true) !!}</p>
                                           <p class="aditional grids">{!! $item->gridsResume(true) !!}</p>
                                       </span>
                                       <div class="category-options btn-group btn-group-sm" role="group" aria-label="Actions">
                                           <a href="{{ $item->getLink() }}" target="_blank" class="btn btn-success" rel="view"><i class="fa fa-eye"></i> {{t('View')}}</a>
                                           <a href="{{ route('admin.job.edit', ['id' => $item->id]) }}" class="btn btn-primary"><i class="fa fa-edit"></i> {{t('Edit')}}</a>
                                           <a href="{{ route('admin.job.clone', ['id' => $item->id]) }}" class="btn btn-warning"><i class="fa fa-clone"></i> {{t('Clone')}}</a>
                                           <a href="{{ route('admin.job.edit', ['id' => $item->id]) }}" href="#" class="btn btn-danger" rel="delete"><i class="fa fa-trash-o"></i> {{t('Delete')}}</a>
                                       </div>
                                   </div>

                               <?php $counter++; ?>

                               <?php endforeach;

                               echo str_repeat("</li></ol>", $curDepth), "</li>";
                               ?>
                           </ol>
                       </div>

                   </div>
               </div>

           </div>


       </div>

       <!-- Modal -->
       <div class="modal fade" id="modalCreate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
           <div class="modal-dialog">
               <div class="modal-content">
                   {!! Form::open(['role' => 'form'])  !!}
                       <div class="modal-header">
                           <button type="button" class="close"
                              data-dismiss="modal">
                                  <span aria-hidden="true">&times;</span>
                                  <span class="sr-only">{{ t('Close') }}</span>
                           </button>
                           <h4 class="modal-title" id="myModalLabel">
                               {{ t('Create') }}
                           </h4>
                       </div>
                       <div class="modal-body">
                           <div class="form-group">
                               <label for="title">{{ t('Name') }}</label>
                               {!! Form::text('title',null,['class'=>'form-control','placeholder'=>t('Name')])  !!}
                           </div>
                       </div>
                       <div class="modal-footer">
                           <button type="button" class="btn btn-default" data-dismiss="modal">{{ t('Close') }}</button>
                           {!! Form::submit(t('Accept'),['class'=>'btn btn-primary'])  !!}
                       </div>
                   {!! Form::close() !!}
               </div>
           </div>
       </div>









@endsection

@section('extra-js')

  <script type="text/javascript">

      $(function () {


              $('.btn[rel="delete"]').on('click',function(e) {
                  e.preventDefault();

                  var $this = $(this);
                  var url = $this.attr('href');

                  BootstrapDialog.show({
                      type: BootstrapDialog.TYPE_DANGER,
                      title: '{{t('Delete')}}',
                      message: '{{t('Are you sure you want to delete the element?')}}',
                      buttons: [{
                          label: '{{t('Confirm')}}',
                          cssClass: 'btn-danger',
                          action: function(dlg){

                              $.ajax({
                                  type: 'POST',
                                  url:url,
                                  data: {
                                      '_method': 'DELETE',
                                      // 'id': id
                                  },
                                  dataType: 'json',
                                  success: function (response) {
                                      dlg.close();

                                      toastr["success"](response);
                                      $this.closest('.item').fadeOut(500,function(){
                                          $(this).remove();
                                      });

                                  },
                                  error: function (response, ajaxOptions, thrownError) {
                                      dlg.close();
                                      // console.log('error');
                                      toastr["error"](response);
                                      console.log(response);
                                  },
                                  complete: function () {

                                  }
                              });

                          }
                      }, {
                          label: '{{t('Cancel')}}',
                          cssClass: 'btn-default',
                          action: function(dlg){
                              dlg.close();
                          }
                      }]
                  });

              });


              $('input.view').on('click',function(e) {

                  var $this = $(this);

                  if($this.is(':checked')){
                     $(".aditional."+$this.attr("rel")).fadeIn(200);
                  }
                  else{
                      $(".aditional."+$this.attr("rel")).fadeOut(200);
                  }
              });


              makeSortable();


          });

          function makeSortable(){

              $("#adminChannels .channelList").nestedSortable({
                  forcePlaceholderSize: true,
                  disableNestingClass: 'mjs-nestedSortable-no-nesting',
                  handle: '.category-name',
                  helper: 'clone',
                  items: 'li',
                  maxLevels: 0,
                  opacity: .6,
                  placeholder: 'placeholder',
                  revert: 250,
                  tabSize: 25,
                  tolerance: 'pointer',
                  toleranceElement: '> div',
                  update: function () {
                      $.ajax({
                          type: "POST",
                          url: "{{ route('admin.job.reorder') }}",
                          data: {
                              tree: $("#adminChannels .channelList").nestedSortable("toArray", {startDepthCount: -1})
                          },
                          globalLoading: true
                      });
                  }
              });

          }







          $(".aditional").each(function(){
              if($(this).html()==""){
                  $(this).remove();
              }
          });


          $('.list-group-item').on('click', function(e) {
              e.stopPropagation();
              var $this = $(this);
              $this.children('ol').slideToggle();
              $this.find('>.info .channel .category-name .fa-chevron-right').toggleClass('fa-rotate-90');
          });

          $('.list-group-item > ol').slideUp(0);

          $('.list-group-item').each(function(index, item) {
              if($(item).find('> ol').length <= 0) {
                  $(item).find('.fa-chevron-right').css('opacity','0');
              }
          });

          $('.category-options a').on('click', function(e) {
              e.stopPropagation();
          });


  </script>

@endsection