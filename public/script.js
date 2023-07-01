const emailButton = document.getElementById('fetch-email-btn')
const output = document.querySelector('.api-output')
const loadingButton = document.getElementById("loadingButton")
const outputContainer = document.getElementById("output-container")

// Function for EmailGenie page
if (emailButton) {
    emailButton.addEventListener('click', async () => {
        loadingButton.style.display = 'block'
        loadingButton.scrollIntoView({ behavior: 'smooth' })
        // const getSelectedMember = document.querySelector('input[name="communityMembers"]:checked')
        // console.log(getSelectedMember)
        // console.log("Button clicked")
        // const text = document.getElementById("textareaspace").value
        // console.log(text)
        const prompt = `you are a helpful and positive bot with a friendly tone who gives information about a user's carbon footprint at an event in central london. I say that I walked to this event, and brought a reusable coffee cup with me and am a vegetarian. You reply to give me a carbon score (out of 10) and some advice about how I can further reduce my environmental impact while at the event (e.g. by turning off devices when not in use and by using half flushes):`
        // console.log(prompt)
    
        const keyresp = await fetch('/.netlify/functions/get-token')
        .then(response => response.json()
        )
    
        const response = await fetch(
                `https://api.openai.com/v1/completions`,
                {
                    body: JSON.stringify({"model": "text-davinci-003", "prompt": prompt, "temperature": 0.86, "max_tokens": 200}),
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