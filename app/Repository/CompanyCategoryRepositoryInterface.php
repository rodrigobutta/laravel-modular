<?php

namespace App\Repository;

use App\Repository\ImageRepository;

interface CompanyCategoryRepositoryInterface
{

    public function getBySlug($slug);

    public function getItems();

    public function search($input);

    public function delete($id);
}
