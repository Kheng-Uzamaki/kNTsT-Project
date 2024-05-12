import bestSale from '/bestSale.js';
import newArrival from './newArrival.js';





const bar = document.getElementById("bar");
const close = document.getElementById("close");

const nav = document.getElementById("navbar");

if(bar){
    bar.addEventListener("click", ()=>{
        nav.classList.add("active");
    })
}
if(close){
    close.addEventListener("click", ()=>{
        nav.classList.remove("active");
    })
}

const showBestSale = () =>{
    //Display BestSale Products

    let proContainer = document.querySelector('.pro-container');
    proContainer.innerHTML = null;

    bestSale.forEach(p =>{
        let newP = document.createElement('div');
        newP.classList.add('pro');
        newP.innerHTML = `
        <img src="${p.img}" />
          <div class="des">
            <span>Best</span>
            <h5>${p.name}</h5>
            <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <h4>$${p.price}</h4>
          </div>
          <a href="#" class="new">Best Sale!!</a>
          
        `;
        proContainer.appendChild(newP);
    });
}
showBestSale();
const showNewArrival = () =>{
    //Display NewArrival Products
    let proContainer = document.querySelector('.Npro-container');
    proContainer.innerHTML = null;

    newArrival.forEach(p =>{
        let newP = document.createElement('div');
        newP.classList.add('Npro');
        newP.innerHTML = `
        <img src="${p.img}" />
          <div class="des">
            <span>Best</span>
            <h5>${p.name}</h5>
            <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <h4>$${p.price}</h4>
          </div>
          <a href="#" class="new">New Arrival</a>
        `;
        proContainer.appendChild(newP);
    });
}
showNewArrival();