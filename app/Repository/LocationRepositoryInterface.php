<?php

namespace App\Repository;

interface LocationRepositoryInterface
{

	// COUNTRY
    public static function getCountries();

	public function getCountryById($id);


	//STATES
	public static function getStates();

	public function getStateById($id);

	public function getStatesByCountry($id);


	//CITIES
	public static function getCities();

	public function getCityById($id);

	public function getCitiesByState($id);
}
