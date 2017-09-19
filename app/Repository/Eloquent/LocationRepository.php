<?php

namespace App\Repository\Eloquent;

use App\Models\Country;
use App\Models\State;
use App\Models\City;
use App\Repository\LocationRepositoryInterface;

class LocationRepository implements LocationRepositoryInterface
{

    public function __construct(Country $countries, State $states, City $cities)
    {
        $this->countries = $countries;
        $this->states = $states;
        $this->cities = $cities;
    }

   	//COUNTRIES
	public static function getCountries()
	{
		return Country::all();
	}

    public function getPublishedCountries()
    {
        return $this->countries->where('published', 1)->get();
    }


	public function getCountryById($id)
	{
		return $this->countries->find($id);
	}



	//STATES
	public static function getStates()
	{
		return State::all();
	}

    public function getPublishedStates()
    {
        return $this->states->where('published', 1)->get();
    }


	public function getStateById($id)
	{
		return $this->states->find($id);
	}

	public function getStatesByCountry($id){
        return $this->states->where('country_id', $id)->get();
	}

    public function getPublishedStatesByCountry($id){
        return $this->states->where('country_id', $id)->where('published', 1)->get();
    }



	//CITIES
	public static function getCities()
	{
		return City::all();
	}

	public function getCityById($id)
	{
		return $this->cities->find($id);
	}

	public function getCitiesByState($id){
        return $this->cities->where('state_id', $id)->get();
	}


}
