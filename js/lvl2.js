'use strict'

document.addEventListener('DOMContentLoaded', () => {
    console.log('LVL 2 DOM Ready');
});

const titleTwo = document.createElement('h1');
titleTwo.textContent= 'Information Board';
resultContain.appendChild(titleTwo);


const searchForm = document.createElement('fieldset');
divContain.insertAdjacentElement('afterend', searchForm);
const searchTitle = document.createElement('legend');
searchTitle.textContent= 'Filter By Included Information';
searchForm.appendChild(searchTitle);


const searchInput = addInput (searchForm, 'Search Criteria:', 'anything included in array', 'text');
searchInput.classList.add('searchInput');

const searchBttn = document.createElement('button');
searchBttn.type = 'submit', searchBttn.textContent= 'SEARCH';
searchForm.appendChild(searchBttn);

searchBttn.addEventListener('click', async (event) => { 
    event.preventDefault();
    const result = await getApi('/flight.json');
    console.log(result);
    const numberPattern = /^\d+$/;
    const searchVal =searchInput.value.trim();
    console.log(searchVal);

    const resultKeys = result.flatMap(flight => Object.keys(flight).map(key => flight[key]));

        if (numberPattern.test(searchVal)) { 
        console.log('Input contains only numbers:', searchVal);
        const searchValNumber = parseInt(searchVal); //convert to integer
        

            if (searchValNumber < 501 || searchValNumber > 543) {
                window.alert('Flight number should be between 501 and 543.');
                return;
            } 
        }

    const matchedResultString = result.filter(flight => Object.values(flight).includes(searchVal));

    const matchedResultNum =  result.filter(flight => flight.flight_number === parseInt(searchVal));

    const resultArray = result.filter(flight => {
        if (typeof searchVal === 'number') {
            return flight.flight_number === parseInt(searchVal)
        } else {
            return Object.values(flight).includes(searchVal)
        }
    })
        console.log('returned array', resultArray);

        if (matchedResultString.length  && matchedResultNum === 0) {
            window.alert(`Airline ${searchVal} is not available. Please enter a value for one of the following ${resultKeys}`);
            // No matching results found
        } else {

            console.log(matchedResultString);
            console.log(matchedResultNum); 
            let combinedDisplay = matchedResultNum;
            if (matchedResultString.length !== 0 ) {
                combinedDisplay = matchedResultString;
            }

            console.log('combined', combinedDisplay);
            const formattedText = combinedDisplay.map(flight => {
                console.log('flight', flight);
                return Object.entries(flight).map(([key, value]) => { 
                    key = key.replace(/_/g, ' '); // Replace underscores with spaces
                    key = key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize each word 
                    return `<b>${key}:</b> ${value}`; // Make key bold
                }).join('<br>'); // Join with line breaks
            }).join('<br><br>'); // Join flights with double line breaks

            const paraDisplay = document.createElement('p');
            paraDisplay.innerHTML= formattedText;
            searchForm.insertAdjacentElement('afterend', paraDisplay);

        }

});




    


