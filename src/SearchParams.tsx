import React, { useState, useEffect, useContext, FunctionComponent } from "react";
import pet, { ANIMALS, Animal } from "@frontendmasters/pet";
import {RouteComponentProps} from '@reach/router';
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [location, updateLocation] = useState("Seattle, WA");
  const [breeds, updateBreeds] = useState([] as string[]);
  const [pets, setPets] = useState([] as Animal[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

  function requestPets() {
    pet.animals({
      location,
      breed,
      type: animal
    }).then(({animals}) => {
      setPets(animals || []);
    });
  }

  useEffect(() => {
    updateBreeds([]);
    updateBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      updateBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="location">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;