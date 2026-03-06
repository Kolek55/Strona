// Dane samochodów
const carsData = [
    {
        id: 1,
        name: 'Porsche 911 Turbo',
        category: 'sport',
        price: '850 000 zł',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
        engine: '3.8L Twin-Turbo',
        power: '580 KM',
        acceleration: '2.8s',
        topSpeed: '330 km/h',
        fuel: 'Benzyna',
        year: 2024,
        description: 'Legendarny samochód sportowy łączący osiągi z codzienną użytecznością.'
    },
    {
        id: 2,
        name: 'BMW X5',
        category: 'suv',
        price: '450 000 zł',
        image: 'https://images.unsplash.com/photo-1555215858-9dc80cd643be?w=400',
        engine: '3.0L TwinPower',
        power: '340 KM',
        acceleration: '5.5s',
        topSpeed: '250 km/h',
        fuel: 'Diesel',
        year: 2024,
        description: 'Luksusowy SUV oferujący przestronność i dynamikę jazdy.'
    },
    {
        id: 3,
        name: 'Tesla Model S',
        category: 'electric',
        price: '520 000 zł',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
        engine: 'Elektryczny',
        power: '670 KM',
        acceleration: '3.2s',
        topSpeed: '250 km/h',
        fuel: 'Elektryczny',
        year: 2024,
        description: 'Pionierski samochód elektryczny z autopilottem i zasięgiem 650km.'
    },
    {
        id: 4,
        name: 'Ferrari F8 Tributo',
        category: 'sport',
        price: '1 200 000 zł',
        image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400',
        engine: '3.9L V8 Twin-Turbo',
        power: '720 KM',
        acceleration: '2.9s',
        topSpeed: '340 km/h',
        fuel: 'Benzyna',
        year: 2024,
        description: 'Włoskie arcydzieło inżynierii z duszą wyścigową.'
    },
    {
        id: 5,
        name: 'Mercedes G-Class',
        category: 'suv',
        price: '680 000 zł',
        image: 'https://images.unsplash.com/photo-1519641766812-4d237b65bbf5?w=400',
        engine: '4.0L V8 Biturbo',
        power: '585 KM',
        acceleration: '4.5s',
        topSpeed: '240 km/h',
        fuel: 'Benzyna',
        year: 2024,
        description: 'Ikona terenówek w luksusowym wydaniu.'
    },
    {
        id: 6,
        name: 'Audi e-tron GT',
        category: 'electric',
        price: '580 000 zł',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2b786a0bd6?w=400',
        engine: 'Dual Motor',
        power: '590 KM',
        acceleration: '3.3s',
        topSpeed: '245 km/h',
        fuel: 'Elektryczny',
        year: 2024,
        description: 'Elektryczne Gran Turismo z quattro i zasięgiem 500km.'
    }
];

// Stan aplikacji
let currentFilter = 'all';
let compareSlots = [null, null];

// Inicjalizacja
document.addEventListener('DOMContentLoaded', function() {
    renderCars(carsData);
    setupEventListeners();
});

// Funkcja renderująca samochody
function renderCars(cars) {
    const carsGrid = document.getElementById('carsGrid');
    carsGrid.innerHTML = '';
    
    cars.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.style.animationDelay = `${index * 0.1}s`;
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-info">
                <h3 class="car-name">${car.name}</h3>
                <p class="car-price">${car.price}</p>
                <div class="car-specs">
                    <span class="spec-badge">⚡ ${car.power}</span>
                    <span class="spec-badge">🏁 ${car.acceleration}</span>
                    <span class="spec-badge">⛽ ${car.fuel}</span>
                </div>
                <div class="card-buttons">
                    <button class="btn btn-details" onclick="showCarDetails(${car.id})">
                        Szczegóły
                    </button>
                    <button class="btn btn-compare" onclick="addToCompare(${car.id})">
                        Porównaj
                    </button>
                </div>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });
}

// Filtrowanie samochodów
function filterCars(category) {
    currentFilter = category;
    
    // Aktualizacja aktywnego przycisku
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filtrowanie
    let filteredCars = category === 'all' 
        ? carsData 
        : carsData.filter(car => car.category === category);
    
    renderCars(filteredCars);
}

