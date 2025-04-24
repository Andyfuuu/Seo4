// === 遊戲數據庫（完整） ===
const gameData = {
    "genshin": {
        name: "原神",
        currency: "原石",
        pullCost: 160,
        characterPity: 90,
        weaponPity: 80,
        softPity: 75,
        baseRate: 0.6,
        rateUp: 50,
        packages: [
            {value: "6480", crystals: 6480, bonus: 1600, price: 3290},
            {value: "3280", crystals: 3280, bonus: 600, price: 1690},
            {value: "1980", crystals: 1980, bonus: 260, price: 990},
            {value: "980", crystals: 980, bonus: 110, price: 490},
            {value: "300", crystals: 300, bonus: 30, price: 170},
            {value: "60", crystals: 60, bonus: 0, price: 33}
        ]
    },
    "honkai-star-rail": {
        name: "崩壞：星穹鐵道",
        currency: "古老夢華",
        pullCost: 160,
        characterPity: 90,
        weaponPity: 80,
        softPity: 75,
        baseRate: 0.6,
        rateUp: 50,
        packages: [
            {value: "6480", crystals: 6480, bonus: 0, price: 3290},
            {value: "3280", crystals: 3280, bonus: 0, price: 1690},
            {value: "1980", crystals: 1980, bonus: 0, price: 990},
            {value: "980", crystals: 980, bonus: 0, price: 490},
            {value: "300", crystals: 300, bonus: 0, price: 170},
            {value: "60", crystals: 60, bonus: 0, price: 33}
        ]
    },
    "azur-lane": {
        name: "碧藍航線",
        currency: "鑽石",
        pullCost: 200,
        characterPity: 0,
        weaponPity: 0,
        softPity: 0,
        baseRate: 7,
        rateUp: 70,
        packages: [
            {value: "整船", crystals: 4900, bonus: 0, price: 2690},
            {value: "小箱", crystals: 2400, bonus: 0, price: 1350},
            {value: "袋", crystals: 1200, bonus: 0, price: 670},
            {value: "把", crystals: 600, bonus: 0, price: 330},
            {value: "小把", crystals: 300, bonus: 0, price: 170}
        ]
    },
    "blue-archive": {
        name: "藍色檔案",
        currency: "青輝石",
        pullCost: 120,
        characterPity: 200,
        weaponPity: 0,
        softPity: 0,
        baseRate: 2.5,
        rateUp: 70,
        packages: [
            {value: "6480", crystals: 6480, bonus: 1600, price: 3290},
            {value: "3280", crystals: 3280, bonus: 600, price: 1690},
            {value: "1980", crystals: 1980, bonus: 260, price: 990},
            {value: "980", crystals: 980, bonus: 110, price: 490},
            {value: "300", crystals: 300, bonus: 30, price: 170},
            {value: "60", crystals: 60, bonus: 0, price: 33}
        ]
    },
    "fgo": {
        name: "Fate/Grand Order",
        currency: "聖晶石",
        pullCost: 3,
        characterPity: 0,
        weaponPity: 0,
        softPity: 0,
        baseRate: 1,
        rateUp: 70,
        packages: [
            {value: "167", crystals: 167, bonus: 50, price: 3290},
            {value: "86", crystals: 86, bonus: 25, price: 1690},
            {value: "55", crystals: 55, bonus: 15, price: 990},
            {value: "41", crystals: 41, bonus: 8, price: 490},
            {value: "12", crystals: 12, bonus: 2, price: 170},
            {value: "1", crystals: 1, bonus: 0, price: 33}
        ]
    },
    "arknights": {
        name: "明日方舟",
        currency: "源石",
        pullCost: 600,
        characterPity: 100,
        weaponPity: 0,
        softPity: 50,
        baseRate: 2,
        rateUp: 50,
        packages: [
            {value: "一箱", crystals: 6480, bonus: 0, price: 3290},
            {value: "一袋", crystals: 3280, bonus: 0, price: 1690},
            {value: "一盒", crystals: 1980, bonus: 0, price: 990},
            {value: "一把", crystals: 980, bonus: 0, price: 490},
            {value: "一小把", crystals: 300, bonus: 0, price: 170}
        ]
    },
    "eternal-return": {
        name: "永恆輪迴",
        currency: "NP",
        pullCost: 100,
        characterPity: 0,
        weaponPity: 0,
        softPity: 0,
        baseRate: 3,
        rateUp: 100,
        packages: [
            {value: "13550", crystals: 13550, bonus: 0, price: 2700},
            {value: "6500", crystals: 6500, bonus: 0, price: 1350},
            {value: "4335", crystals: 4335, bonus: 0, price: 930},
            {value: "2435", crystals: 2435, bonus: 0, price: 540},
            {value: "1205", crystals: 1205, bonus: 0, price: 270},
            {value: "800", crystals: 800, bonus: 0, price: 180}
        ]
    }
};

// === 特殊獎勵邏輯區段 ===
function updateBonusInput() {
    const selected = document.querySelector('input[name="special-bonus"]:checked').value;
    const bonusGroup = document.getElementById('custom-bonus-group');
    if (selected === 'custom') {
        bonusGroup.style.display = 'block';
    } else {
        bonusGroup.style.display = 'none';
    }
    updatePackageBonuses();
}

function updatePackageBonuses() {
    const selected = document.querySelector('input[name="special-bonus"]:checked').value;
    const customBonus = parseInt(document.getElementById('custom-bonus')?.value || 0);
    const game = document.getElementById('game').value;
    const gameInfo = gameData[game];

    gameInfo.packages.forEach(pkg => {
        if (selected === 'first') {
            pkg.bonus = pkg.bonus * 2;
        } else if (selected === 'custom') {
            pkg.bonus = customBonus;
        }
    });
}

function calculateOfficialCost(currencyCost, packages) {
    let totalCost = 0;
    let remainingCurrency = currencyCost;

    const sortedPackages = [...packages].sort((a, b) => {
        const aTotal = a.crystals + a.bonus;
        const bTotal = b.crystals + b.bonus;
        return (bTotal / b.price) - (aTotal / a.price);
    });

    for (const pkg of sortedPackages) {
        const totalCrystals = pkg.crystals + pkg.bonus;
        while (remainingCurrency >= totalCrystals) {
            totalCost += pkg.price;
            remainingCurrency -= totalCrystals;
        }
    }

    if (remainingCurrency > 0) {
        const smallest = sortedPackages[sortedPackages.length - 1];
        totalCost += smallest.price;
    }

    return totalCost;
}

document.addEventListener('DOMContentLoaded', function () {
    updateBonusInput();
});
document.querySelectorAll('input[name="special-bonus"]').forEach(radio => {
    radio.addEventListener('change', updateBonusInput);
});