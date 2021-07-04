
let _EMPTY = [0,0,0,255];
let _SAND = [255,150,50,255];
let d = 0;

function compare(x, y, cls) {
    let i = idx(x,y);
    return pixels[i] == cls[0] 
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
          pixels[_idx] = clr[0];
          pixels[_idx+1] = clr[1];
          pixels[_idx+2] = clr[2];
          pixels[_idx+3] = clr[3];
        }
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
                setCell(mouseX+x, mouseY+y, _SAND);
            }
        }
    }

    for (let y=height;y>=0;y--) {
        for (let x=0;x<width;x++) {
            if (compare(x, y, _SAND)) {
                let down = isEmpty(x, y+1);
                let left = isEmpty(x-1, y+1);
                let right = isEmpty(x+1, y+1);

                if (left && right) {
                    let rand = random(1) > 0.5;
                    left = rand ? true : false;
                    right = rand ? false : true;
                }

                if (down) {
                    setCell(x, y+1, _SAND);
                } else if (left) {
                    setCell(x-1, y+1, _SAND);
                } else if (right) {
                    setCell(x+1, y+1, _SAND);
                }

                if (down || left || right) {
                    setCell(x,y,_EMPTY);
                }

            }
        }
    }
    updatePixels();
}