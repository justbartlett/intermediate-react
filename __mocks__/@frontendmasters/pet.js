import { readFileSync } from 'fs';
import path from 'path';
import { act } from '@testing-library/react';

export const breeds = [
  { name: "Bichon Frise" },
  { name: "Bolognese" },
  { name: "Coton de Tulear" },
  { name: "Havanese" },
  { name: "Maltese" }
];

const doggos = JSON.parse(
  readFileSync(path.join(__dirname, 'res.json')).toString()
);

export const ANIMALS = ["dog", "cat", "bird"];
export const _breeds = breeds;
export const _dogs = doggos.animals;

// create a mock library of pet
const mock = {
  // has a breeds function that were making a spy function
  breeds: jest.fn(() => {
    // its going to return a promise like object (has a then object)
    // have to call act to make react update
    return {
      then: callback => act(() => callback({breeds}))
    }
  }),
  animals: jest.fn(() => {
    return {
      then: callback => act(() => callback(doggos))
    }
  })
}

export default mock;