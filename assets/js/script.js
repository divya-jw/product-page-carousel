/* Script for Carousel Product 
page */

let product = [];  
let i = 0;        

function initial() {
    fetchImages();  
}

async function fetchImages() {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
        const data = await response.json();

        product = data.map(item => item.download_url);

        document.getElementById("main-image").src = product[i];

        const thumbnailsContainer = document.getElementById("thumbnails-container");
        thumbnailsContainer.innerHTML = ''; 

        product.forEach((url, index) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = url;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.classList.add("thumbnail");
            thumbnail.onclick = function() {
                changeMainImage(index);
            };
            thumbnailsContainer.appendChild(thumbnail);
        });

    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function changeMainImage(index) {
    i = index;
    document.getElementById("main-image").src = product[i];
}

function next() {
    if (i === product.length - 1) {
        i = 0;
    } else {
        i++;
    }
    document.getElementById("main-image").src = product[i];
}

function previous() {
    if (i === 0) {
        i = product.length - 1;
    } else {
        i--;
    }
    document.getElementById("main-image").src = product[i];
}

function addToCart() {

    const quantity = document.getElementById('quantity').value;
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.innerHTML = `${quantity} product(s) added to your cart successfully.`;
    confirmationMessage.style.display = 'block';

    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000); 
}