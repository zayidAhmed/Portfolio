// Page Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000);
})




// Every Html Id
const palletOne = document.getElementById('palletOne');
const palletTwo = document.getElementById('palletTwo');
const palletThree = document.getElementById('palletThree');
const palletFour = document.getElementById('palletFour');
const palletFive = document.getElementById('palletFive');

const palletTextOneRgb = document.getElementById('palletTextOneRgb');
const palletTextTwoRgb = document.getElementById('palletTextTwoRgb');
const palletTextThreeRgb = document.getElementById('palletTextThreeRgb');
const palletTextFourRgb = document.getElementById('palletTextFourRgb');
const palletTextFiveRgb = document.getElementById('palletTextFiveRgb');

const palletTextOneHex = document.getElementById('palletTextOneHex');
const palletTextTwoHex = document.getElementById('palletTextTwoHex');
const palletTextThreeHex = document.getElementById('palletTextThreeHex');
const palletTextFourHex = document.getElementById('palletTextFourHex');
const palletTextFiveHex = document.getElementById('palletTextFiveHex');

const savedPallets = document.getElementById('savedPallets');
const palletsSavedBtn = document.getElementById('palletsSavedBtn');
const palletsCancelBtn = document.getElementById('palletsCancelBtn');
const palletList = document.getElementById('palletList');

const lock1 = document.getElementById('lock1');
const lock2 = document.getElementById('lock2');
const lock3 = document.getElementById('lock3');
const lock4 = document.getElementById('lock4');
const lock5 = document.getElementById('lock5');

const fav1 = document.getElementById('fav1');
const fav2 = document.getElementById('fav2');
const fav3 = document.getElementById('fav3');
const fav4 = document.getElementById('fav4');
const fav5 = document.getElementById('fav5');




// Saved Pannel Show Hide System 
palletsSavedBtn.addEventListener('click', () => {
    savedPallets.style.transform = 'translateX(0px)';
});
palletsCancelBtn.addEventListener('click', () => {
    savedPallets.style.transform = 'translateX(400px)';
});





// For Reciving Color 


let RGBColorOne = '';
let RGBColorTwo = '';
let RGBColorThree = '';
let RGBColorFour = '';
let RGBColorFive = '';

// For Text Color 
let ReverseRGBColorOne = '';
let ReverseRGBColorTwo = '';
let ReverseRGBColorThree = '';
let ReverseRGBColorFour = '';
let ReverseRGBColorFive = '';

let HEXColorOne = '';
let HEXColorTwo = '';
let HEXColorThree = '';
let HEXColorFour = '';
let HEXColorFive = '';

// let ReverseHEXColorOne = '';
// let ReverseHEXColorTwo = '';
// let ReverseHEXColorThree = '';
// let ReverseHEXColorFour = '';
// let ReverseHEXColorFive = '';


// Random Color Generator 
function RGBGenerator() {
    // Generates random rgb color
    RGBColorOne = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;
    RGBColorTwo = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;
    RGBColorThree = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;
    RGBColorFour = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;
    RGBColorFive = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;


    // Rgb To Hex Converter
    function convertRgbToHex() {
        const rgbToHex = (rgbString) => {
            // Extract numbers from the RGB string
            const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);


            // Convert to numbers
            const [_, r, g, b] = match.map(Number);


            const toHex = (value) => value.toString(16).padStart(2, '0');
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;

        };

        // Update HEX color variables
        HEXColorOne = rgbToHex(RGBColorOne);
        HEXColorTwo = rgbToHex(RGBColorTwo);
        HEXColorThree = rgbToHex(RGBColorThree);
        HEXColorFour = rgbToHex(RGBColorFour);
        HEXColorFive = rgbToHex(RGBColorFive);
    }
    convertRgbToHex()


    function isLightColor(RGBColor) {
        let r, g, b;

        if (RGBColor.startsWith('#')) {
            // HEX color
            RGBColor = RGBColor.slice(1);
            r = parseInt(RGBColor.substring(0, 2), 16);
            g = parseInt(RGBColor.substring(2, 4), 16);
            b = parseInt(RGBColor.substring(4, 6), 16);
        } else {
            // RGB color (like rgb(100, 150, 200))
            let rgbValues = RGBColor.match(/\d+/g);
            r = parseInt(rgbValues[0]);
            g = parseInt(rgbValues[1]);
            b = parseInt(rgbValues[2]);
        }

        // Calculate brightness
        let brightness = (0.299 * r) + (0.587 * g) + (0.114 * b);

        // Return whether the color is light or dark
        return brightness > 128 ? 'light' : 'dark';
    }

    ReverseRGBColorOne = isLightColor(RGBColorOne) === 'light' ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
    ReverseRGBColorTwo = isLightColor(RGBColorTwo) === 'light' ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
    ReverseRGBColorThree = isLightColor(RGBColorThree) === 'light' ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
    ReverseRGBColorFour = isLightColor(RGBColorFour) === 'light' ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
    ReverseRGBColorFive = isLightColor(RGBColorFive) === 'light' ? 'rgb(0,0,0)' : 'rgb(255,255,255)';


}


