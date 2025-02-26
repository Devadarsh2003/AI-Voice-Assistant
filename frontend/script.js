// document.addEventListener("DOMContentLoaded", () => {
//     const buttons = document.querySelectorAll("#MicBtn, #RecordBtn");
//     const goBackButton = document.getElementById("#BackBtn"); // Go Back button
//     const siriMessage = document.querySelector(".siri-message");
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     const synthesis = window.speechSynthesis;
//     let utterance; // Store speech utterance for control

//     recognition.lang = "en-in"; // Set language
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     buttons.forEach(button => {
//         button.addEventListener("click", () => {
//             stopSpeaking(); // Stop any ongoing speech
//             recognition.start();
//             button.disabled = true;
//             siriMessage.textContent = "Listening...";
//         });
//     });

//     recognition.onresult = (event) => {
//         const speechResult = event.results[0][0].transcript;
//         siriMessage.textContent = `You: ${speechResult}`;
//         sendToChatbot(speechResult); // Send text to chatbot
//     };

//     recognition.onspeechend = () => {
//         recognition.stop();
//         buttons.forEach(button => (button.disabled = false));
//     };

//     recognition.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//         buttons.forEach(button => (button.disabled = false));
//     };

//     function sendToChatbot(text) {
//         const userId = localStorage.getItem("user_id") || generateUserId(); // Get or create user ID
//         localStorage.setItem("user_id", userId); // Save user ID

//         fetch("http://127.0.0.1:8000/chat", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ text: text, user_id: userId }),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Server error: " + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log("Chatbot response:", data.response);
//             siriMessage.textContent = data.response;
//             speak(data.response); // Convert chatbot response to speech
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             siriMessage.textContent = "Error: Unable to connect.";
//         });
//     }

//     function speak(text) {
//         stopSpeaking(); // Stop any ongoing speech before speaking new text
//         utterance = new SpeechSynthesisUtterance(text);
//         synthesis.speak(utterance);
//     }

//     function stopSpeaking() {
//         if (synthesis.speaking) {
//             synthesis.cancel();
//             console.log("Speech stopped");
//         }
//     }

//     function stopListening() {
//         recognition.stop(); // Stop recognition when Go Back is clicked
//         console.log("Listening stopped");
//     }

//     // Stop speech when "Go Back" or "Record" button is clicked
//     goBackButton?.addEventListener("click", () => {
//         stopSpeaking();
//         stopListening();
//     });

//     // Stop speech when "Record" button is clicked
//     document.getElementById("RecordBtn")?.addEventListener("click", stopSpeaking);

//     function generateUserId() {
//         return "user_" + Math.random().toString(36).substr(2, 9);
//     }
// });


document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("#MicBtn, #RecordBtn");
    const goBackButton = document.getElementById("BackBtn"); // Fix selector
    const siriMessage = document.querySelector(".siri-message");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const synthesis = window.speechSynthesis;
    let utterance; // Store speech utterance for control

    recognition.lang = "en-in"; // Set language
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            stopAllProcesses(); // Stop all ongoing processes before starting
            recognition.start();
            button.disabled = true;
            siriMessage.textContent = "Listening...";
        });
    });

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        siriMessage.textContent = `You: ${speechResult}`;
        sendToChatbot(speechResult); // Send text to chatbot
    };

    recognition.onspeechend = () => {
        recognition.stop();
        buttons.forEach(button => (button.disabled = false));
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        buttons.forEach(button => (button.disabled = false));
    };

    function sendToChatbot(text) {
        const userId = localStorage.getItem("user_id") || generateUserId(); // Get or create user ID
        localStorage.setItem("user_id", userId); // Save user ID

        fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text, user_id: userId }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server error: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Chatbot response:", data.response);
            siriMessage.textContent = data.response;
            speak(data.response); // Convert chatbot response to speech
        })
        .catch(error => {
            console.error("Error:", error);
            siriMessage.textContent = "Error: Unable to connect.";
        });
    }

    function speak(text) {
        stopSpeaking(); // Stop any ongoing speech before speaking new text
        utterance = new SpeechSynthesisUtterance(text);
        synthesis.speak(utterance);
    }

    function stopSpeaking() {
        if (synthesis.speaking) {
            synthesis.cancel();
            console.log("Speech stopped");
        }
    }

    function stopListening() {
        recognition.stop(); // Stop recognition when Go Back is clicked
        console.log("Listening stopped");
    }

    function stopAllProcesses() {
        stopSpeaking();
        stopListening();
    }

    // When "Go Back" is clicked, halt everything and redirect
    goBackButton?.addEventListener("click", () => {
        stopAllProcesses();
        window.location.href = "index.html"; // Redirect to home page
    });

    // Stop speech when "Record" button is clicked
    document.getElementById("RecordBtn")?.addEventListener("click", stopSpeaking);

    function generateUserId() {
        return "user_" + Math.random().toString(36).substr(2, 9);
    }
});
