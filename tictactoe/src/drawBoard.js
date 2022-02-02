import { boxesArray } from "./constants.js"

export default function drawBoard() {
    boxesArray.forEach((box, index) => {
      let border = "";
  
      if (index < 3) {
        border += "border-bottom: 5px solid;";
      }
  
      if (index % 3 === 0) {
        border += "border-right: 5px solid;";
      }
  
      if (index % 3 === 2) {
        border += "border-left: 5px solid;";
      }
  
      if (index > 5) {
        border += "border-top: 5px solid;";
      }
      box.style = border;
    });
 }
