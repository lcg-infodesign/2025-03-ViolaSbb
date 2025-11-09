let data;
let minLat, minLon, maxLat, maxLon;

function preload() {
  data = loadTable("data/volcanoes-2025-10-27.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // sketch responsive, larghezza e altezza pari alla finestra del web
  console.log("i miei dati:", data); // per controllare che carica correttamente il dataset
  //devo creare dei glifi che si posizionino seguendo longitudine e latitudine
  let allLat = data.getColumn("Latitude").map(Number);
  let allLon = data.getColumn("Longitude").map(Number); //specifico che sto ricavando dei numeri

  //definisco min e max
  minLat = min(allLat);
  maxLat = max(allLat);
  minLon = min(allLon);
  maxLon = max(allLon);
}

function draw() {
  background(10);

  //disegno un glifo PER ogni dato (cliclo fot)
  for (let row = 0; row < data.getRowCount(); row++) { //(variabile; fino a quando continua il ciclo; cosa cambia a ogni ciclo) //row = variabile contenitore per la riga del dataset
    //"ricava lat, lon, paese"
    let lat = data.getNum(row, "Latitude");
    let lon = data.getNum(row, "Longitude");
    let name = data.getString(row, "Country"); //string xké è un nome
    //"posiziona le coordinate"
    let x = map(lon, minLon, maxLon, 0, width); //valore da mappare, min, massimo, inizio intervallo, fine intervallo
    let y = map(lat, minLat, maxLat, height, 0); //metto prima height perchè vado da 90 a -90 rispetto alla Terra
    let radius = 10;   //CALCOLIAMOLO CON I DATI POI

    //fare qualcosa in hover con il mouse:
    //sui cerchi è facile (su rettangolo molto difficile, su forma irregoli impossibile praticamente)
    //come faccio? calcolo distanza dal centro del cerchio alla punta del mouse: se distanza è minimo del raggio mouse si trova dentro al cerchio, se è maggiore è fuori
    let d = dist(x, y, mouseX, mouseY); //posizione del mouse
    if (d < radius) {   //se pozione è minore del raggio (quindi è dentro raggio pallino)
      fill("red");
      push();
      fill("white"); //metto testo esplicativo
      text(name, x, y);
      pop();
    } else {  //altrimenti
      fill("yellow");
    }
    ellipse(x, y, radius * 2); // disegno il cerchio in base a sopra
  }
}

