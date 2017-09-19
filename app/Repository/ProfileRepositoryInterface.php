<?php

namespace App\Repository;

interface ProfileRepositoryInterface
{

    public function getBySlug($slug);

    public function getItems();

    public function search($input);
}
