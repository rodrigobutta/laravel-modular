<?php


Route::pattern('id', '[0-9]+');

Route::get('image/{name}/{recipe?}', ['as' => 'media.image', 'uses' => 'MediaController@getImage']);
Route::get('video/{name}', ['as' => 'media.video', 'uses' => 'MediaController@getVideo']);
// abarca los metodos image y video de forma automatica
Route::get('media/{name}/{recipe?}', ['as' => 'media.view', 'uses' => 'MediaController@getMedia']);
Route::get('player/{name}', ['as' => 'media.player', 'uses' => 'MediaController@getPlayer']);

Route::get('tag/{tag}', ['as' => 'tags', 'uses' => 'TagsController@getIndex']);
Route::get('notifications', ['as' => 'notifications', 'uses' => 'UserController@getNotifications']);
Route::get('search', ['as' => 'search', 'uses' => 'TaskController@search']);
Route::get('lang/{lang?}', 'PolicyController@switchLang');
Route::post('queue/receive', 'PolicyController@queue');

//CONTACT
Route::get('contacto', ['as' => 'contact', 'uses' => 'ContactController@createForm']);
Route::post('contacto', ['as' => 'contact.store', 'uses' => 'ContactController@storeData']);
Route::post('contacto/countries', ['as' => 'contact.countries', 'uses' => 'ContactController@getCountries']);
Route::post('contacto/states', ['as' => 'contact.states', 'uses' => 'ContactController@getStatesByCountryArr']);
Route::post('contacto/cities', ['as' => 'contact.cities', 'uses' => 'ContactController@getCitiesByStateArr']);

//FILE UPLOAD
Route::get('service/fileupload', ['as' => 'service.uploader.display', 'uses' => 'FileUploadController@display']);
Route::post('service/fileupload', ['as' => 'service.uploader.fileupload', 'uses' => 'FileUploadController@uploadDocument']);

// BUSCAR
Route::get('busqueda/{where}/{term}/{page?}', ['as' => 'service.search', 'uses' => 'ServiceController@fullSearch']);

// DIRECT FILE DOWNLOAD
// For the path, use _ instead of /
Route::get('download/{path}', ['as' => 'service.filedownload', 'uses' => 'ServiceController@fileDownload']);


Route::group(['middleware' => 'guest'], function () {

    Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@getLogin']);
    Route::get('auth/{provider}', 'Auth\LoginController@getSocial');
    Route::get('auth/{provider}/callback', 'Auth\LoginController@getSocialCallback');
    Route::get('registration/{provider}', 'Auth\RegistrationController@getSocialRegister');
    Route::get('registration', ['as' => 'registration', 'uses' => 'Auth\RegistrationController@getIndex']);
    Route::get('registration/activate/{username}/{code}', 'Auth\RegistrationController@validateUser');
    Route::get('password/email', ['as' => 'password.reminder', 'uses' => 'Auth\PasswordController@getEmail']);
    Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');

});
Route::group(['middleware' => 'csrf:guest'], function () {

    Route::post('login', 'Auth\LoginController@postLogin');
    Route::post('registration/{provider}', 'Auth\RegistrationController@postSocialRegister');
    Route::post('password/email', 'Auth\PasswordController@postEmail');
    Route::post('password/reset/{token}', 'Auth\PasswordController@postReset');
    Route::post('registration', 'Auth\RegistrationController@postIndex');

});

Route::group(['middleware' => 'auth'], function () {

    Route::get('user', ['as' => 'user.panel', 'uses' => 'Auth\LoginController@getUser']);
    Route::get('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@getLogout']);
    Route::get('media/{any}/download', ['as' => 'media.download', 'uses' => 'MediaController@download']);
    Route::get('settings', ['as' => 'users.settings', 'uses' => 'UserController@getSettings']);

});

/**
 * Post Sections CSRF + AUTH both
 */
