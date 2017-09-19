<?php
namespace App\Helpers;

use App\Models\User;

class Resize
{
    protected static $sizes = [

        'homeLogos'  => [
            'recipe'    => 'logo',
            'dir'       => 'media',
            'width'     => 200 ,
            'height'    => 200,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'homeCover'  => [
            'recipe'    => 'logo',
            'dir'       => 'media',
            'width'     => 1920 ,
            'height'    => 1920,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],


        'articleCategoryMenu'     => [
            'recipe'    => 'menu',
            'dir'       => 'article_categories',
            'width'     => 248,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'articleCategoryCoverMain'     => [
            'recipe'    => 'cover_main',
            'dir'       => 'article_categories',
            'width'     => 1000,
            'height'    => 999,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'articleCategoryCoverBg'     => [
            'recipe'    => 'cover_bg',
            'dir'       => 'article_categories',
            'width'     => 1920,
            'height'    => 999,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'articleCategorySearch'     => [
            'recipe'    => 'search',
            'dir'       => 'article_categories',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],


        'branchCategoryMenu'     => [
            'recipe'    => 'menu',
            'dir'       => 'branch_categories',
            'width'     => 248,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'branchCategoryCoverMain'     => [
            'recipe'    => 'cover_main',
            'dir'       => 'branch_categories',
            'width'     => 1000,
            'height'    => 999,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'branchCategoryCoverBg'     => [
            'recipe'    => 'cover_bg',
            'dir'       => 'branch_categories',
            'width'     => 1920,
            'height'    => 999,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'branchCategorySearch'     => [
            'recipe'    => 'search',
            'dir'       => 'branch_categories',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],
        'sidebarBranch'  => [
            'recipe'    => 'sidebar',
            'dir'       => 'branch_categories',
            'width'     => 80,
            'height'    => 80,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],

        'taskCategoryMenu'     => [
            'recipe'    => 'menu',
            'dir'       => 'task_categories',
            'width'     => 138,
            'height'    => 105,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],

        'taskFamilyList'     => [
            'recipe'    => 'family_list',
            'dir'       => 'task_categories',
            'width'     => 640,
            'height'    => 310,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],

        'relatedTask'     => [
            'recipe'    => 'related_prod',
            'dir'       => 'tasks',
            'width'     => 640,
            'height'    => 310,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],

        'taskCategoryCoverMain'     => [
            'recipe'    => 'cover_main',
            'dir'       => 'task_categories',
            'width'     => 1000,
            'height'    => 999,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'taskCategoryCoverBg'     => [
            'recipe'    => 'cover_bg',
            'dir'       => 'task_categories',
            'width'     => 1920,
            'height'    => 999,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'taskCategorySearch'     => [
            'recipe'    => 'search',
            'dir'       => 'task_categories',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],

        'taskMenu'     => [
            'recipe'    => 'menu',
            'dir'       => 'tasks',
            'width'     => 248,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],

        'mainTask'     => [
            'recipe'    => 'main',
            'dir'       => 'tasks',
            'width'     => 1140,
            'height'    => 1140,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredTask' => [
            'recipe'    => 'featured',
            'dir'       => 'tasks',
            'width'     => 900,
            'height'    => 900,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredTask2' => [
            'recipe'    => 'featured2',
            'dir'       => 'tasks',
            'width'     => 280,
            'height'    => 280,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => true,
        ],
        'sidebarTask'  => [
            'recipe'    => 'sidebar',
            'dir'       => 'tasks',
            'width'     => 80,
            'height'    => 80,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'coverTask'    => [
            'recipe'    => 'cover2',
            'dir'       => 'tasks',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'listingTask'  => [
            'recipe'    => 'listing',
            'dir'       => 'tasks',
            'width'     => 120,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'taskGrid1'     => [
            'recipe'    => 'grid1',
            'dir'       => 'tasks',
            'width'     => 400,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'taskGrid2'     => [
            'recipe'    => 'grid2',
            'dir'       => 'tasks',
            'width'     => 760,
            'height'    => 1100,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'taskGrid3'     => [
            'recipe'    => 'grid3',
            'dir'       => 'tasks',
            'width'     => 1000,
            'height'    => 1400,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'taskFull'     => [
            'recipe'    => 'full',
            'dir'       => 'tasks',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'taskSearch'     => [
            'recipe'    => 'search',
            'dir'       => 'tasks',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],


        'mainArticle'     => [
            'recipe'    => 'main',
            'dir'       => 'articles',
            'width'     => 750,
            'height'    => 750,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'relatedArticles'  => [
            'recipe'    => 'related',
            'dir'       => 'articles',
            'width'     => 305,
            'height'    => 130,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'sidebarArticle'  => [
            'recipe'    => 'sidebar',
            'dir'       => 'articles',
            'width'     => 80,
            'height'    => 80,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'coverArticle'    => [
            'recipe'    => 'cover2',
            'dir'       => 'articles',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'listingArticle'  => [
            'recipe'    => 'listing',
            'dir'       => 'articles',
            'width'     => 117,
            'height'    => 117,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'articleGrid1'     => [
            'recipe'    => 'grid1',
            'dir'       => 'articles',
            'width'     => 400,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'articleGrid2'     => [
            'recipe'    => 'grid2',
            'dir'       => 'articles',
            'width'     => 760,
            'height'    => 1100,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'articleGrid3'     => [
            'recipe'    => 'grid3',
            'dir'       => 'articles',
            'width'     => 1000,
            'height'    => 1400,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'articleFull'     => [
            'recipe'    => 'full',
            'dir'       => 'articles',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'articleSearch'     => [
            'recipe'    => 'search',
            'dir'       => 'articles',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],
        'featuredArticle' => [
            'recipe'    => 'featured',
            'dir'       => 'articles',
            'width'     => 900,
            'height'    => 900,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],



        'mainApplication'     => [
            'recipe'    => 'main',
            'dir'       => 'applications',
            'width'     => 750,
            'height'    => 750,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'relatedApplications'  => [
            'recipe'    => 'related',
            'dir'       => 'applications',
            'width'     => 305,
            'height'    => 130,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'sidebarApplication'  => [
            'recipe'    => 'sidebar',
            'dir'       => 'applications',
            'width'     => 80,
            'height'    => 80,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'coverApplication'    => [
            'recipe'    => 'cover2',
            'dir'       => 'applications',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'listingApplication'  => [
            'recipe'    => 'listing',
            'dir'       => 'applications',
            'width'     => 117,
            'height'    => 117,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'applicationGrid1'     => [
            'recipe'    => 'grid1',
            'dir'       => 'applications',
            'width'     => 400,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'applicationGrid2'     => [
            'recipe'    => 'grid2',
            'dir'       => 'applications',
            'width'     => 760,
            'height'    => 1100,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'applicationGrid3'     => [
            'recipe'    => 'grid3',
            'dir'       => 'applications',
            'width'     => 1000,
            'height'    => 1400,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'applicationFull'     => [
            'recipe'    => 'full',
            'dir'       => 'applications',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'applicationSearch'     => [
            'recipe'    => 'search',
            'dir'       => 'applications',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],
        'featuredApplication' => [
            'recipe'    => 'featured',
            'dir'       => 'applications',
            'width'     => 900,
            'height'    => 900,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],



        'avatar'        => [
            'recipe'    => 'avatar',
            'dir'       => 'avatars',
            'width'     => 80,
            'height'    => 80,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'mainAvatar'    => [
            'recipe'    => 'main',
            'dir'       => 'avatars',
            'width'     => 263,
            'height'    => 263,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'user128'    => [
            'recipe'    => 'main',
            'dir'       => 'avatars',
            'width'     => 128,
            'height'    => 128,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'listingAvatar' => [
            'recipe'    => 'listing',
            'dir'       => 'avatars',
            'width'     => 117,
            'height'    => 117,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'listingBranch'  => [
            'recipe'    => 'listing',
            'dir'       => 'branches',
            'width'     => 117,
            'height'    => 117,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredBranch' => [
            'recipe'    => 'featured',
            'dir'       => 'branches',
            'width'     => 280,
            'height'    => 280,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'mainBranch'     => [
            'recipe'    => 'main',
            'dir'       => 'branches',
            'width'     => 1140,
            'height'    => 1140,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
            'couldbegif' => true,
        ],
        'listingMedia'  => [
            'recipe'    => 'listing',
            'dir'       => 'media',
            'width'     => 117,
            'height'    => 117,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredMedia' => [
            'recipe'    => 'featured',
            'dir'       => 'media',
            'width'     => 280,
            'height'    => 280,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'mainMedia'     => [
            'recipe'    => 'main',
            'dir'       => 'media',
            'width'     => 1140,
            'height'    => 1140,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
            'couldbegif' => true,
        ],
        'mediaGrid1'     => [
            'recipe'    => 'grid1',
            'dir'       => 'media',
            'width'     => 400,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'mediaGrid2'     => [
            'recipe'    => 'grid2',
            'dir'       => 'media',
            'width'     => 760,
            'height'    => 1100,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'mediaGrid3'     => [
            'recipe'    => 'grid3',
            'dir'       => 'media',
            'width'     => 1000,
            'height'    => 1400,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'mediaGrid1_bw'     => [
            'recipe'    => 'grid1',
            'dir'       => 'media',
            'width'     => 400,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'mediaGrid2_bw'     => [
            'recipe'    => 'grid2',
            'dir'       => 'media',
            'width'     => 760,
            'height'    => 1100,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'mediaGrid3_bw'     => [
            'recipe'    => 'grid3',
            'dir'       => 'media',
            'width'     => 1000,
            'height'    => 1400,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'mediaNormal'     => [
            'recipe'    => 'normal',
            'dir'       => 'media',
            'width'     => 960,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'mediaHalf'     => [
            'recipe'    => 'half',
            'dir'       => 'media',
            'width'     => 500,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'mediaWrap'     => [
            'recipe'    => 'full',
            'dir'       => 'media',
            'width'     => 1272,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
            'couldbegif' => true,
        ],
        'mediaFull'     => [
            'recipe'    => 'full',
            'dir'       => 'media',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
            'couldbegif' => true,
        ],
        'mediaSearch'     => [
            'recipe'    => 'search',
            'dir'       => 'media',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],

        /*  RECETAS SULLAIR */

        'component50Percent' => [
            'recipe'    => '50percent',
            'dir'       => 'media',
            'width'     => 640,
            'height'    => 310,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'component25Percent' => [
            'recipe'    => '25percent',
            'dir'       => 'media',
            'width'     => 310,
            'height'    => 310,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'component75Percent' => [
            'recipe'    => '75percent',
            'dir'       => 'media',
            'width'     => 970,
            'height'    => 438,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'componentImgLeft' => [
            'recipe'    => 'imgleft',
            'dir'       => 'media',
            'width'     => 1000,
            'height'    => 660,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'componentImgFullWidth' => [
            'recipe'    => 'imgfullwidth',
            'dir'       => 'media',
            'width'     => 1920,
            'height'    => 700,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'componentImgRight' => [
            'recipe'    => 'imgright',
            'dir'       => 'media',
            'width'     => 1284,
            'height'    => 549,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'componentCategoryIntro' => [
            'recipe'    => 'catintro',
            'dir'       => 'media',
            'width'     => 620,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'familyHome' => [
            'recipe'    => 'famhome',
            'dir'       => 'task_categories',
            'width'     => 1920,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'videoThumb' => [
            'recipe'    => 'videothumb',
            'dir'       => 'media',
            'width'     => 634,
            'height'    => 292,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],
        'coverCampaign'    => [
            'recipe'    => 'campaign',
            'dir'       => 'campaigns',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'componentImgCentered' => [
            'recipe'    => 'compimgcentered',
            'dir'       => 'media',
            'width'     => 1300,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw'       => false
        ],




        'clientGridItem'     => [
            'recipe'    => 'grid_item',
            'dir'       => 'clients',
            'width'     => 640,
            'height'    => 480,
            'method'    => 'fix',
            'watermark' => false,
            'bnw' => false,
        ],

        'clientMenu'     => [
            'recipe'    => 'menu',
            'dir'       => 'clients',
            'width'     => 248,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],

        'mainClient'     => [
            'recipe'    => 'main',
            'dir'       => 'clients',
            'width'     => 1140,
            'height'    => 1140,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredClient' => [
            'recipe'    => 'featured',
            'dir'       => 'clients',
            'width'     => 900,
            'height'    => 900,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredClient2' => [
            'recipe'    => 'featured2',
            'dir'       => 'clients',
            'width'     => 280,
            'height'    => 280,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => true,
        ],
        'sidebarClient'  => [
            'recipe'    => 'sidebar',
            'dir'       => 'clients',
            'width'     => 80,
            'height'    => 80,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'coverClient'    => [
            'recipe'    => 'cover2',
            'dir'       => 'clients',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'listingClient'  => [
            'recipe'    => 'listing',
            'dir'       => 'clients',
            'width'     => 120,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'clientGrid1'     => [
            'recipe'    => 'grid1',
            'dir'       => 'clients',
            'width'     => 400,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'clientGrid2'     => [
            'recipe'    => 'grid2',
            'dir'       => 'clients',
            'width'     => 760,
            'height'    => 1100,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'clientGrid3'     => [
            'recipe'    => 'grid3',
            'dir'       => 'clients',
            'width'     => 1000,
            'height'    => 1400,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'clientFull'     => [
            'recipe'    => 'full',
            'dir'       => 'clients',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'clientSearch'     => [
            'recipe'    => 'search',
            'dir'       => 'clients',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],




    ];


    public function __construct($file = null, $recipe = null){

        // si es un array, estamos usando el sizes de esta clase, caso contrario, viene la receta de otro lado
        if(is_array($recipe)){
            $obj_recipe = $recipe;
        }
        else{
            $obj_recipe = self::$sizes[$recipe];
        }


        if ($file=='') {
            $this->file = '_default.png';
            $this->dir = $obj_recipe['dir']; // 'assets';
        } else {
            $this->file = $file;
            $this->dir = $obj_recipe['dir'];
        }
        $this->width = $obj_recipe['width'];
        $this->height = $obj_recipe['height'];
        $this->method = $obj_recipe['method'];
        $this->watermark = $obj_recipe['watermark'];
        $this->bnw = $obj_recipe['bnw'];

        if(isset($obj_recipe['couldbegif'])){
            $this->couldbegif = $obj_recipe['couldbegif'];
        }
        else{
            $this->couldbegif = false;
        }

        $this->recipe = $obj_recipe['recipe']; // reb para transportar el pedido de imagen hsta el archivo en cache
    }


    // LLAMADAS EXTERNAS

        // devuelvo solo la url para usar una llamada simple a imagen en cualquier lado
        public static function img($name, $recipe = null, $inpath = false){
            $image = new Resize($name, $recipe);
            $image_obj = $image->process($inpath);
            return $image_obj->url;
        }

        // devuelvo el path local real de la imagen (cacheada o no) para procesar luego por ej en mediaController con getImage
        public static function imgreal($name, $recipe = null){
            $image = new Resize($name, $recipe);
            $image_obj = $image->process();

            // var_dump('111111');
            // var_dump($image_obj->real);

            return $image_obj->real;
        }

        // devuelvo el objeto entero de la imagen con propiedades url,width,height y demas para usar en grids y demas
        public static function image($name, $recipe = null, $inpath = false){
            $image = new Resize($name, $recipe);
            $image_obj = $image->process($inpath,true);
            return $image_obj;
        }

    // FIN LLAMADAS EXTERNAS

    protected function process($inpath = false, $with_properties = false)
    {

        // if ($this->file instanceof User) {
        //     if ($this->file->avatar == null || $this->file->avatar == 'user') {
        //         return $this->file = 'assets/placeholder.png';
        //     }
        // }

        $rh = new ResizeHelper($this->file, $this->dir, $this->recipe, $this->width, $this->height, $this->method, $this->watermark, $this->bnw, $this->couldbegif);

        return $rh->resize($inpath,$with_properties);
    }


    public static function getSizes()
    {
        return self::$sizes;
    }


    // public static function image($image, $recipe = null)
    // {
    //     $image = new Resize(sprintf('%s.%s', $image->image_name, $image->type), $recipe);
    //     return $image->process();
    // }

    // public static function avatar($user, $recipe = null)
    // {
    //     if ($user->avatar == null || $user->avatar == 'user') {
    //         $avatar = new Resize($user, $recipe);

    //         return $avatar->process();
    //     }
    //     $image = new Resize($user->avatar, $recipe);

    //     return $image->process();
    // }


    public function __call($func, $args)
    {
        $reflection = new \ReflectionClass(get_class($this));
        $methodName = '_' . $func;

        if ($reflection->hasMethod($methodName)) {
            $method = $reflection->getMethod($methodName);

            if ($method->getNumberOfRequiredParameters() > count($args)) {
                throw new \InvalidArgumentException('Not enough arguments given for ' . $func);
            }
            call_user_func_array([$this, $methodName], $args);

            return $this;
        }

        throw new \BadFunctionCallException('Invalid method: ' . $func);
    }


    protected function _size($width = null, $height = null)
    {
        $this->width = $width;
        $this->height = $height;

        return $this;
    }

    protected function _dir($dir = null)
    {
        $this->dir = $dir;

        return $this;
    }

    protected function _watermark()
    {
        $this->watermark = true;

        return $this;
    }
}
