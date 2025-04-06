document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("country-input");
    const addBtn = document.getElementById("search-button");
    const errorMessage = document.getElementById("error-message");
    const container = document.getElementById("country-container");

    addBtn.addEventListener('click', () => {
        const countryName = input.value.trim();
        if (!countryName) return;

        const existingInfo = document.querySelector(".country-info");
        if (existingInfo) existingInfo.remove();

        errorMessage.style.display = "none"; // Hide error if visible

        fetchCountryData(countryName);
    });

    async function fetchCountryData(name) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
            if (!response.ok) {
                throw new Error("Country not found");
            }

            const data = await response.json();
            displayData(data);
        } catch (error) {
            errorMessage.style.display = "block"; // Show error message
            console.error("Error fetching country data:", error);
        }
    }

    function displayData(data) {
        const { name, flags, capital, currencies } = data[0];
        const currencyData = Object.values(currencies)[0];

        const div = document.createElement('div');
        div.setAttribute("class", "country-info");

        const image = document.createElement("img");
        image.setAttribute("src", flags.png);
        div.appendChild(image);

        const CountryName = document.createElement("h2");
        CountryName.innerHTML = `${name.common}`;
        div.appendChild(CountryName);

        const Capital = document.createElement("p");
        Capital.innerHTML = `<strong>Capital</strong>: ${capital[0]}`;
        div.appendChild(Capital);

        const currency = document.createElement("p");
        currency.innerHTML = `<strong>Currency</strong>: ${currencyData.symbol} ${currencyData.name}`;
        div.appendChild(currency);

        container.appendChild(div);
    }
});
