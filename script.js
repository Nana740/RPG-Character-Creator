// ---------- 1. GRAB THE PAGE ELEMENTS (querySelector) ----------
// Class buttons
const warriorClassBtn = document.querySelector('#warrior-class-btn');
const mageClassBtn = document.querySelector('#mage-class-btn');
 
// Weapon buttons
const ironSwordBtn = document.querySelector('#iron-sword-btn');
const warAxeBtn = document.querySelector('#war-axe-btn');
const arcaneStaffBtn = document.querySelector('#arcane-staff-btn');
 
// Armor buttons
const plateArmorBtn = document.querySelector('#plate-armor-btn');
const leatherArmorBtn = document.querySelector('#leather-armor-btn');
const mageRobeBtn = document.querySelector('#mage-robe-btn');
 
// Reset button
const resetHeroBtn = document.querySelector('#reset-hero-btn');
 
// The hero sheet on the right side
const heroClassLine = document.querySelector('#hero-class-line');
const heroWeaponLine = document.querySelector('#hero-weapon-line');
const heroArmorLine = document.querySelector('#hero-armor-line');
const totalAttackDisplay = document.querySelector('#total-attack');
const totalDefenseDisplay = document.querySelector('#total-defense');
const attackBar = document.querySelector('#attack-bar');
const defenseBar = document.querySelector('#defense-bar');
const heroPlaystyle = document.querySelector('#hero-playstyle');
 
// ---------- 2. FIXED VALUES ----------
// The highest attack and defense a hero can possibly reach.
// Attack: Mage 14 + War Axe 16 + Mage Robe 9 = 39
// Defense: Warrior 12 + Iron Sword 2 + Plate Armor 16 = 30
// We use these to fill the stat bars from 0% to 100%.
const maxPossibleAttack = 39;
const maxPossibleDefense = 30;
 
// ---------- 3. THE HERO BUILD (one object that remembers every choice) ----------
// "None" and 0 mean nothing has been chosen yet.
// The three "...Button" values remember which button is highlighted (null = none).
const heroBuild = {
  heroClassName: "Not chosen",
  classAttack: 0,
  classDefense: 0,
  classButton: null,
 
  weaponName: "Not chosen",
  weaponAttack: 0,
  weaponDefense: 0,
  weaponButton: null,
 
  armorName: "Not chosen",
  armorAttack: 0,
  armorDefense: 0,
  armorButton: null
};
 
// ---------- 4. FUNCTIONS THAT SAVE A CHOICE ----------
// Each one does the same 4 things:
//  1. Un-highlight the old button (if there was one)
//  2. Highlight the new button
//  3. Save the new name and stat points in heroBuild
//  4. Refresh the hero sheet
 
function chooseHeroClass(chosenHeroButton, heroClassTitle, heroAttackBonus, heroDefenseBonus) {
  if (heroBuild.classButton !== null) {
    heroBuild.classButton.classList.remove('chosen-hero-option');
  }
  chosenHeroButton.classList.add('chosen-hero-option');
 
  heroBuild.heroClassName = heroClassTitle;
  heroBuild.classAttack = heroAttackBonus;
  heroBuild.classDefense = heroDefenseBonus;
  heroBuild.classButton = chosenHeroButton;
 
  updateHeroSheet();
}
 
function chooseWeapon(chosenHeroButton, weaponChoice, heroAttackBonus, heroDefenseBonus) {
  if (heroBuild.weaponButton !== null) {
    heroBuild.weaponButton.classList.remove('chosen-hero-option');
  }
  chosenHeroButton.classList.add('chosen-hero-option');
 
  heroBuild.weaponName = weaponChoice;
  heroBuild.weaponAttack = heroAttackBonus;
  heroBuild.weaponDefense = heroDefenseBonus;
  heroBuild.weaponButton = chosenHeroButton;
 
  updateHeroSheet();
}
 
function chooseArmor(chosenHeroButton, armorChoice, heroAttackBonus, heroDefenseBonus) {
  if (heroBuild.armorButton !== null) {
    heroBuild.armorButton.classList.remove('chosen-hero-option');
  }
  chosenHeroButton.classList.add('chosen-hero-option');
 
  heroBuild.armorName = armorChoice;
  heroBuild.armorAttack = heroAttackBonus;
  heroBuild.armorDefense = heroDefenseBonus;
  heroBuild.armorButton = chosenHeroButton;
 
  updateHeroSheet();
}
 
