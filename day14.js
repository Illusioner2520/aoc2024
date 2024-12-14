//let l = ["p=0,4 v=3,-3","p=6,3 v=-1,-3","p=10,3 v=-1,2","p=2,0 v=2,-1","p=0,0 v=1,3","p=3,0 v=-2,-2","p=7,6 v=-1,-3","p=3,0 v=-1,-2","p=9,3 v=2,3","p=7,3 v=-1,2","p=2,4 v=2,-3","p=9,5 v=-3,-3"]
function part1(l) {
    let q = [0, 0, 0, 0]
    for (let i of l) {
        let nums = i.match(/[-\d]+/g)
        let x = (nums[0] - 0 + (nums[2] * 100) + 101000) % 101
        let y = (nums[1] - 0 + (nums[3] * 100) + 103000) % 103
        if (x > 50) {
            if (y > 51) q[0]++;
            if (y < 51) q[1]++;
        }
        if (x < 50) {
            if (y > 51) q[2]++;
            if (y < 51) q[3]++;
        }
    }
    return q[0] * q[1] * q[2] * q[3];
}
function part2(l) {
    //for part two, i just generated a picture of each of the variations. added them to an html screen and searched for the christmas tree myself
    //part two does need a DOM, so connect an HTML page to it
    //sample HTML page:
    //<!DOCTYPE html>
    //<html>
    //  <body>
    //      <script src="day14.js"></script>
    //  </body>
    //</html>
    for (let i = 1; i < 8000; i++) {
        let url = generateBoard(l, i);
        let img = document.createElement("img");
        img.src = url;
        img.title = i;
        document.getElementsByTagName('body')[0].appendChild(img)
    }
}
function generateBoard(l, seconds) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 103;
    canvas.height = 101;
    for (let i of l) {
        let nums = i.match(/[-\d]+/g)
        let x = (nums[0] - 0 + (nums[2] * seconds) + 1010000) % 101
        let y = (nums[1] - 0 + (nums[3] * seconds) + 1030000) % 103
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, 1, 1);
    }
    const dataURL = canvas.toDataURL()
    return dataURL;
}
