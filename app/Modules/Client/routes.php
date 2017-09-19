<?php


Route::group(['namespace' => '\App\Modules\Client'], function () {


    Route::any('clientes', ['as' => 'client.index', 'uses' => 'ClientFrontController@getList']);
    Route::get('clientes/#{slug?}', ['as' => 'client.view', 'uses' => 'ClientFrontController@getIndex']);
    Route::post('clientes/data', ['as' => 'client.data', 'uses' => 'ClientFrontController@getData']);


    Route::group(['middleware' => 'user.admin'], function () {

        Route::get('admin/client', ['as' => 'admin.client.list', 'uses' => 'ClientAdminController@getList']);
        Route::get('admin/client/data', ['as' => 'admin.client.data', 'uses' => 'ClientAdminController@getData']);
        Route::get('admin/client/{id}/edit', ['as' => 'admin.client.edit', 'uses' => 'ClientAdminController@edit']);
        Route::patch('admin/client/{id}/state', ['as' => 'admin.client.state', 'uses' => 'ClientAdminController@state', 'before' => 'csrf']);
        Route::patch('admin/client/{id}/edit', ['as' => 'admin.client.edit', 'uses' => 'ClientAdminController@patch', 'before' => 'csrf']);
        Route::delete('admin/client/{id}/edit', ['as' => 'admin.client.edit', 'uses' => 'ClientAdminController@delete', 'before' => 'csrf']);
        Route::get('admin/client/{id}/clearcache', ['as' => 'admin.client.clearcache', 'uses' => 'ClientAdminController@clearCache']);
        Route::put('admin/client/create', ['as' => 'admin.client.create', 'uses' => 'ClientAdminController@put', 'before' => 'csrf']);
        Route::post('admin/client/approve', ['as' => 'admin.client.approve', 'uses' => 'ClientAdminController@approve']);
        Route::get('admin/client/{id}/clone', ['as' => 'admin.client.clone', 'uses' => 'ClientAdminController@doClone']);
        Route::get('admin/client/{id}/clonex/{site}', ['as' => 'admin.client.clonex', 'uses' => 'ClientAdminController@doClonex']);
        Route::get('admin/client/search', ['as' => 'admin.client.search', 'uses' => 'ClientAdminController@search']);
        Route::post('admin/client/reorder', ['as' => 'admin.client.reorder', 'uses' => 'ClientAdminController@reorder']); // csrf
        // Route::get('admin/client/export', ['as' => 'admin.client.export', 'uses' => 'ClientAdminController@exportToExcel']);
        // Route::get('admin/client/import', ['as' => 'admin.client.import', 'uses' => 'ClientAdminController@importExcel']);
        // Route::post('admin/client/import', ['as' => 'admin.client.import', 'uses' => 'ClientAdminController@processExcel']);


    });

});