document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const drawer = document.getElementById('drawer');
    const restaurantList = document.getElementById('restaurant-list');
    const restaurantDetail = document.getElementById('restaurant-detail');
  
    menuIcon.addEventListener('click', () => {
      drawer.classList.toggle('open');
      drawer.setAttribute('aria-hidden', !drawer.classList.contains('open'));
    });
  
    fetch('../data/DATA.json')
      .then(response => response.json())
      .then(data => {
        data.restaurants.forEach(restaurant => {
          const restaurantItem = document.createElement('div');
          restaurantItem.className = 'restaurant-item';
  
          restaurantItem.innerHTML = `
            <div class="restaurant-item__header">
              <img class="restaurant-item__header__poster" src="images/${restaurant.pictureId}" alt="${restaurant.name}">
              <div class="restaurant-item__header__rating">
                <span>⭐</span>
                <span class="restaurant-item__header__rating__score">${restaurant.rating}</span>
              </div>
            </div>
            <div class="restaurant-item__content">
              <h3><a href="#" data-id="${restaurant.id}">${restaurant.name}</a></h3>
              <p>${restaurant.description}</p>
            </div>
          `;
  
          restaurantList.appendChild(restaurantItem);
        });
  
        document.querySelectorAll('.restaurant-item__content a').forEach(link => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const restaurantId = event.target.dataset.id;
            const restaurant = data.restaurants.find(r => r.id == restaurantId);
            displayRestaurantDetail(restaurant);
          });
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    function displayRestaurantDetail(restaurant) {
      restaurantList.style.display = 'none';
      restaurantDetail.style.display = 'block';
      restaurantDetail.innerHTML = `
        <h2>${restaurant.name}</h2>
        <img src="images/${restaurant.pictureId}" alt="${restaurant.name}">
        <p>${restaurant.details}</p>
        <button id="back-button">Back to list</button>
      `;
  
      document.getElementById('back-button').addEventListener('click', () => {
        restaurantList.style.display = 'grid';
        restaurantDetail.style.display = 'none';
      });
    }
  });
  