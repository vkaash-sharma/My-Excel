// storage 

let sheetDB = [];
for(let i = 0 ; i < rows ; i++)
{
      let sheetRow = [] ;
    for(let j = 0 ; j < cols ; j++){
      let cellProp = {
          bold : false ,
          italics : false ,
          underline : false ,
          alignment : "left" ,
          fontFamily : "monospace" ,
          fontSize : "14" ,
          fontColor : "#000000" ,
          BGcolor :"#000000",   // just for indication purpose
          value : "",
          formula : "",
          children : [] ,
        }
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

// selectors for cell properties 
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// application of two way binding 
// attach property listeners
bold.addEventListener("click" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =activecell(address);

    // modification
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;


})

// FOR ITALICS

italic.addEventListener("click" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =activecell(address);

    // modification
  cellProp.italic= !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;


})

// for underline

underline.addEventListener("click" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =activecell(address);

    // modification
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;


})

fontSize.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =activecell(address);
 
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})
fontFamily.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =activecell(address);
 
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =activecell(address);
 
    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

BGcolor.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =activecell(address);
 
    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})

alignment.forEach((alignElem) => {
  alignElem.addEventListener("click" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =activecell(address);
 
     let alignValue = e.target.classList[0];
     cellProp.alignment = alignValue;
     cell.style.textAlign = cellProp.alignment;
     switch(alignValue){
        case "left" :
             leftAlign.style.backgroundColor = activeColorProp;
             centerAlign.style.backgroundColor = inactiveColorProp;
             rightAlign.style.backgroundColor = inactiveColorProp;
             break;
         
        case "center" :
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = activeColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
             break;
        case "right" :
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = activeColorProp;
               break
     }
  })

})

let allCells = document.querySelectorAll(".cell");
for(let i = 0 ; i < allCells.length ; i++){
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){
    cell.addEventListener("click" , (e) => {

     let address = addressBar.value;
     let [rid , cid] = decodeRIDCIDFromAddress(address);
     let cellProp = sheetDB[rid][cid]; 
        // apply cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;





        // applying properties ui props container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment){
            case "left" :
                 leftAlign.style.backgroundColor = activeColorProp;
                 centerAlign.style.backgroundColor = inactiveColorProp;
                 rightAlign.style.backgroundColor = inactiveColorProp;
                 break;
             
            case "center" :
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                 break;
            case "right" :
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                   break
         }



    })
}



function getCellAndCellProp(address) {
   let [rid , cid] = decodeRIDCIDFromAddress(address);
//    access cell & storage object
   let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`); 
   let cellProp = sheetDB[rid][cid];
   return [cell  , cellProp];
}

function decodeRIDCIDFromAddress(address){
    // address -> "A1"
    let rid = Number(address.slice(1) - 1);
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid , cid];
}

