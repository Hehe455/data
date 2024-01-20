        // Your Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyB_JhhpjE36bQcYqsc3nNMOjPjI2-L4VHM",
            authDomain: "bdaygift-efd66.firebaseapp.com",
            projectId: "bdaygift-efd66",
            storageBucket: "bdaygift-efd66.appspot.com",
            messagingSenderId: "555720467671",
            appId: "1:555720467671:web:6937e07247d39679413c92"
        };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

    // code.js
// code.js

let detailedTimestamp = false;

// Function to format timestamp in a detailed format
function formatTimestamp(timestamp) {
    let postDate = timestamp;
    
    // Check if timestamp is a Firestore Timestamp
    if (timestamp && timestamp.toDate instanceof Function) {
        postDate = timestamp.toDate();
    }

    const currentDate = new Date();

    // Check if the year is the current year
    const showYear = postDate.getFullYear() !== currentDate.getFullYear();

    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    if (showYear) {
        options.year = 'numeric';
    }

    return postDate.toLocaleString('en-US', options);
}


// Function to render timestamp in card format
function renderTimestampCard(data) {
    const container = document.getElementById('timestampContainer');
    const card = document.createElement('div');
    card.classList.add('timestamp-card');

    const originalTimestamp = data.timestamp.toDate();
    const originalText = data.text; // Assuming the field containing the text is 'text'

    card.innerHTML = `<p>${formatTimestamp(originalTimestamp)}</p>`;
    
    card.addEventListener('click', () => {
        // Toggle the state before updating the card content
        detailedTimestamp = !detailedTimestamp;

        // Update the card content with the timestamp and optional text
        if (detailedTimestamp) {
            card.innerHTML = `<p>${originalTimestamp.toLocaleString()}</p><p>${originalText}</p>`;
        } else {
            card.innerHTML = `<p>${formatTimestamp(originalTimestamp)}</p>`;
        }
    });

    container.appendChild(card);
}


// Fetch data from Firestore and sort by timestamp (recent first)
db.collection('use').orderBy('timestamp', 'desc').get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const data = doc.data();
            renderTimestampCard(data);
        });
    })
    .catch(error => {
        console.error("Error getting documents: ", error);
    });
