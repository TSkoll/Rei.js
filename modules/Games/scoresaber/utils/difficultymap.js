const difficultyMap = {
    "_ExpertPlus_SoloStandard": "Expert+",
    "_Expert_SoloStandard": "Expert",
    "_Hard_SoloStandard": "Hard",
    "_Normal_SoloStandard": "Normal",
    "_Easy_SoloStandard": "Easy"
}

function mapDifficulty(diffName) {
    return difficultyMap[diffName] || diffName;
}
module.exports = mapDifficulty;