function colorUpdater() {
    RGBGenerator()
    // Every Pallet Color Changer
    palletOne.style.backgroundColor = RGBColorOne;
    palletTwo.style.backgroundColor = RGBColorTwo;
    palletThree.style.backgroundColor = RGBColorThree;
    palletFour.style.backgroundColor = RGBColorFour;
    palletFive.style.backgroundColor = RGBColorFive;

    // Every Pallet Text Changer
    palletTextOneRgb.innerText = RGBColorOne.toUpperCase();
    palletTextOneRgb.style.color = ReverseRGBColorOne;
    palletTextTwoRgb.innerText = RGBColorTwo.toUpperCase();
    palletTextTwoRgb.style.color = ReverseRGBColorTwo;
    palletTextThreeRgb.innerText = RGBColorThree.toUpperCase();
    palletTextThreeRgb.style.color = ReverseRGBColorThree;
    palletTextFourRgb.innerText = RGBColorFour.toUpperCase();
    palletTextFourRgb.style.color = ReverseRGBColorFour;
    palletTextFiveRgb.innerText = RGBColorFive.toUpperCase();
    palletTextFiveRgb.style.color = ReverseRGBColorFive;

    palletTextOneHex.innerText = HEXColorOne.toUpperCase();
    palletTextOneHex.style.color = ReverseRGBColorOne;
    palletTextTwoHex.innerText = HEXColorTwo.toUpperCase();
    palletTextTwoHex.style.color = ReverseRGBColorTwo;
    palletTextThreeHex.innerText = HEXColorThree.toUpperCase();
    palletTextThreeHex.style.color = ReverseRGBColorThree;
    palletTextFourHex.innerText = HEXColorFour.toUpperCase();
    palletTextFourHex.style.color = ReverseRGBColorFour;
    palletTextFiveHex.innerText = HEXColorFive.toUpperCase();
    palletTextFiveHex.style.color = ReverseRGBColorFive;

    saveData();

    // if (x == 0) {
    //     RGBGenerator()

    //     // Every Pallet Color Changer
    //     palletOne.style.backgroundColor = RGBColorOne;
    //     palletTwo.style.backgroundColor = RGBColorTwo;
    //     palletThree.style.backgroundColor = RGBColorThree;
    //     palletFour.style.backgroundColor = RGBColorFour;
    //     palletFive.style.backgroundColor = RGBColorFive;

    //     // Every Pallet Text Changer
    //     palletTextOne.innerText = RGBColorOne.toUpperCase();
    //     palletTextOne.style.color = ReverseRGBColorOne;
    //     palletTextTwo.innerText = RGBColorTwo.toUpperCase();
    //     palletTextTwo.style.color = ReverseRGBColorTwo;
    //     palletTextThree.innerText = RGBColorThree.toUpperCase();
    //     palletTextThree.style.color = ReverseRGBColorThree;
    //     palletTextFour.innerText = RGBColorFour.toUpperCase();
    //     palletTextFour.style.color = ReverseRGBColorFour;
    //     palletTextFive.innerText = RGBColorFive.toUpperCase();
    //     palletTextFive.style.color = ReverseRGBColorFive;
    // }
    // else if (x == 1) {
    //     HEXGenerator()

    //     // Every Pallet Color Changer
    //     palletOne.style.backgroundColor = HEXColorOne;
    //     palletTwo.style.backgroundColor = HEXColorTwo;
    //     palletThree.style.backgroundColor = HEXColorThree;
    //     palletFour.style.backgroundColor = HEXColorFour;
    //     palletFive.style.backgroundColor = HEXColorFive;

    //     // Every Pallet Text Changer
    //     palletTextOne.innerText = HEXColorOne.toUpperCase();
    //     palletTextOne.style.color = ReverseHEXColorOne;
    //     palletTextTwo.innerText = HEXColorTwo.toUpperCase();
    //     palletTextTwo.style.color = ReverseHEXColorTwo;
    //     palletTextThree.innerText = HEXColorThree.toUpperCase();
    //     palletTextThree.style.color = ReverseHEXColorThree;
    //     palletTextFour.innerText = HEXColorFour.toUpperCase();
    //     palletTextFour.style.color = ReverseHEXColorFour;
    //     palletTextFive.innerText = HEXColorFive.toUpperCase();
    //     palletTextFive.style.color = ReverseHEXColorFive;
    // }

    a = 0;
    b = 0;
    c = 0;
    d = 0;
    e = 0;
    fav1.classList.remove('fa-solid');
    fav1.classList.add('fa-regular');
    fav2.classList.remove('fa-solid');
    fav2.classList.add('fa-regular');
    fav3.classList.remove('fa-solid');
    fav3.classList.add('fa-regular');
    fav4.classList.remove('fa-solid');
    fav4.classList.add('fa-regular');
    fav5.classList.remove('fa-solid');
    fav5.classList.add('fa-regular');
}




