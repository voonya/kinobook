import { Actor } from '@domain/models';
import { randomUUID } from 'crypto';

const actors = [
  'Robert Pattinson',
  'Tom Holland',
  'Margot Robbie',
  'Jim Carrey',
  'Salma Hayek',
  'Anya Taylor-Joy',
  'Zhang Yi',
  'Brian Tyree Henry',
  'Dwayne Johnson',
  'Emily Blunt',
  'Kenneth Branagh',
  'Letitia Wright',
  'Tony Jaa',
  'Gal Gadot',
  'Russell Crowe',
  'Don Lee',
  'Liu Haoran',
  'Florence Pugh',
  'Jared Leto',
  'Tenoch Huerta',
  'Alexander Skarsgård',
  'Ma Li',
  'Wei Xiang',
  'David Harbour',
  'Viola Davis',
  'Hiroyuki Sanada',
  'Michael Peña',
  'Ryan Reynolds',
  'Jack Whitehall',
  'Channing Tatum',
  'Jamie Lee Curtis',
  'Andi Matichak',
  'Nathalie Emmanuel',
  'James Jude Courtney',
  'Lea Seydoux',
  'Patrick Wilson',
  'Rami Malek',
  'John David Washington',
  'Zoe Saldana',
  'Idris Elba',
  'Timothée Chalamet',
  'Lei Jiayin',
  'Christian Bale',
  'Finn Wolfhard',
  'Will Smith',
  'Ben Whishaw',
  'Ralph Fiennes',
  'Glen Powell',
  'Michael Shannon',
  'Tom Cruise',
  'Colin Farrell',
  'Miles Teller',
  'Lewis James Pullman',
  'Monica Barbaro',
  'Danny Ramirez',
  'Jay Ellis',
  'Greg Tarzan Davis',
  'Jon Hamm',
  'Ou Hao',
  'Chris Pratt',
  'Mark Wahlberg',
  'Bryce Dallas Howard',
  'Jiang Wu',
  'Qianyuan Wang',
  'Du Chun',
  'Li Chen',
  'Benedict Cumberbatch',
  'Steven Yeun',
  'Elizabeth Olsen',
  'Chiwetel Ejiofor',
  'Benedict Wong',
  'Xochitl Gomez',
  'Michael Stuhlbarg',
  'Rachel McAdams',
  'Daniel Craig',
  'Martin Lawrence',
  'Naomie Harris',
  "Lupita Nyong'o",
  'Ana de Armas',
  'Sam Worthington',
  'Vin Diesel',
  'Michelle Rodriguez',
  'Tyrese Gibson',
  'Elizabeth Debicki',
  'Michael Caine',
  'Chris ‘Ludacris’ Bridges',
  'John Cena',
  'Jordana Brewster',
  'Wang Baoqiang',
  'Satoshi Tsumabuki',
  'Danai Gurira',
  'Winston Duke',
  'Dominique Thorne',
  'Florence Kasumba',
  'Michaela Coel',
  'Martin Freeman',
  'Angela Bassett',
  'Robert Downey, Jr.',
  'Tom Hardy',
  'Woody Harrelson',
];

const mockActors: Actor[] = [];

actors.forEach((actor) => {
  const [name, surname] = actor.split(' ');
  mockActors.push({
    id: randomUUID(),
    name,
    surname,
  });
});

export { mockActors };
