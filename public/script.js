const emailButton = document.getElementById('fetch-email-btn')
const output = document.querySelector('.api-output')
const loadingButton = document.getElementById("loadingButton")
const outputContainer = document.getElementById("output-container")
const answerButton = document.getElementById('fetch-answer-btn')

// Function for Form page
if (emailButton) {
    emailButton.addEventListener('click', async () => {
        loadingButton.style.display = 'block'
        // loadingButton.scrollIntoView({ behavior: 'smooth' })
        const getSelectedTravel = document.querySelector('input[name="travel"]:checked')
        const getSelectedDrink = document.querySelector('input[name="drink-input"]:checked')// console.log(getSelectedMember)
        const getSelectedMeal = document.querySelector('input[name="food-option"]:checked')// console.log("Button clicked")

        const prompt = `you are a sassy and helpful bot who is incredibly knowledgeable about sustainability and how a person can reduce their carbon footprint at an event in central london. I say that I will go to this event by ${getSelectedTravel.id}, I drink from a ${getSelectedDrink.id} cup and I mainly eat a ${getSelectedMeal.id} diet. You reply to give me a carbon emissions score (in kg of CO2 emission) and some advice about how I can further reduce my environmental impact while at the event (e.g. by turning off devices when not in use and by using half flushes):`
        // console.log(prompt)
    
        const keyresp = await fetch('/.netlify/functions/get-token')
        .then(response => response.json()
        )
    
        const response = await fetch(
                `https://api.openai.com/v1/completions`,
                {
                    body: JSON.stringify({"model": "gpt-3.5-turbo-instruct", "prompt": prompt, "temperature": 0.86, "max_tokens": 800}),
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization:`Bearer ` + keyresp['message'],
                    },
                        }
            ).then((response) => {
                // console.log(text)
                if (response.ok) {
                    response.json().then((json) => {
                        output.textContent = json.choices[0].text.trim();
                    });
                }
                
                outputContainer.style.display = 'block';
                loadingButton.style.display = 'none';
                // outputContainer.scrollIntoView({ behavior: 'smooth' })
            });
    
            // console.log("Completed!");
    
        });
}

// Function for Chatbot page
if (answerButton) {
    answerButton.addEventListener('click', async () => {
        loadingButton.style.display = 'block'
        const questionText = document.getElementById("questionForm").value
        const prompt = `you are a sassy but helpful bot who is incredibly knowledgeable about sustainability and how a person can reduce their carbon footprint. I ask you ${questionText}. You reply:`
    
        const keyresp = await fetch('/.netlify/functions/get-token')
        .then(response => response.json()
        )
    
        const response = await fetch(
                `https://api.openai.com/v1/completions`,
                {
                    body: JSON.stringify({"model": "gpt-3.5-turbo-instruct", "prompt": prompt, "temperature": 0.86, "max_tokens": 800}),
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization:`Bearer ` + keyresp['message'],
                    },
                        }
            ).then((response) => {
                // console.log(text)
                if (response.ok) {
                    response.json().then((json) => {
                        output.textContent = json.choices[0].text.trim();
                    });
                }
                
                outputContainer.style.display = 'block';
                loadingButton.style.display = 'none';
                // outputContainer.scrollIntoView({ behavior: 'smooth' })
            });
    
            // console.log("Completed!");
    
        });
}