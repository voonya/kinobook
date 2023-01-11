import { Director } from '@domain/models';
import { randomUUID } from 'crypto';

const directors = [
  'Stephen McFeely',
  'Christopher Markus',
  'Steve Kloves',
  'Andrew Stanton',
  'James Cameron',
  'David Koepp',
  'Chris McKenna',
  'Erik Sommers',
  'Lawrence Kasdan',
  'Fran Walsh',
  'Peter Jackson',
  'Terry Rossio',
  'George Lucas',
  'Peter Craig',
  'Ted Elliott',
  'Christopher Nolan',
  'J.J. Abrams',
  'Philippa Boyens',
  'Cinco Paul',
  'Ken Daurio',
  'Akiva Goldsman',
  'Roberto Orci',
  'Alex Kurtzman',
  'Chris Morgan',
  'Michael Arndt',
  'M. Night Shyamalan',
  'Tony Gilroy',
  'Ehren Kruger',
  'Colin Trevorrow',
  'Melissa Rosenberg',
  'Jeff Nathanson',
  'Jonathan Aibel',
  'Glenn Berger',
  'Linda Woolverton',
  'Joss Whedon',
  'John Logan',
  'Amanda Silver',
  'Robert Wade',
  'Neal Purvis',
  'Guillermo del Toro',
  'David S. Goyer',
  'Ryan Coogler',
  'Derek Connolly',
  'Simon Kinberg',
  'Brad Bird',
  'Jeff Pinkner',
  'Jonathan Nolan',
  'Chris Terrio',
  'Scott Rosenberg',
  'Jennifer Lee',
  'Joe Robert Cole',
  'Eric Roth',
  'Rick Jaffa',
  'Sylvester Stallone',
  'Zack Stentz',
  'Ashley Edward Miller',
  'Roland Emmerich',
  'Justin Marks',
  'Adam Sandler',
  'John Hughes',
  'J. David Stem',
  'Todd Phillips',
  'Alvin Sargent',
  'Paul Wernick',
  'Rhett Reese',
  'Brian Lynch',
  'John Hamburg',
  'James Gunn',
  'John August',
  'Michael McCullers',
  'Gary Dauberman',
  'Tim Herlihy',
  'Billy Ray',
  'Luc Besson',
  'Chris Weitz',
  'Christopher McQuarrie',
  'Nicholas Stoller',
  'Andrew Adamson',
  'Robert Mark Kamen',
  'Adam McKay',
  'Steven Zaillian',
  'William Broyles Jr.',
  'Rian Johnson',
  'Zak Penn',
  'Scott Frank',
  'Mark Bomback',
  'Gary Ross',
  'Jeffrey Price',
  'Peter S. Seaman',
  'Quentin Tarantino',
  'Bob Peterson',
  'Dan Fogelman',
  'Tyler Perry',
  'Lowell Ganz',
  'Babaloo Mandel',
  'David Ayer',
  'Andy Wachowski',
  'Daniel Gerson',
  'John Morris',
  'Irene Mecchi',
];

const mockDirectors: Director[] = [];

directors.forEach((director) => {
  const [name, surname] = director.split(' ');
  mockDirectors.push({
    id: randomUUID(),
    name,
    surname,
  });
});

export { mockDirectors };