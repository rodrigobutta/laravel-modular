@extends('admin/master/index')
@section('content')
    <div class="box">
        <div class="box-body">
            {!! Form::open() !!}

            <div class="form-group">
                <label for="addnew">Tags Limit</label>
                <select name="tagsLimit" class="form-control">
                    <option value="{{ (int)siteSettings('tagsLimit') }}">{{ (int)siteSettings('tagsLimit') }}</option>
                    <option>--------</option>
                    <?php for ($l = 1; $l <= 30; $l++): ?>
                    <option value="{{ $l }}">{{ $l }}</option>
                    <?php endfor; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="addnew">Max Image size allowed in MB</label>
                <select name="maxImageSize" class="form-control">
                    <option value="{{ siteSettings('maxImageSize') }}">{{ siteSettings('maxImageSize') }}</option>
                    <option>--------</option>
                    <?php for ($l = 1; $l <= maxUploadSize(); $l += .5): ?>
                    <option value="{{ $l }}">{{ $l }}</option>
                    <?php endfor; ?>
                </select>
            </div>

            <div class="form-group">
                {!! Form::submit('Update',array('class'=>'btn btn-success')) !!}
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

