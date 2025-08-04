// const container = document.getElementById("bubble-container");
// const totalBubbles = 25;

// for (let i = 0; i < totalBubbles; i++) {
//   createBubble();
// }

// function createBubble() {
//   const bubble = document.createElement("div");
//   bubble.className = "bubble";

//   // Random size
//   const size = 10 + Math.random() * 30;
//   bubble.style.width = `${size}px`;
//   bubble.style.height = `${size}px`;

//   // Random position and start at bottom
//   const startX = Math.random() * (window.innerWidth - size);
//   let y = window.innerHeight + Math.random() * 100;
//   bubble.style.left = `${startX}px`;
//   bubble.style.top = `${y}px`;

//   container.appendChild(bubble);

//   // Bubble movement
//   const speed = 0.5 + Math.random(); // slower to medium speed

//   function animate() {
//     y -= speed;
//     bubble.style.top = `${y}px`;

//     if (y < -50) {
//       bubble.remove();
//       createBubble();
//     } else {
//       requestAnimationFrame(animate);
//     }
//   }

//   animate();
// }
// let contain = document.getElementById("bubble-container");
// let totalbubbles=10;
// for(let i=0;i<totalbubbles; i++){
//     createBubble();
// }
// function createBubble() {
//     let bubble=document.createElement("div");
//     bubble.classname="bubble";
//     let size =Math.random();
//     size = 10 + size * 30; 
//     bubble.style.width= `${size}px`;
//     bubble.style.height= `${size}px`;
//     let X= Math.random() * (window.innerWidth - size);
//     let y = window.innerHeight + Math.random() * 100; 
//     bubble.style.left = `${X}px`;
//     bubble.style.top = `${y}px`;
// contain.appendChild(bubble);
//  let speed = 0.5 + Math.random(); 
//  function animate() {
// y-= speed;
// bubble.style.top = `${y}px`;
// if (y < -50) {
//       bubble.remove();
//       createBubble();
//     }
//     else {
//         requestAnimationFrame(animate);
 
//     }
// }

// animate();}

let contain = document.getElementById("bubble-container");
let totalBubbles = 50;

for (let i = 0; i < totalBubbles; i++) {
  createBubble();
}

function createBubble() {
  let bubble = document.createElement("div");
  bubble.className = "bubble"; // ❌ You wrote .classname, correct is .className

  let size = 10 + Math.random() * 30; // Bubble size between 10 and 40px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  let x = Math.random() * (window.innerWidth - size); // Random X within screen width
  let y = window.innerHeight + Math.random() * 100;    // Start below bottom

  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
 
  contain.appendChild(bubble);

  let speed = 0.5 + Math.random(); // Bubble rise speed

  function animate() {
    y -= speed;
    bubble.style.top = `${y}px`;

    if (y < -50) {
      bubble.remove();
      createBubble(); // Replace with a new one
    } else {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
