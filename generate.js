const sharp = require("sharp");
const fs = require("fs");

const options = {};

const backs = ["backs/black-back.gif", "backs/purple-back.gif"];
const fronts = ["fronts/black-front.gif", "fronts/purple-front.gif"];
const traits = [
    "traits/Apple.gif",
    "traits/Bikers Bandana.gif",
    "traits/Captains Hat.gif",
    "traits/Jamaican hat.gif",
    "traits/Pimp Coat Brown.gif",
    "traits/Plad T-Shirt Red.gif",
    "",
];
const animal = ["animals/cat1.gif", "animals/robo.gif", "animals/fire.gif"];

async function convertToWebp(image) {
    await sharp(image, {
        animated: true,
    })
        .webp()
        .toFile("test.webp");
    // .toBuffer()
    // .then((res) => {
    //     return res;
    // });
}

async function backgroundPNG(image) {
    const existingGIF = await sharp(test_layers[1]).metadata();
    const delay = existingGIF.delay;
    console.log(delay.length);

    const buffer = await sharp(image).toBuffer({ resolveWithObject: true, gif: { delay: delay } });
    fs.writeFileSync("background.gif", buffer.data);
}

async function genImage(id, images, outputName) {
    list = [];
    images.forEach((element, index) => {
        list.push({
            input: element,
            gravity: "northwest",
            animated: element !== "./Gen2 IMages/layers/bg.png" ? true : false,
            blend: "over",
            // premultiplied: true,
            // raw: {
            //     delay: 1000, // Set delay for each frame
            // },
        });
    });
    console.log(list);
    await sharp("./layers/fronts/black-front.gif", { gravity: "northwest", animated: true, blend: "over" })
        // .rotate(180)
        // .resize(300)
        // .flatten({ background: "#627EEA" })
        .composite(list)
        // .sharpen()
        .gif()
        .toFile(`${outputName}.gif`);
}

async function testGen() {
    const prefix = "./layers/";
    backs.forEach((file, index) => {
        const layers = {
            bg: "./layers/background.gif",
            back: prefix + file,
            animal: null,
            front: prefix + fronts[index],
            trait: null,
        };
        console.log(layers);
        for (const trait of traits) {
            if (trait !== "") {
                layers.trait = prefix + trait;
            } else {
                layers.trait = null;
            }

            for (const ani of animal) {
                layers.animal = prefix + ani;
                const gen_layers = [];
                Object.keys(layers).forEach((key, index) => {
                    layers[key] !== null && gen_layers.push(layers[key]);
                });
                var random = Math.random() * 100000000000000000;
                console.log(random);
                genImage(0, gen_layers, "./test_images/" + random.toString());
            }
        }
    });
}

test_layers = ["./layers/background.gif", "./layers/backs/black-back.gif", "./layers/animals/cat1.gif", "./layers/fronts/black-front.gif", "./layers/traits/Captains Hat.gif"];

// genImage(0, test_layers, "./test_images/test");
testGen();
// backgroundPNG(test_layers[0]);
// convertToWebp(test_layers[1]);
