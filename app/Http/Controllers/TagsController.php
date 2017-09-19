<?php
namespace App\Http\Controllers;

use App\Helpers\Resize;
use App\Repository\TaskRepositoryInterface;
use App\Http\Controllers;
use Roumen\Feed\Facades\Feed;


class TagsController extends Controller
{

    public function __construct(TaskRepositoryInterface $tasks)
    {
        $this->tasks = $tasks;
    }

    public function getIndex($tag)
    {
        // $tasks = $this->tasks->getByTags($tag);
        $tasks = $this->tasks->getByTags($tag);
        $title = sprintf('%s %s', t('Tagged with'), ucfirst($tag));

        return iView('tag.index', compact('tasks', 'title'));
    }

}