Route::group(['middleware' => 'csrf:auth'], function () {
    Route::post('settings/changepassword', 'UserController@postChangePassword');
    Route::post('settings/updateprofile', 'UserController@postUpdateProfile');
    Route::post('settings/mailsettings', 'UserController@postMailSettings');
    Route::post('settings/updateavatar', 'UserController@postUpdateAvatar');
    Route::post('user/{username}/report', 'ReportController@postReportUser');
});

Route::group(['middleware' => 'user.admin', 'namespace' => 'Admin'], function () {

    Route::get('admin', ['as' => 'admin', 'uses' => 'IndexController@getIndex']);

    Route::get('admin/reports/technology', ['as' => 'admin.report.technology', 'uses' => 'IndexController@pageReportsTechonology']);
    Route::get('admin/reports/demographic', ['as' => 'admin.report.demographic', 'uses' => 'IndexController@pageReportsDemographic']);
    Route::get('admin/reports/aquisition', ['as' => 'admin.report.aquisition', 'uses' => 'IndexController@pageReportsAquisition']);
    Route::get('admin/reports/behaviour', ['as' => 'admin.report.behaviour', 'uses' => 'IndexController@pageReportsBehaviour']);

    // Reports
    // Route::get('admin/report/weeks', ['as' => 'admin.report.weeks', 'uses' => 'ReportController@weeks']);
    // Route::get('admin/report/visitors', ['as' => 'admin.report.visitors', 'uses' => 'ReportController@visitors']);
    // Route::get('admin/report/browsers', ['as' => 'admin.report.browsers', 'uses' => 'ReportController@browsers']);
    // Route::get('admin/report/referrers', ['as' => 'admin.report.referrers', 'uses' => 'ReportController@referrers']);
    // Route::get('admin/report/desktop_mobile', ['as' => 'admin.report.desktop_mobile', 'uses' => 'ReportController@desktopMobile']);
    // Route::get('admin/report/pages', ['as' => 'admin.report.pages', 'uses' => 'ReportController@pages']);

    Route::any('admin/report/gaquery', ['as' => 'admin.report.gaquery', 'uses' => 'ReportController@gaQuery']);

    Route::get('admin/marketing/test', ['as' => 'admin.marketing.test', 'uses' => 'MarketingController@test']);


    // Service
    Route::get('admin/service/search', ['as' => 'admin.service.search', 'uses' => 'ServiceController@search']);
    Route::get('admin/service/dashboard/search', ['as' => 'admin.service.dashboard.search', 'uses' => 'ServiceController@dashboardSearch']);



    // Company Category
    Route::get('admin/companycategories', ['as' => 'admin.companycategories', 'uses' => 'CompanyCategoryController@index']);
    Route::post('admin/companycategories', 'CompanyCategoryController@put'); // Add
    Route::post('admin/companycategories/reorder', 'CompanyCategoryController@reorderCategory');
    Route::get('admin/companycategories/{id}/edit', ['as' => 'admin.companycategories.edit', 'uses' => 'CompanyCategoryController@edit']);
    Route::patch('admin/companycategories/{id}/edit', ['as' => 'admin.companycategories.edit', 'uses' => 'CompanyCategoryController@patch']);
    Route::delete('admin/companycategories/{id}/edit', ['as' => 'admin.companycategories.edit', 'uses' => 'CompanyCategoryController@delete']);


    // Media
    Route::get('admin/media', ['as' => 'admin.media', 'uses' => 'MediaController@getList']);
    Route::get('admin/media/data', ['as' => 'admin.media.data', 'uses' => 'MediaController@getData']);
    // mas cercano a REST con verbs
    Route::get('admin/media/{id}/edit', ['as' => 'admin.media.edit', 'uses' => 'MediaController@edit']);
    Route::patch('admin/media/{id}/edit', ['as' => 'admin.media.edit', 'uses' => 'MediaController@patch', 'before' => 'csrf']);
    Route::delete('admin/media/{id}/edit', ['as' => 'admin.media.edit', 'uses' => 'MediaController@delete', 'before' => 'csrf']);
    Route::get('admin/media/{id}/use', ['as' => 'admin.media.use', 'uses' => 'MediaController@getUse']);
    Route::get('admin/media/{id}/clearcache', ['as' => 'admin.media.clearcache', 'uses' => 'MediaController@clearCache']);
    Route::put('admin/media/create', ['as' => 'admin.media.create', 'uses' => 'MediaController@put', 'before' => 'csrf']);
    Route::get('admin/media/bulkupload', ['as' => 'admin.media.bulkupload', 'uses' => 'MediaController@getBulkUpload']);
    Route::post('admin/media/bulkupload', ['as' => 'admin.media.bulkupload', 'uses' => 'MediaController@postBulkUpload']);

    // se usa para combo request ajax desde el items
    Route::get('admin/media/all', ['as' => 'admin.media.all', 'uses' => 'MediaController@getAll']);

    // Contacts
    Route::get('admin/contacts/list', ['as' => 'admin.contacts.list', 'uses' => 'ContactsController@getList']);
    Route::post('admin/contacts/view', ['as' => 'admin.contacts.view', 'uses' => 'ContactsController@getById']);
    Route::post('admin/contacts/reply', ['as' => 'admin.contacts.reply', 'uses' => 'ContactsController@reply']);
    Route::delete('admin/contacts/{id}/delete', ['as' => 'admin.contacts.delete', 'uses' => 'ContactsController@delete', 'before' => 'csrf']);
    Route::get('admin/contacts/export/{type?}', ['as' => 'admin.contacts.export', 'uses' => 'ContactsController@exportToExcel']);


    // Grids
    Route::get('admin/grids', ['as' => 'admin.grids', 'uses' => 'GridController@getIndex']);
    Route::get('admin/grids/data', ['as' => 'admin.grids.data', 'uses' => 'GridController@getData']);
    Route::get('admin/grids/{id}/edit', ['as' => 'admin.grids.edit', 'uses' => 'GridController@edit']);
    Route::patch('admin/grids/{id}/edit', ['as' => 'admin.grids.edit', 'uses' => 'GridController@patch', 'before' => 'csrf']);
    Route::delete('admin/grids/{id}/edit', ['as' => 'admin.grids.edit', 'uses' => 'GridController@delete', 'before' => 'csrf']);
    Route::get('admin/grids/{id}/clone', ['as' => 'admin.grids.clone', 'uses' => 'GridController@doClone']);
    Route::get('admin/grids/create', ['as' => 'admin.grids.create', 'uses' => 'GridController@create']);
    Route::put('admin/grids/create', ['as' => 'admin.grids.create', 'uses' => 'GridController@put', 'before' => 'csrf']);

    Route::get('admin/grids/{id}/live', ['as' => 'admin.grids.live', 'uses' => 'GridController@live']);
    Route::patch('admin/grids/{id}/live', ['as' => 'admin.grids.live', 'uses' => 'GridController@patchLive']);

    Route::get('admin/grids/search', ['as' => 'admin.grids.search', 'uses' => 'GridController@search']);


    // tags
    Route::get('admin/tags', ['as' => 'admin.tags', 'uses' => 'TagController@getList']);
    Route::post('admin/tags/view', ['as' => 'admin.tags.view_contact', 'uses' => 'TagController@view']);
    Route::get('admin/tags/data', ['as' => 'admin.tags.data', 'uses' => 'TagController@getData']);
    Route::get('admin/tags/{id}/edit', ['as' => 'admin.tags.edit', 'uses' => 'TagController@edit']);
    Route::get('admin/tags/contacts', ['as' => 'admin.tags.contacts', 'uses' => 'TagController@contacts']);
    Route::patch('admin/tags/{id}/edit', ['as' => 'admin.tags.edit', 'uses' => 'TagController@patch', 'before' => 'csrf']);
    Route::delete('admin/tags/{id}/edit', ['as' => 'admin.tags.edit', 'uses' => 'TagController@delete', 'before' => 'csrf']);
    Route::patch('admin/tags/{id}/state', ['as' => 'admin.tags.state', 'uses' => 'TagController@state', 'before' => 'csrf']);
    Route::get('admin/tags/create', ['as' => 'admin.tags.create', 'uses' => 'TagController@create']);
    Route::put('admin/tags/create', ['as' => 'admin.tags.create', 'uses' => 'TagController@put', 'before' => 'csrf']);

    Route::get('admin/campaigns/search', ['as' => 'admin.campaigns.search', 'uses' => 'CampaignController@search']);


    // para el dialogo del nuevo bloque en grid live
    Route::get('admin/sectiontypes/getcontents', ['as' => 'admin.sectiontypes.getcontents', 'uses' => 'GridController@getSectionTypeContents']);
    Route::get('admin/sectioncontent/getfields', ['as' => 'admin.sectioncontent.getfields', 'uses' => 'GridController@getSectionContentFields']);

    Route::post('admin/section/parse', ['as' => 'admin.section.parse', 'uses' => 'GridController@parseSection']);


    Route::get('admin/sectioncontent/search', ['as' => 'admin.sectioncontents.search', 'uses' => 'SectionContentController@search']);


    // Route::group(['middleware' => 'user.content'], function () {

    // Pages
    Route::get('admin/pages', ['as' => 'admin.pages', 'uses' => 'PageController@getIndex']);
    Route::get('admin/pages/data', ['as' => 'admin.pages.data', 'uses' => 'PageController@getData']);
    Route::post('admin/pages/reorder', 'PageController@reorderPage');
    Route::get('admin/pages/{id}/edit', ['as' => 'admin.pages.edit', 'uses' => 'PageController@edit']);
    Route::patch('admin/pages/{id}/edit', ['as' => 'admin.pages.edit', 'uses' => 'PageController@patch', 'before' => 'csrf']);
    Route::delete('admin/pages/{id}/edit', ['as' => 'admin.pages.edit', 'uses' => 'PageController@delete', 'before' => 'csrf']);
    Route::patch('admin/pages/{id}/state', ['as' => 'admin.pages.state', 'uses' => 'PageController@state', 'before' => 'csrf']);
    Route::get('admin/pages/{id}/clone', ['as' => 'admin.pages.clone', 'uses' => 'PageController@doClone']);
    Route::get('admin/pages/create', ['as' => 'admin.pages.create', 'uses' => 'PageController@create']);
    Route::put('admin/pages/create', ['as' => 'admin.pages.create', 'uses' => 'PageController@put', 'before' => 'csrf']);
    Route::get('admin/pages/{id}/clonex/{site}', ['as' => 'admin.pages.clonex', 'uses' => 'PageController@doClonex']);
    Route::put('admin/pages/{id}/screenshot', ['as' => 'admin.pages.screenshot', 'uses' => 'PageController@screenshot']);
    Route::get('admin/pages/search', ['as' => 'admin.pages.search', 'uses' => 'PageController@search']);



    Route::get('admin/profiles/search', ['as' => 'admin.profiles.search', 'uses' => 'ProfileController@search']);
    Route::get('admin/users/search', ['as' => 'admin.users.search', 'uses' => 'User\UserController@search']);

    Route::get('admin/contents/{id}/value', ['as' => 'admin.contents.value', 'uses' => 'ContentController@valueEdit']);
    Route::patch('admin/contents/{id}/value', ['as' => 'admin.contents.value', 'uses' => 'ContentController@valuePatch', 'before' => 'csrf']);

    // Reports
    Route::get('admin/reports', ['as' => 'admin.reports', 'uses' => 'Report\ReportController@getReports']);
    Route::get('admin/reports/data', ['as' => 'admin.reports.data', 'uses' => 'Report\ReportController@getData']);
    Route::get('admin/reports/{id}', ['as' => 'admin.reports.read', 'uses' => 'Report\ReportController@getReadReport']);


    // });

    Route::group(['middleware' => 'user.superadmin'], function () {

        Route::get('admin/settings/translations', ['as' => 'admin.settings.translations', 'uses' => '\Barryvdh\TranslationManager\Controller@getView']);

        // User Manager
        Route::get('admin/users', ['as' => 'admin.users', 'uses' => 'User\UserController@getIndex']);
        Route::get('admin/users/data', ['as' => 'admin.users.data', 'uses' => 'User\UserController@getData']);
        Route::get('admin/users/{id}/edit', ['as' => 'admin.users.edit', 'uses' => 'User\UpdateController@getEdit']);
        Route::get('admin/users/add', ['as' => 'admin.users.add', 'uses' => 'User\UserController@getAddUser']);
        Route::post('admin/users/add', ['as' => 'admin.users.add', 'uses' => 'User\UpdateController@postAddUser']);
        Route::post('admin/users/{id}/edit', ['as' => 'admin.users.edit', 'uses' => 'User\UpdateController@postEdit']);
        Route::post('admin/users/approve', ['as' => 'admin.users.approve', 'uses' => 'User\UpdateController@postApprove']);

        // Profiles
        Route::get('admin/profiles', ['as' => 'admin.profiles', 'uses' => 'ProfileController@getList']);
        Route::get('admin/profiles/data', ['as' => 'admin.profiles.data', 'uses' => 'ProfileController@getData']);
        Route::put('admin/profiles', ['as' => 'admin.profiles', 'uses' => 'ProfileController@create']); // Add
        Route::get('admin/profiles/{id}/edit', ['as' => 'admin.profiles.edit', 'uses' => 'ProfileController@edit']);
        Route::patch('admin/profiles/{id}/edit', ['as' => 'admin.profiles.edit', 'uses' => 'ProfileController@patch']);

        // Site Settings
        Route::get('admin/settings/details', ['as' => 'admin.settings.details', 'uses' => 'Settings\SettingsController@getSiteDetails']);
        Route::post('admin/settings/details', ['as' => 'admin.settings.details', 'uses' => 'Settings\UpdateController@postSiteDetails']);
        Route::get('admin/settings/limits', ['as' => 'admin.settings.limits', 'uses' => 'Settings\SettingsController@getLimitSettings']);
        Route::post('admin/settings/limits', ['as' => 'admin.settings.limits', 'uses' => 'Settings\UpdateController@postLimitSettings']);
        Route::get('admin/settings/cache', ['as' => 'admin.settings.cache', 'uses' => 'Settings\SettingsController@getCacheSettings']);
        Route::post('admin/settings/cache', ['as' => 'admin.settings.cache', 'uses' => 'Settings\UpdateController@postCacheSettings']);
        Route::get('admin/settings/sitemap', ['as' => 'admin.settings.sitemap', 'uses' => 'Settings\UpdateController@updateSiteMap']);


        // Contents
        Route::get('admin/contents/{id}/clone', ['as' => 'admin.contents.clone', 'uses' => 'ContentController@doClone']);
        Route::get('admin/contents/create', ['as' => 'admin.contents.create', 'uses' => 'ContentController@create']);
        Route::put('admin/contents/create', ['as' => 'admin.contents.create', 'uses' => 'ContentController@put', 'before' => 'csrf']);
        Route::get('admin/contents', ['as' => 'admin.contents', 'uses' => 'ContentController@getIndex']);
        Route::get('admin/contents/data', ['as' => 'admin.contents.data', 'uses' => 'ContentController@getData']);
        Route::get('admin/contents/{id}/edit', ['as' => 'admin.contents.edit', 'uses' => 'ContentController@edit']);
        Route::patch('admin/contents/{id}/edit', ['as' => 'admin.contents.edit', 'uses' => 'ContentController@patch', 'before' => 'csrf']);
        Route::delete('admin/contents/{id}/edit', ['as' => 'admin.contents.edit', 'uses' => 'ContentController@delete', 'before' => 'csrf']);


        // Section Types
        Route::get('admin/sectiontypes', ['as' => 'admin.sectiontypes', 'uses' => 'SectionTypeController@getIndex']);
        Route::get('admin/sectiontypes/data', ['as' => 'admin.sectiontypes.data', 'uses' => 'SectionTypeController@getData']);
        Route::get('admin/sectiontypes/{id}/edit', ['as' => 'admin.sectiontypes.edit', 'uses' => 'SectionTypeController@edit']);
        Route::patch('admin/sectiontypes/{id}/edit', ['as' => 'admin.sectiontypes.edit', 'uses' => 'SectionTypeController@patch', 'before' => 'csrf']);
        Route::delete('admin/sectiontypes/{id}/edit', ['as' => 'admin.sectiontypes.edit', 'uses' => 'SectionTypeController@delete', 'before' => 'csrf']);
        Route::get('admin/sectiontypes/create', ['as' => 'admin.sectiontypes.create', 'uses' => 'SectionTypeController@create']);
        Route::put('admin/sectiontypes/create', ['as' => 'admin.sectiontypes.create', 'uses' => 'SectionTypeController@put', 'before' => 'csrf']);
        Route::get('admin/sectiontypes/{id}/clone', ['as' => 'admin.sectiontypes.clone', 'uses' => 'SectionTypeController@doClone']);
        Route::get('admin/sectiontypes/{id}/clonex/{site}', ['as' => 'admin.sectiontypes.clonex', 'uses' => 'SectionTypeController@doClonex']);

        // Section Contents
        Route::get('admin/sectioncontents', ['as' => 'admin.sectioncontents', 'uses' => 'SectionContentController@getIndex']);
        Route::get('admin/sectioncontents/data', ['as' => 'admin.sectioncontents.data', 'uses' => 'SectionContentController@getData']);
        Route::get('admin/sectioncontents/{id}/edit', ['as' => 'admin.sectioncontents.edit', 'uses' => 'SectionContentController@edit']);
        Route::patch('admin/sectioncontents/{id}/edit', ['as' => 'admin.sectioncontents.edit', 'uses' => 'SectionContentController@patch', 'before' => 'csrf']);
        Route::delete('admin/sectioncontents/{id}/edit', ['as' => 'admin.sectioncontents.edit', 'uses' => 'SectionContentController@delete', 'before' => 'csrf']);
        Route::get('admin/sectioncontents/create', ['as' => 'admin.sectioncontents.create', 'uses' => 'SectionContentController@create']);
        Route::put('admin/sectioncontents/create', ['as' => 'admin.sectioncontents.create', 'uses' => 'SectionContentController@put', 'before' => 'csrf']);
        Route::get('admin/sectioncontents/{id}/clone', ['as' => 'admin.sectioncontents.clone', 'uses' => 'SectionContentController@doClone']);
        Route::get('admin/sectioncontents/{id}/clonex/{site}', ['as' => 'admin.sectioncontents.clonex', 'uses' => 'SectionContentController@doClonex']);


    });

});

Route::get('tags/search', ['as' => 'tag.search', 'uses' => 'TagController@search']);

Route::get('mailing/short', ['as' => 'mailing.short', 'uses' => 'MailingTestController@short']);
Route::get('mailing/long', ['as' => 'mailing.long', 'uses' => 'MailingTestController@long']);
Route::get('mailing/download', ['as' => 'mailing.download', 'uses' => 'MailingTestController@download']);


// reb redirecciono el index para que vaya al home que es un Page
Route::get('/', ['as' => 'home', 'middleware' => 'guest', 'uses' => 'HomeController@getIndex']);

// reb tiene que estar al final, porque si no entra al sitio por nada, se fija si existe una page creada con ese nombre
// http://stackoverflow.com/questions/20870899/order-of-route-declarations-in-laravel-package
Route::get('/{slug?}', ['as' => 'page', 'uses' => 'PageController@getSlug'])->where('slug', '(.*)');


// Event::listen('404', function() {
//     $page = URI::current();
//     return Response::error('404');
// });

// REB Debuggear todos los querys que se ejecutan en un request dado
// Event::listen('illuminate.query', function($query)
// {
//     var_dump($query);
// });
