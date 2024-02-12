'use strict'

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Ready');
});

        const getApi= async (apiUrl) => {

            try {
                const result = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'User-Agent': 'KyraIsHere/3.0', 
                    },
                });
                const data = await result.json();
                return data;

            } catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        };


const divContain = document.createElement('div');
const body = document.querySelector('body');
body.appendChild(divContain);
const title = document.createElement('h1');
title.textContent= 'Find Your Flight';
divContain.appendChild(title); 

const flightForm = document.createElement('fieldset');
divContain.appendChild(flightForm);
const formTitle = document.createElement('legend');
formTitle.textContent = 'Flight Information';
flightForm.appendChild(formTitle);

const resultContain = document.createElement('div');
divContain.insertAdjacentElement('afterend', resultContain);

    const addInput = ((formElement, labelTxt, placeholderTxt, type) => {
        const label = document.createElement('label');
        label.textContent = labelTxt;

        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholderTxt;
        
        formElement.appendChild(label);
        formElement.appendChild(input);

        return input;
    });

const airlineInput = addInput(flightForm, 'Airline:', 'Name Airlines', 'text');
const flightNumInput = addInput(flightForm, 'Flight Number:', 'between 541-543', 'number');
flightNumInput.min = 501;
flightNumInput.max = 543;

const submitBttn = document.createElement('button');
submitBttn.type = 'submit', submitBttn.textContent= 'SUBMIT';
flightForm.appendChild(submitBttn);

    submitBttn.addEventListener('click', async (event) => { 
        event.preventDefault();
        const result = await getApi('/flight.json'); //get array
        console.log(result);

        const airlineValue = airlineInput.value.trim();
        const flightNum = parseInt(flightNumInput.value);

        const resultAirlines = result.map(flight => flight.airline); //verify airline input

            if (!resultAirlines.includes(airlineValue)) {
                window.alert(`Airline ${airlineValue} is not available. Please enter one of the following ${resultAirlines}`);
                return;
            } 
                if (flightNum < 501 || flightNum > 543) {
                    window.alert('Flight number should be between 501 and 543.');
                    return;

                } 

        const matchingFlights = result.filter(flight => flight.airline === airlineValue && flight.flight_number === Number(flightNum));

                    if (matchingFlights.length === 0) {
                        window.alert(`No flights found for airline ${airlineValue} with flight number ${flightNum}.`);
                        return;
                }
        

            const displayFlight = matchingFlights.map(flight => {
                return Object.entries(flight).map(([key, value]) => { 
                    key = key.replace(/_/g, ' '); // Replace underscores with spaces
                    key = key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize each word 
                    return `<b>${key}:</b> ${value}`; //make key bold
                }).join('<br>'); //join with line breaks
            });
            
            const infoList = document.createElement('p')
            divContain.appendChild(infoList);
            infoList.innerHTML = ('Flight Information:', displayFlight);


    });





