<?php


Route::group(['namespace' => '\App\Modules\Portfolio'], function () {


    Route::any('portfolio', ['as' => 'portfolio.index', 'uses' => 'PortfolioFrontController@getList']);
    Route::get('portfolio/{slug?}', ['as' => 'portfolio.view', 'uses' => 'PortfolioFrontController@getIndex']);
    Route::post('portfolio/data', ['as' => 'portfolio.data', 'uses' => 'PortfolioFrontController@getData']);


    Route::group(['middleware' => 'user.admin'], function () {

        Route::get('admin/portfolio', ['as' => 'admin.portfolio.list', 'uses' => 'PortfolioAdminController@getList']);
        Route::get('admin/portfolio/data', ['as' => 'admin.portfolio.data', 'uses' => 'PortfolioAdminController@getData']);
        Route::get('admin/portfolio/{id}/edit', ['as' => 'admin.portfolio.edit', 'uses' => 'PortfolioAdminController@edit']);
        Route::patch('admin/portfolio/{id}/state', ['as' => 'admin.portfolio.state', 'uses' => 'PortfolioAdminController@state', 'before' => 'csrf']);
        Route::patch('admin/portfolio/{id}/edit', ['as' => 'admin.portfolio.edit', 'uses' => 'PortfolioAdminController@patch', 'before' => 'csrf']);
        Route::delete('admin/portfolio/{id}/edit', ['as' => 'admin.portfolio.edit', 'uses' => 'PortfolioAdminController@delete', 'before' => 'csrf']);
        Route::get('admin/portfolio/{id}/clearcache', ['as' => 'admin.portfolio.clearcache', 'uses' => 'PortfolioAdminController@clearCache']);
        Route::put('admin/portfolio/create', ['as' => 'admin.portfolio.create', 'uses' => 'PortfolioAdminController@put', 'before' => 'csrf']);
        Route::post('admin/portfolio/approve', ['as' => 'admin.portfolio.approve', 'uses' => 'PortfolioAdminController@approve']);
        Route::get('admin/portfolio/{id}/clone', ['as' => 'admin.portfolio.clone', 'uses' => 'PortfolioAdminController@doClone']);
        Route::get('admin/portfolio/{id}/clonex/{site}', ['as' => 'admin.portfolio.clonex', 'uses' => 'PortfolioAdminController@doClonex']);
        Route::get('admin/portfolio/search', ['as' => 'admin.portfolio.search', 'uses' => 'PortfolioAdminController@search']);
        Route::post('admin/portfolio/reorder', ['as' => 'admin.portfolio.reorder', 'uses' => 'PortfolioAdminController@reorder']); // csrf
        // Route::get('admin/portfolio/export', ['as' => 'admin.portfolio.export', 'uses' => 'PortfolioAdminController@exportToExcel']);
        // Route::get('admin/portfolio/import', ['as' => 'admin.portfolio.import', 'uses' => 'PortfolioAdminController@importExcel']);
        // Route::post('admin/portfolio/import', ['as' => 'admin.portfolio.import', 'uses' => 'PortfolioAdminController@processExcel']);


    });

});