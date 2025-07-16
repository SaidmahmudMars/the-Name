        async function fetchNationality() {
            const name = document.getElementById('nameInput').value.trim();
            if (!name) {
                alert('Iltimos, ism kiriting!');
                return;
            }

            try {
                const response = await fetch(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`);
                const data = await response.json();
                
                if (data.country && data.country.length > 0) {
                    displayResults(data);
                } else {
                    document.getElementById('resultContainer').style.display = 'none';
                    alert('Ushbu ism uchun ma\'lumot topilmadi');
                }
            } catch (error) {
                console.error('Xatolik yuz berdi:', error);
                alert('API so\'rovida xatolik yuz berdi');
            }
        }

        function displayResults(data) {
            document.getElementById('nameResult').textContent = data.name;
            const countriesList = document.getElementById('countriesList');
            countriesList.innerHTML = '';
            
            data.country.forEach(country => {
                const countryDiv = document.createElement('div');
                countryDiv.className = 'country';
                
                const flagImg = document.createElement('img');
                flagImg.className = 'flag';
                flagImg.src = `https://flagsapi.com/${country.country_id}/flat/64.png`;
                flagImg.alt = `${country.country_id} bayrog'i`;
                flagImg.title = `Mamlakat kodi: ${country.country_id}`;
                
                const progressContainer = document.createElement('div');
                progressContainer.className = 'progress-container';
                
                const probability = (country.probability * 100).toFixed(1);
                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.style.width = `${probability}%`;
                progressBar.textContent = `${probability}%`;
                
                progressContainer.appendChild(progressBar);
                countryDiv.appendChild(flagImg);
                countryDiv.appendChild(progressContainer);
                
                countriesList.appendChild(countryDiv);
            });
            
            document.getElementById('resultContainer').style.display = 'block';
        }

        // Dastlabki so'rovni avtomatik bajaramiz
        window.onload = fetchNationality;