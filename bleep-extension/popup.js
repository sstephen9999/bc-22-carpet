document.getElementById('prompt-ask').addEventListener('click', async () => {
    try {
        const prompt = document.getElementById('prompt-input').value;

        const response = await fetch("https://bc-22-carpet.vercel.app/api/hateSpeechChatBot", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Allow-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                prompt
            })
        })

        console.log(response)

        const data = await response.json();

        document.getElementById('prompt-output').value = data.text;
    } catch (err) {
        console.log(err)
    }



});