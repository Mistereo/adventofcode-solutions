/*
--- Part Two ---

Turns out the shopkeeper is working with the boss, and can persuade you to buy
whatever items he wants. The other rules still apply, and he still only has one
of each item.

What is the most amount of gold you can spend and still lose the fight?
 */

const PLAYER_LIFE = 100;
const WEAPONS = [
  { cost:  8, damage: 4, armor: 0 },
  { cost: 10, damage: 5, armor: 0 },
  { cost: 25, damage: 6, armor: 0 },
  { cost: 40, damage: 7, armor: 0 },
  { cost: 74, damage: 8, armor: 0 }
];
const ARMOR = [
  { cost:  13, damage: 0, armor: 1 },
  { cost:  31, damage: 0, armor: 2 },
  { cost:  53, damage: 0, armor: 3 },
  { cost:  75, damage: 0, armor: 4 },
  { cost: 102, damage: 0, armor: 5 }
];
const RINGS = [
  { cost:  25, damage: 1, armor: 0 },
  { cost:  50, damage: 2, armor: 0 },
  { cost: 100, damage: 3, armor: 0 },
  { cost:  20, damage: 0, armor: 1 },
  { cost:  40, damage: 0, armor: 2 },
  { cost:  80, damage: 0, armor: 3 }
];

function isWin(player, enemy) {
  let playerLife = player.life;
  let enemyLife = enemy.life;
  while (true) {
    enemyLife -= Math.max(player.damage - enemy.armor, 1);
    if (enemyLife <= 0) return true;

    playerLife -= Math.max(enemy.damage - player.armor, 1);
    if (playerLife <= 0) return false;
  }
}

export default function solution(input) {
  const [life, damage, armor] = input.trim()
    .split('\n')
    .map(i => parseInt(i.split(' ').pop()));
  const boss = { life, damage, armor };

  const fakeItem = { cost: 0, damage: 0, armor: 0 };
  ARMOR.push(fakeItem);
  RINGS.push(fakeItem);
  RINGS.push(fakeItem);

  let answer = -Infinity;

  WEAPONS.forEach(weapon => {
    ARMOR.forEach(armor => {
      for (let i = 0; i < RINGS.length - 1; i++) {
        for (let j = i + 1; j < RINGS.length; j++) {
          const r1 = RINGS[i];
          const r2 = RINGS[j];
          if (isWin(boss, {
            life: PLAYER_LIFE,
            damage: weapon.damage + r1.damage + r2.damage,
            armor: armor.armor + r1.armor + r2.armor
          })) {
            answer = Math.max(
              answer,
              weapon.cost + armor.cost + r1.cost + r2.cost
            );
          }
        }
      }
    });
  });

  return answer;
};