// Pallet Saver Function 
fav1.addEventListener('click', () => {
    let a = 0;
    if (a == 0) {
        fav1.classList.add('fa-solid');
        fav1.classList.remove('fa-regular');

        const colorTxt1 = palletTextOneRgb.innerText;
        const colorTxt2 = palletTextOneHex.innerText;

        let li = document.createElement('li');

        li.innerHTML = `${colorTxt2} <br> ${colorTxt1}`;
        li.style.backgroundColor = colorTxt1;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', () => {
            li.remove();

            fav1.classList.remove('fa-solid');
            fav1.classList.add('fa-regular');

            a = 0;
        });

        li.appendChild(deleteBtn);

        palletList.appendChild(li);

        a = 1;
        saveData();
    } else {
        return;
    }
});
fav2.addEventListener('click', () => {
    let b = 0;
    if (b == 0) {
        fav2.classList.add('fa-solid');
        fav2.classList.remove('fa-regular');

        const colorTxt1 = palletTextTwoRgb.innerText;
        const colorTxt2 = palletTextTwoHex.innerText;

        let li = document.createElement('li');

        li.innerHTML = `${colorTxt2} <br> ${colorTxt1}`;
        li.style.backgroundColor = colorTxt1;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', () => {
            li.remove();

            fav2.classList.remove('fa-solid');
            fav2.classList.add('fa-regular');

            b = 0;
        });

        li.appendChild(deleteBtn);

        palletList.appendChild(li);

        b = 1;
        saveData();
    } else {
        return;
    }
});
fav3.addEventListener('click', () => {
    let c = 0;
    if (c == 0) {
        fav3.classList.add('fa-solid');
        fav3.classList.remove('fa-regular');

        const colorTxt1 = palletTextThreeRgb.innerText;
        const colorTxt2 = palletTextThreeHex.innerText;

        let li = document.createElement('li');

        li.innerHTML = `${colorTxt2} <br> ${colorTxt1}`;
        li.style.backgroundColor = colorTxt1;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', () => {
            li.remove();

            fav3.classList.remove('fa-solid');
            fav3.classList.add('fa-regular');

            c = 0;
        });

        li.appendChild(deleteBtn);

        palletList.appendChild(li);

        c = 1;
        saveData();
    } else {
        return;
    }
});
fav4.addEventListener('click', () => {
    let d = 0;
    if (d == 0) {
        fav4.classList.add('fa-solid');
        fav4.classList.remove('fa-regular');

        const colorTxt1 = palletTextFourRgb.innerText;
        const colorTxt2 = palletTextFourHex.innerText;

        let li = document.createElement('li');

        li.innerHTML = `${colorTxt2} <br> ${colorTxt1}`;
        li.style.backgroundColor = colorTxt1;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', () => {
            li.remove();

            fav4.classList.remove('fa-solid');
            fav4.classList.add('fa-regular');

            d = 0;
        });

        li.appendChild(deleteBtn);

        palletList.appendChild(li);

        d = 1;
        saveData();
    } else {
        return;
    }
});
fav5.addEventListener('click', () => {
    let e = 0;
    if (e == 0) {
        fav5.classList.add('fa-solid');
        fav5.classList.remove('fa-regular');

        const colorTxt1 = palletTextFiveRgb.innerText;
        const colorTxt2 = palletTextFiveHex.innerText;

        let li = document.createElement('li');

        li.innerHTML = `${colorTxt2} <br> ${colorTxt1}`;
        li.style.backgroundColor = colorTxt1;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', () => {
            li.remove();

            fav5.classList.remove('fa-solid');
            fav5.classList.add('fa-regular');

            e = 0;
        });

        li.appendChild(deleteBtn);

        palletList.appendChild(li);

        e = 1;
        saveData();
    } else {
        return;
    }
});





