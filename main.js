


function renderHP() {
    this.elHP.innerText =
        this.hp.current + ' / ' + this.hp.total;

    const percent =
        (this.hp.current / this.hp.total) * 100;

    this.elProgressbar.style.width = percent + '%';

    this.elProgressbar.classList.remove(
        'low', 'critical'
    );

    if (percent <= 30) {
        this.elProgressbar.classList.add('critical');
    } else if (percent <= 60) {
        this.elProgressbar.classList.add('low');
    }
}

function hitAnimation() {
    this.elPokemon.classList.remove('hit');

    void this.elPokemon.offsetWidth;

    this.elPokemon.classList.add('hit');

    setTimeout(() => {
        this.elPokemon.classList.remove('hit');
    }, 300);
}

function changeHP(damage) {
    this.hp.current = Math.max(
        0,
        this.hp.current - damage
    );

    this.renderHP();
    this.hitAnimation();
}

function resetHP() {
    this.hp.current = this.hp.total;
    this.renderHP();
}




const character = {
    name: 'Pikachu',

    hp: {
        current: 100,
        total: 100
    },

    elHP: document.getElementById(
        'health-character'
    ),

    elProgressbar: document.getElementById(
        'progressbar-character'
    ),

    elPokemon: document.querySelector(
        '.pokemon.character'
    ),

    renderHP,
    hitAnimation,
    changeHP,
    resetHP
};




const enemy = {
    name: 'Charmander',

    hp: {
        current: 100,
        total: 100
    },

    elHP: document.getElementById(
        'health-enemy'
    ),

    elProgressbar: document.getElementById(
        'progressbar-enemy'
    ),

    elPokemon: document.querySelector(
        '.pokemon.enemy'
    ),

    renderHP,
    hitAnimation,
    changeHP,
    resetHP
};




const btnThunder = document.getElementById(
    'btn-kick'
);

const btnElectro = document.getElementById(
    'btn-kick-strong'
);

const battleInfo = document.getElementById(
    'battle-info'
);

const logo = document.getElementById('logo');



function random(max) {
    return Math.floor(Math.random() * max) + 1;
}




function disableButtons() {
    btnThunder.disabled = true;
    btnElectro.disabled = true;
}




function checkWinner() {

    if (enemy.hp.current <= 0) {
        battleInfo.innerText =
            character.name + ' переміг!';

        disableButtons();
        return true;
    }

    if (character.hp.current <= 0) {
        battleInfo.innerText =
            enemy.name + ' переміг!';

        disableButtons();
        return true;
    }

    return false;
}




function fight(attackName, maxDamage) {

    if (
        character.hp.current <= 0 ||
        enemy.hp.current <= 0
    ) {
        return;
    }

    // Pikachu атакує Charmander
    const characterDamage = random(maxDamage);

    enemy.changeHP(characterDamage);

    battleInfo.innerText =
        character.name + ' використав ' +
        attackName + ' та завдав ' +
        characterDamage + ' шкоди!';

    if (checkWinner()) {
        return;
    }

    // Charmander атакує Pikachu
    const enemyDamage = random(15);

    character.changeHP(enemyDamage);

    battleInfo.innerText =
        character.name + ': -' +
        enemyDamage + ' HP | ' +
        enemy.name + ': -' +
        characterDamage + ' HP';

    checkWinner();
}




btnThunder.addEventListener('click', function () {
    fight('Thunder Jolt', 20);
});




btnElectro.addEventListener('click', function () {
    fight('Electro Ball', 35);
});




function resetGame() {

    character.resetHP();
    enemy.resetHP();

    character.elPokemon.classList.remove('hit');
    enemy.elPokemon.classList.remove('hit');

    btnThunder.disabled = false;
    btnElectro.disabled = false;

    battleInfo.innerText = 'Оберіть атаку';
}




logo.addEventListener('click', resetGame);




character.renderHP();
enemy.renderHP();
