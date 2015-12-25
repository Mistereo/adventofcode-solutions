/*
--- Part Two ---

On the next run through the game, you increase the difficulty to hard.

At the start of each player turn (before any other effects apply), you lose 1
hit point. If this brings you to or below 0 hit points, you lose.

With the same starting stats for you and the boss, what is the least amount of
mana you can spend and still win the fight?
 */

const PLAYER_LIFE = 50;
const PLAYER_MANA = 500;

const SPELLS = {
  missile: { cost: 53, damage: 4, heal: 0 },
  drain: { cost: 73, damage: 2, heal: 2 },
  shield: { cost: 113, isEffect: true, turns: 6, armor: 7 },
  poison: { cost: 173, isEffect: true, turns: 6, damage: 3 },
  recharge: { cost: 229, isEffect: true, turns: 5, mana: 101 },
};

export default function solution(input) {
  const [life, damage] = input.trim()
    .split('\n')
    .map(i => parseInt(i.split(' ').pop()));
  const boss = { life, damage };

  let answer = Infinity;

  const spellsEntries = Object.entries(SPELLS);
  function simulate(
    playerLife,
    playerMana,
    bossLife,
    shieldTimer = 0,
    poisonTimer = 0,
    rechargeTimer = 0,
    isPlayerMove = true,
    total = 0
  ) {
    if (isPlayerMove) {
      playerLife--;
    }
    if (playerLife <= 0) return;

    let playerArmor = 0;
    if (shieldTimer) {
      playerArmor = SPELLS.shield.armor;
      shieldTimer--;
    }
    if (rechargeTimer) {
      playerMana += SPELLS.recharge.mana;
      rechargeTimer--;
    }
    if (poisonTimer) {
      bossLife -= SPELLS.poison.damage;
      poisonTimer--;
    }

    if (bossLife <= 0) {
      answer = Math.min(answer, total);
    }

    if (isPlayerMove) {
      spellsEntries.forEach(([name, params]) => {
        if (params.cost > playerMana) return;

        let newPlayerLife = playerLife;
        let newBossLife = bossLife;

        let newShieldTimer = shieldTimer;
        let newRechargeTimer = rechargeTimer;
        let newPoisonTimer = poisonTimer;

        if (name === 'shield') {
          if (newShieldTimer) return;
          newShieldTimer = params.turns;
        } else if (name === 'recharge') {
          if (newRechargeTimer) return;
          newRechargeTimer = params.turns;
        } else if (name === 'poison') {
          if (newPoisonTimer) return;
          newPoisonTimer = params.turns;
        } else {
          newPlayerLife += params.heal;
          newBossLife -= params.damage;
        }

        simulate(
          newPlayerLife,
          playerMana - params.cost,
          newBossLife,
          newShieldTimer,
          newPoisonTimer,
          newRechargeTimer,
          false,
          total + params.cost
        );
      });
    } else {
      playerLife -= (boss.damage - playerArmor);
      simulate(
        playerLife,
        playerMana,
        bossLife,
        shieldTimer,
        poisonTimer,
        rechargeTimer,
        true,
        total
      );
    }
  }

  simulate(
    PLAYER_LIFE,
    PLAYER_MANA,
    boss.life
  );

  return answer;
};
