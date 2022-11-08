/*
    Converts HSL to RGB color space
*/
function hslToRgb(h, s, l){
    let chroma = (1 - Math.abs(2 * l - 1)) * s;
    let h2 = h / 60;
    let x = chroma * (1 - Math.abs(h2 % 2 - 1));
    let m = l - (chroma/2);

    switch (h2) {
        case 0 <
    }
    
    console.log(chroma.toFixed(4));
    console.log(h2.toFixed(4));
    console.log(x.toFixed(4));
}
