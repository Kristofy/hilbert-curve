
function setup(){
    let C = createCanvas(800, 800);
    C.parent('parent');

}

function drawHilbertCurve(level){
    let points = [];
    background(51);
    strokeWeight(2);
    stroke(0);
    textAlign(CENTER, CENTER);
    let pontok_szama = pow(2, level);
    let colsize = width / pontok_szama;
    let rowsize = height / pontok_szama;
    fill(0);
    for(let i = 0; i < pontok_szama; i++){
        line(0, i*rowsize, width, i*rowsize);
        line(i*colsize, 0 ,i*colsize, height);
    }
    window.rowsize = rowsize;
    console.log("pontok szama: "+pontok_szama);
    for (let px = 0; px < pontok_szama; px++)
    {
        for(let py = 0; py < pontok_szama; py++){
            
            let x = px;
            let y = py;
            let lastx = floor(x / (1 << (level-1)));
            let lasty = floor(y / (1 << (level-1)));
            let path = char(pos(lastx,lasty, "1")+48);
            x -= (1 << (level-1))*(lastx);
            y -= (1 << (level-1))*(lasty);
            
            for(let k = 2; k <= level; k++){
              lastx = floor(x / (1 << (level-k)));
              lasty = floor(y / (1 << (level-k)));
              path += char(pos(lastx,lasty, path)+48);
              x -= (1 << (level-k))*(lastx);
              y -= (1 << (level-k))*(lasty);
    
             }
            // fill(255);
            // text(path, px*colsize, height - rowsize*py -   colsize, colsize, rowsize);
            points.push({path:path, point:{x:px*colsize + colsize/2, y: height - py*rowsize - rowsize/2}});

        }

    }

    points.sort((a,b)=>a.path.localeCompare(b.path));
    strokeWeight(rowsize/3);
    stroke(255,165,0);
    for (let i = 1; i < points.length; i++) {
       line(points[i-1].point.x, points[i-1].point.y, points[i].point.x, points[i].point.y);
    }
    window.points = points;

}

function pos(x, y, path) {
    let bal = 0, jobb = 0;
    for(let i= 0; i< path.length; i++){
        if(path[i]=='0'){
            jobb++;
        }
        if(path[i]=='3'){
            bal++;
        }
    }
       
    jobb&=1;
    bal&=1;
    
 /// ha nincs tükrözés
    if((bal|jobb)==0){
      if (x & y)return 2;
      if (y) return 1;
      if (x) return 3;
      return 0;
    }
    
/// ha 0, 2 és 1, 3 tükrözés   
    if(bal&jobb){
      if (x & y)return 0;
      if (y) return 3;
      if (x) return 1;
      return 2;
    }
    
/// ha 0 és 2 tükrözés
    if(bal){
        if (x & y)return 0;
        if (y) return 1;
        if (x) return 3;
        return 2;
    }

/// 1 és 3 tükrözés
      if (x & y)return 2;
      if (y) return 3;
      if (x) return 1;
      return 0;

    
}