// Light Color Generator For preloader
function lightColorGenerator() {
    const preLoaderColor = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;
    document.documentElement.style.setProperty('--preBG', preLoaderColor);
}
lightColorGenerator();

// Change The Preloader BG Color Nearly Every Second 
let i = 0;
const interval = setInterval(() => {
    if (i >= 10) {
        clearInterval(interval);
        return;
    }

    // Generate random light color
    const preLoaderColor = `rgb(${Math.floor(Math.random() * 156) + 100},${Math.floor(Math.random() * 156) + 100},${Math.floor(Math.random() * 156) + 100})`;

    document.documentElement.style.setProperty('--preBG', preLoaderColor);
    i++;
}, 3000 / 4);




// Copy Text
function copyText() {
    const textToCopy = this.innerText; // Get the text from the element
    navigator.clipboard.writeText(textToCopy).then(
        () => {
            // Notify the user that the text has been copied
            const massage = document.getElementById('message');
            massage.innerText = 'Text copied to clipboard!';
            massage.style.padding = '10px 20px';
            setTimeout(() => {
                massage.innerText = '';
                massage.style.padding = '0';
            }, 2000); // Clear the message after 2 seconds
        },
        (err) => {
            console.error('Failed to copy text: ', err);
        }
    );
}

palletTextOneRgb.addEventListener('click', copyText);
palletTextTwoRgb.addEventListener('click', copyText);
palletTextThreeRgb.addEventListener('click', copyText);
palletTextFourRgb.addEventListener('click', copyText);
palletTextFiveRgb.addEventListener('click', copyText);

palletTextOneHex.addEventListener('click', copyText);
palletTextTwoHex.addEventListener('click', copyText);
palletTextThreeHex.addEventListener('click', copyText);
palletTextFourHex.addEventListener('click', copyText);
palletTextFiveHex.addEventListener('click', copyText);




// Updates The Height Dinamically
function updateVh() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
}
window.addEventListener('resize', updateVh);
updateVh();