// ---------- 5. THE FUNCTION THAT REDRAWS THE HERO SHEET ----------
// It always works out the totals from scratch, so the numbers can never go wrong.
function updateHeroSheet() {
  // The text list of chosen gear
  heroClassLine.textContent = "Class: " + heroBuild.heroClassName;
  heroWeaponLine.textContent = "Weapon: " + heroBuild.weaponName;
  heroArmorLine.textContent = "Armor: " + heroBuild.armorName;
 
  // The running totals: add up the class + weapon + armor points
  const totalAttack = heroBuild.classAttack + heroBuild.weaponAttack + heroBuild.armorAttack;
  const totalDefense = heroBuild.classDefense + heroBuild.weaponDefense + heroBuild.armorDefense;
 
  totalAttackDisplay.textContent = totalAttack;
  totalDefenseDisplay.textContent = totalDefense;
 
  // The stat bars: the width is the total as a percentage of the maximum
  attackBar.style.width = (totalAttack / maxPossibleAttack) * 100 + "%";
  defenseBar.style.width = (totalDefense / maxPossibleDefense) * 100 + "%";
 
  // A short message that describes the hero's style
  if (totalAttack === 0 && totalDefense === 0) {
    heroPlaystyle.textContent = "Choose a class, weapon and armor to begin your legend.";
  } else if (totalAttack > totalDefense) {
    heroPlaystyle.textContent = "Aggressive build: your hero hits hard and ends fights fast.";
  } else if (totalDefense > totalAttack) {
    heroPlaystyle.textContent = "Defensive build: your hero can take a beating and keep standing.";
  } else {
    heroPlaystyle.textContent = "Balanced build: equal power in attack and defense.";
  }
}
 
// ---------- 6. THE RESET FUNCTION ----------
function resetCharacter() {
  // Un-highlight any button that is still highlighted
  if (heroBuild.classButton !== null) {
    heroBuild.classButton.classList.remove('chosen-hero-option');
  }
  if (heroBuild.weaponButton !== null) {
    heroBuild.weaponButton.classList.remove('chosen-hero-option');
  }
  if (heroBuild.armorButton !== null) {
    heroBuild.armorButton.classList.remove('chosen-hero-option');
  }
 
  // Put every value in heroBuild back to its starting value
  heroBuild.heroClassName = "Not chosen";
  heroBuild.classAttack = 0;
  heroBuild.classDefense = 0;
  heroBuild.classButton = null;
 
  heroBuild.weaponName = "Not chosen";
  heroBuild.weaponAttack = 0;
  heroBuild.weaponDefense = 0;
  heroBuild.weaponButton = null;
 
  heroBuild.armorName = "Not chosen";
  heroBuild.armorAttack = 0;
  heroBuild.armorDefense = 0;
  heroBuild.armorButton = null;
 
  // Redraw the hero sheet: the list is empty again and both totals are 0
  updateHeroSheet();
}
 
// ---------- 7. EVENT LISTENERS (what happens on a click) ----------
// clickEvent.target is the exact button that was clicked.
 
// Classes: (button, name, attack points, defense points)
warriorClassBtn.addEventListener('click', (clickEvent) => {
  chooseHeroClass(clickEvent.target, "Warrior", 8, 12);
});
mageClassBtn.addEventListener('click', (clickEvent) => {
  chooseHeroClass(clickEvent.target, "Mage", 14, 5);
});
 
// Weapons
ironSwordBtn.addEventListener('click', (clickEvent) => {
  chooseWeapon(clickEvent.target, "Iron Sword", 12, 2);
});
warAxeBtn.addEventListener('click', (clickEvent) => {
  chooseWeapon(clickEvent.target, "War Axe", 16, 0);
});
arcaneStaffBtn.addEventListener('click', (clickEvent) => {
  chooseWeapon(clickEvent.target, "Arcane Staff", 14, 1);
});
 
// Armor
plateArmorBtn.addEventListener('click', (clickEvent) => {
  chooseArmor(clickEvent.target, "Plate Armor", 0, 16);
});
leatherArmorBtn.addEventListener('click', (clickEvent) => {
  chooseArmor(clickEvent.target, "Leather Armor", 4, 10);
});
mageRobeBtn.addEventListener('click', (clickEvent) => {
  chooseArmor(clickEvent.target, "Mage Robe", 9, 6);
});
 
// Reset
resetHeroBtn.addEventListener('click', resetCharacter);
 
// ---------- 8. DRAW THE HERO SHEET ONCE WHEN THE PAGE LOADS ----------
updateHeroSheet();