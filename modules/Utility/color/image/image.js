const { createCanvas, loadImage, registerFont } = require("canvas");
registerFont(__dirname + "/../../../../data/font/Montserrat-Light.ttf", {
    family: "Montserrat"
});

module.exports = async function(swatches, msg) {
    const uName = msg.member.nickname
        ? msg.member.nickname
        : msg.author.username;

    // Use a temporary canvas to determine name width in pixels
    const tmpCanvas = createCanvas(1, 1);
    const tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.font = "32pt Montserrat";

    const textWidth = tmpCtx.measureText(uName).width;
    const totalHeight = swatches.length * 43 + 16;

    // Initialize canvas
    const canvas = createCanvas(50 + textWidth, totalHeight);
    const ctx = canvas.getContext("2d");
    ctx.font = "32pt Montserrat";

    // Draw background colors
    ctx.beginPath();
    ctx.fillStyle = "#36393e";
    ctx.rect(0, 0, 60 + textWidth / 2, totalHeight);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(
        45 + textWidth / 2,
        0,
        canvas.width - 45 - textWidth / 2,
        totalHeight
    );
    ctx.fill();

    // Draw text
    for (let i = 0; i < swatches.length; i++) {
        const cr = swatches[i];
        const height = (i + 1) * 43;

        ctx.fillStyle = "white";
        ctx.fillText(i + 1 + ":", 5, height);

        ctx.fillStyle = cr;
        ctx.fillText(uName, 45, height);
    }

    return canvas.toBuffer();
};