// Pokazywanie szczegółów samochodu
function showCarDetails(carId) {
    const car = carsData.find(c => c.id === carId);
    const modal = document.getElementById('carModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <img src="${car.image}" alt="${car.name}" style="width: 100%; border-radius: 10px;">
            </div>
            <div>
                <h2 style="color: var(--secondary-color); margin-bottom: 1rem;">${car.name}</h2>
                <p style="font-size: 1.5rem; color: var(--primary-color); margin-bottom: 1rem;">${car.price}</p>
                <p style="margin-bottom: 2rem;">${car.description}</p>
                
                <h3 style="margin-bottom: 1rem;">Specyfikacja techniczna:</h3>
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 8px;"><strong>Silnik:</strong></td>
                        <td>${car.engine}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Moc:</strong></td>
                        <td>${car.power}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>0-100 km/h:</strong></td>
                        <td>${car.acceleration}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Prędkość max:</strong></td>
                        <td>${car.topSpeed}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Paliwo:</strong></td>
                        <td>${car.fuel}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Rocznik:</strong></td>
                        <td>${car.year}</td>
                    </tr>
                </table>
                
                <button onclick="requestTestDrive(${car.id})" style="
                    margin-top: 2rem;
                    padding: 12px 30px;
                    background: var(--accent-color);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1.1rem;
                ">
                    Umów jazdę próbną
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Zamykanie modala
function closeModal() {
    document.getElementById('carModal').style.display = 'none';
}

// Dodawanie do porównywarki
function addToCompare(carId) {
    const car = carsData.find(c => c.id === carId);
    
    if (compareSlots[0] && compareSlots[0].id === carId || 
        compareSlots[1] && compareSlots[1].id === carId) {
        alert('Ten samochód jest już w porównywarce!');
        return;
    }
    
    if (!compareSlots[0]) {
        compareSlots[0] = car;
        updateCompareSlot(1, car);
    } else if (!compareSlots[1]) {
        compareSlots[1] = car;
        updateCompareSlot(2, car);
    } else {
        alert('Porównywarka jest pełna! Wyczyść ją aby dodać nowy samochód.');
    }
}

// Aktualizacja slotu porównywarki
function updateCompareSlot(slotNumber, car) {
    const slot = document.getElementById(`compareSlot${slotNumber}`);
    const content = slot.querySelector('.compare-content');
    
    content.innerHTML = `
        <img src="${car.image}" alt="${car.name}" style="width: 100%; border-radius: 10px; margin-bottom: 1rem;">
        <h4>${car.name}</h4>
        <p style="color: var(--primary-color); font-weight: bold;">${car.price}</p>
        <div style="text-align: left; margin-top: 1rem;">
            <p>⚡ Moc: ${car.power}</p>
            <p>🏁 0-100: ${car.acceleration}</p>
            <p>🚀 V-max: ${car.topSpeed}</p>
            <p>⛽ Paliwo: ${car.fuel}</p>
        </div>
    `;
}

// Czyszczenie porównywarki
function clearComparison() {
    compareSlots = [null, null];
    document.querySelectorAll('.compare-content').forEach(content => {
        content.innerHTML = '';
    });
}

// Kalkulator spalania
function calculateFuel() {
    const distance = parseFloat(document.getElementById('distance').value);
    const fuel = parseFloat(document.getElementById('fuel').value);
    const price = parseFloat(document.getElementById('price').value);
    const resultDiv = document.getElementById('result');
    
    if (!distance || !fuel) {
        resultDiv.innerHTML = `
            <p style="color: var(--primary-color);">⚠️ Wypełnij wymagane pola!</p>
        `;
        return;
    }
    
    const consumption = (fuel / distance * 100).toFixed(2);
    const costPerKm = price ? (fuel * price / distance).toFixed(2) : null;
    const totalCost = price ? (fuel * price).toFixed(2) : null;
    
    resultDiv.innerHTML = `
        <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Wyniki:</h3>
        <p>⛽ <strong>Średnie spalanie:</strong> ${consumption} L/100km</p>
        ${costPerKm ? `<p>💰 <strong>Koszt na kilometr:</strong> ${costPerKm} zł/km</p>` : ''}
        ${totalCost ? `<p>💵 <strong>Całkowity koszt podróży:</strong> ${totalCost} zł</p>` : ''}
        <div style="margin-top: 1rem; padding: 10px; background: ${consumption < 7 ? '#27ae60' : consumption < 10 ? '#f39c12' : '#e74c3c'}; color: white; border-radius: 5px;">
            ${consumption < 7 ? '🌟 Świetna ekonomia!' : consumption < 10 ? '👍 Przyzwoite spalanie' : '⚠️ Wysokie spalanie'}
        </div>
    `;
}

// Przewijanie do galerii
function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// Prośba o jazdę próbną
function requestTestDrive(carId) {
    const car = carsData.find(c => c.id === carId);
    alert(`✅ Dziękujemy! Skontaktujemy się w sprawie jazdy próbnej ${car.name}`);
}

// Event listeners
function setupEventListeners() {
    // Zamykanie modala po kliknięciu poza nim
    window.onclick = function(event) {
        const modal = document.getElementById('carModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // Hamburger menu (przykładowa funkcjonalność)
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', function() {
        alert('Menu mobilne - do implementacji');
    });
    
    // Smooth scroll dla linków nawigacyjnych
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Funkcja do losowego generowania danych testowych (opcjonalna)
function generateRandomStats() {
    const stats = {
        views: Math.floor(Math.random() * 10000) + 1000,
        likes: Math.floor(Math.random() * 1000) + 100,
        testDrives: Math.floor(Math.random() * 100) + 10
    };
    
    console.log('📊 Statystyki strony:', stats);
    return stats;
}

// Animacja liczników (opcjonalna)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// localStorage - zapisywanie ulubionych (opcjonalne)
function saveFavorite(carId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(carId)) {
        favorites.push(carId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('❤️ Dodano do ulubionych:', carId);
    }
}

// Inicjalizacja dodatkowych funkcji
console.log('🏎️ AutoPassion - Portal motoryzacyjny załadowany!');
