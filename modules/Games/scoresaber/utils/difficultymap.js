const difficultyMap = {
    "_ExpertPlus_SoloStandard": "Expert+",
    "_Expert_SoloStandard": "Expert",
    "_Hard_SoloStandard": "Hard",
    "_Normal_SoloStandard": "Normal",
    "_Easy_SoloStandard": "Easy"
}

/**
 * Turns a scoresaber api difficulty into a player readable one.
 * @param {String} diffName Name of a Scoresaber map difficulty
 */
function mapDifficulty(diffName) {
    return difficultyMap[diffName] || diffName;
}
module.exports = mapDifficulty;