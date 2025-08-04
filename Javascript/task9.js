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
let totalBubbles = 40;

for (let i = 0; i < totalBubbles; i++) {
  createBubble();
}

function createBubble() {
  let bubble = document.createElement("div");
  bubble.className = "bubble";

  // Random size between 10px to 40px
  let size = 10 + Math.random() * 30;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Random horizontal position within the screen
  let x = Math.random() * (window.innerWidth - size);
  // Start slightly below the screen
  let y = window.innerHeight + Math.random() * 100;
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;

  contain.appendChild(bubble);

  let speed = 0.5 + Math.random(); // random upward speed
  let paused = false;

  // Pause when mouse enters
  bubble.addEventListener("mouseenter", () => {
    paused = true;
  });

  // Resume when mouse leaves
  bubble.addEventListener("mouseleave", () => {
    paused = false;
  });

  function animate() {
    if (!paused) {
      y -= speed;
      bubble.style.top = `${y}px`;
    }

    if (y < -50) {
      bubble.remove();
      createBubble(); // create a new one at bottom
    } else {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

