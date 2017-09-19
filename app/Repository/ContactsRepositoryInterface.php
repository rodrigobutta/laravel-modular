<?php

namespace App\Repository;

interface ContactsRepositoryInterface
{

	public function getById($id);

    public function getFollowing();

}