function saveData() {
    const palettes = [
        { rgb: palletTextOneRgb.innerText, textBg: palletTextOneRgb.style.backgroundColor, palletBg: palletOne.style.backgroundColor, hex: palletTextOneHex.innerText, hextextBg: palletTextOneHex.style.backgroundColor },
        { rgb: palletTextTwoRgb.innerText, textBg: palletTextTwoRgb.style.backgroundColor, palletBg: palletTwo.style.backgroundColor, hex: palletTextTwoHex.innerText, hextextBg: palletTextTwoHex.style.backgroundColor },
        { rgb: palletTextThreeRgb.innerText, textBg: palletTextThreeRgb.style.backgroundColor, palletBg: palletThree.style.backgroundColor, hex: palletTextThreeHex.innerText, hextextBg: palletTextThreeHex.style.backgroundColor },
        { rgb: palletTextFourRgb.innerText, textBg: palletTextFourRgb.style.backgroundColor, palletBg: palletFour.style.backgroundColor, hex: palletTextFourHex.innerText, hextextBg: palletTextFourHex.style.backgroundColor },
        { rgb: palletTextFiveRgb.innerText, textBg: palletTextFiveRgb.style.backgroundColor, palletBg: palletFive.style.backgroundColor, hex: palletTextFiveHex.innerText, hextextBg: palletTextFiveHex.style.backgroundColor },
        { lock1: lock1.className, lock2: lock2.className, lock3: lock3.className, lock4: lock4.className, lock5: lock5.className, fav: fav1.className, fav2: fav2.className, fav3: fav3.className, fav4: fav4.className, fav5: fav5.className, savedPannel: palletList.innerHTML },
    ];
    localStorage.setItem("colorGeneratorData", JSON.stringify(palettes));
}
// Show saved color data from localStorage
function showData() {
    const savedPalettes = JSON.parse(localStorage.getItem("colorGeneratorData"));

    if (savedPalettes) {
        palletTextOneRgb.innerText = savedPalettes[0].rgb;
        palletTextOneRgb.style.backgroundColor = savedPalettes[0].textBg;
        palletTextOneHex.innerText = savedPalettes[0].hex;
        palletTextOneHex.style.backgroundColor = savedPalettes[0].hextextBg;
        palletTextTwoRgb.innerText = savedPalettes[1].rgb;
        palletTextTwoRgb.style.backgroundColor = savedPalettes[1].textBg;
        palletTextTwoHex.innerText = savedPalettes[1].hex;
        palletTextTwoHex.style.backgroundColor = savedPalettes[1].hextextBg;
        palletTextThreeRgb.innerText = savedPalettes[2].rgb;
        palletTextThreeRgb.backgroundColor = savedPalettes[2].textBg;
        palletTextThreeHex.innerText = savedPalettes[2].hex;
        palletTextThreeHex.style.backgroundColor = savedPalettes[2].hextextBg;
        palletTextFourRgb.innerText = savedPalettes[3].rgb;
        palletTextFourRgb.style.backgroundColor = savedPalettes[3].textBg;
        palletTextFourHex.innerText = savedPalettes[3].hex;
        palletTextFourHex.style.backgroundColor = savedPalettes[3].hextextBg;
        palletTextFiveRgb.innerText = savedPalettes[4].rgb;
        palletTextFiveRgb.style.backgroundColor = savedPalettes[4].textBg;
        palletTextFiveHex.innerText = savedPalettes[4].hex;
        palletTextFiveHex.style.backgroundColor = savedPalettes[4].hextextBg;
        palletOne.style.backgroundColor = savedPalettes[0].palletBg;
        palletTwo.style.backgroundColor = savedPalettes[1].palletBg;
        palletThree.style.backgroundColor = savedPalettes[2].palletBg;
        palletFour.style.backgroundColor = savedPalettes[3].palletBg;
        palletFive.style.backgroundColor = savedPalettes[4].palletBg;
        lock1.className = savedPalettes[5].lock1;
        lock2.className = savedPalettes[5].lock2;
        lock3.className = savedPalettes[5].lock3;
        lock4.className = savedPalettes[5].lock4;
        lock5.className = savedPalettes[5].lock5;
        fav1.className = savedPalettes[5].fav;
        fav2.className = savedPalettes[5].fav2;
        fav3.className = savedPalettes[5].fav3;
        fav4.className = savedPalettes[5].fav4;
        fav5.className = savedPalettes[5].fav5;

        palletList.innerHTML = savedPalettes[5].savedPannel;

        // Reattach event listeners to delete buttons
        Array.from(palletList.children).forEach(li => {
            const deleteBtn = li.querySelector('button'); // Find the delete button in the li
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    li.remove();
                    fav1.classList.remove('fa-solid');
                    fav1.classList.add('fa-regular');
                    saveData(); // Update local storage after deletion
                });
            }
        });
    } else {
        console.log("No saved palettes found.");
    }
}

// Call showData when page loads
showData();


// DONE!!!