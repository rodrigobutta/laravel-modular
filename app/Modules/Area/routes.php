<?php


Route::group(['namespace' => '\App\Modules\Area'], function () {


    Route::any('areas', ['as' => 'area.all', 'uses' => 'AreaFrontController@getList']);
    Route::get('areas/#{slug?}', ['as' => 'area.view', 'uses' => 'AreaFrontController@getIndex']);
    Route::post('areas/data', ['as' => 'area.data', 'uses' => 'AreaFrontController@getData']);


    Route::group(['middleware' => 'user.admin'], function () {

        Route::get('admin/area', ['as' => 'admin.area.list', 'uses' => 'AreaAdminController@getList']);
        Route::get('admin/area/data', ['as' => 'admin.area.data', 'uses' => 'AreaAdminController@getData']);
        Route::get('admin/area/{id}/edit', ['as' => 'admin.area.edit', 'uses' => 'AreaAdminController@edit']);
        Route::patch('admin/area/{id}/state', ['as' => 'admin.area.state', 'uses' => 'AreaAdminController@state', 'before' => 'csrf']);
        Route::patch('admin/area/{id}/edit', ['as' => 'admin.area.edit', 'uses' => 'AreaAdminController@patch', 'before' => 'csrf']);
        Route::delete('admin/area/{id}/edit', ['as' => 'admin.area.edit', 'uses' => 'AreaAdminController@delete', 'before' => 'csrf']);
        Route::get('admin/area/{id}/clearcache', ['as' => 'admin.area.clearcache', 'uses' => 'AreaAdminController@clearCache']);
        Route::put('admin/area/create', ['as' => 'admin.area.create', 'uses' => 'AreaAdminController@put', 'before' => 'csrf']);
        Route::post('admin/area/approve', ['as' => 'admin.area.approve', 'uses' => 'AreaAdminController@approve']);
        Route::get('admin/area/{id}/clone', ['as' => 'admin.area.clone', 'uses' => 'AreaAdminController@doClone']);
        Route::get('admin/area/{id}/clonex/{site}', ['as' => 'admin.area.clonex', 'uses' => 'AreaAdminController@doClonex']);
        Route::get('admin/area/search', ['as' => 'admin.area.search', 'uses' => 'AreaAdminController@search']);
        Route::post('admin/area/reorder', ['as' => 'admin.area.reorder', 'uses' => 'AreaAdminController@reorder']); // csrf
        // Route::get('admin/area/export', ['as' => 'admin.area.export', 'uses' => 'AreaAdminController@exportToExcel']);
        // Route::get('admin/area/import', ['as' => 'admin.area.import', 'uses' => 'AreaAdminController@importExcel']);
        // Route::post('admin/area/import', ['as' => 'admin.area.import', 'uses' => 'AreaAdminController@processExcel']);


    });

});