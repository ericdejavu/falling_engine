
let _EMPTY = [0,0,0,255];
let _WATER = [30,150,255,255];
let d = 0;
let tmp_pixels = {}

function inBounds(x, y) {
    return x >= 0 && y >= 0
        && x < width && y < height;
}

function compare(x, y, cls) {
    let i = idx(x,y);
    return inBounds(x, y) && pixels[i] == cls[0] 
            && pixels[i+1] == cls[1]
            && pixels[i+2] == cls[2]
            && pixels[i+3] == cls[3];
}

function isEmpty(x, y) {
    return compare(x, y, _EMPTY);
}

function get_pixels(x, y) {
    let i = idx(x,y);
    return [pixels[i], pixels[i+1], pixels[i+2],pixels[i+3]];
}

function idx(x,y) {
    return index(x, y, 0, 0);
}

function index(x, y, i, j) {
    return 4 * ((y * d + j) * width * d + (x * d + i));
}

function setCell(x, y, clr) {
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          _idx = index(x, y, i, j);
          tmp_pixels[_idx] = clr;
        }
    }
}

function updateCell(x, y, clr) {
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          _idx = index(x, y, i, j);
          pixels[_idx] = clr[0];
          pixels[_idx+1] = clr[1];
          pixels[_idx+2] = clr[2];
          pixels[_idx+3] = clr[3];
        }
    }
}

function update() {
    for (let i of Object.keys(tmp_pixels)) {
        pixels[i] = tmp_pixels[i][0]
        pixels[i+1] = tmp_pixels[i][1]
        pixels[i+2] = tmp_pixels[i][2]
        pixels[i+3] = tmp_pixels[i][3]
    }
}

function setup() {
    createCanvas(400, 400);
    d = pixelDensity();
    background(0);
}

function draw() {
    loadPixels();
    if (mouseIsPressed) {
        for (let x=0;x<5;x++) {
            for (let y=0;y<5;y++) {
                updateCell(mouseX+x, mouseY+y, _WATER);
            }
        }
    }

    for (let y=height;y>=0;y--) {
        for (let x=0;x<width;x++) {
            if (compare(x, y, _WATER)) {
                let down = isEmpty(x, y+1);
                let left = isEmpty(x-1, y);
                let right = isEmpty(x+1, y);

                if (left && right) {
                    let rand = random(1) > 0.5;
                    left = rand ? true : false;
                    right = rand ? false : true;
                }

                if (down) {
                    setCell(x, y+1, _WATER);
                } else if (left) {
                    setCell(x-1, y, _WATER);
                } else if (right) {
                    setCell(x+1, y, _WATER);
                }

                if (down || left || right) {
                    setCell(x,y,_EMPTY);
                }

            }
        }
    }
    update();
    updatePixels();
    tmp_pixels = {};
}