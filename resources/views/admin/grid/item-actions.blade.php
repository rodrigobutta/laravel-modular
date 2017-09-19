{{-- <a href="{{route('admin.grids.live', [$item->id])}}" class="btn btn-primary"><i class="fa fa-edit"></i> {{ t('Edit') }} </a> --}}
<a href="{{route('admin.grids.edit', [$item->id])}}" class="btn btn-primary"><i class="fa fa-tasks"></i> {{ t('Edit') }} </a>
<a href="{{route('admin.grids.clone', [$item->id])}}" class="btn btn-warning"><i class="fa fa-clone"></i> {{ t('Clone') }} </a>