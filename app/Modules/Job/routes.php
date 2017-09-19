<?php


Route::group(['namespace' => '\App\Modules\Job'], function () {


    Route::any('jobsroot', ['as' => 'job.index', 'uses' => 'JobFrontController@getList']);

    Route::any('jobs/{mslug?}', ['as' => 'job.view', 'uses' => 'JobFrontController@getView'])->where('mslug', '(.*)');



    Route::group(['middleware' => 'user.admin'], function () {


        Route::get('admin/job', ['as' => 'admin.job.list', 'uses' => 'JobAdminController@getList']);
        Route::post('admin/job', ['as' => 'admin.job.put', 'uses' => 'JobAdminController@put']);
        Route::post('admin/job/reorder', ['as' => 'admin.job.reorder', 'uses' => 'JobAdminController@reorder']);
        Route::patch('admin/job/{id}/state', ['as' => 'admin.job.state', 'uses' => 'JobAdminController@state', 'before' => 'csrf']);
        Route::get('admin/job/{id}/edit', ['as' => 'admin.job.edit', 'uses' => 'JobAdminController@edit']);
        Route::patch('admin/job/{id}/edit', ['as' => 'admin.job.edit', 'uses' => 'JobAdminController@patch']);
        Route::delete('admin/job/{id}/edit', ['as' => 'admin.job.edit', 'uses' => 'JobAdminController@delete']);
        Route::get('admin/job/{id}/clone', ['as' => 'admin.job.clone', 'uses' => 'JobAdminController@doClone']);
        Route::get('admin/job/search', ['as' => 'admin.job.search', 'uses' => 'JobAdminController@search']);




    });

});