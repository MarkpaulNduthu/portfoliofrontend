window.onload = function () {
    emailjs.init("LIznhd7hnoW1DfmTx");

    document.getElementById('contacts-dev').addEventListener('submit',
        function (event) {
            event.preventDefault();
            validateandsubmit();
        }
    );

};

function displayform() {
    document.getElementById('contact-form').style = "display: block;";
}
function closeform() {
    document.getElementById('contact-form').style = "display: none;";
}

function sendEmail() {
    const params = {
        name: document.getElementById('name').value,
        message: document.getElementById('message').value,
        email: document.getElementById('email').value
    }

    emailjs.send("service_edqafca", "template_hqo4d1p", params)
        .then(response => {
            console.log("Email sent successfully!", response.status, response.text);

            alert("Sent Successfully! Please check email for response!");
        })
        .catch(error => {
            console.error("Failed to send email.", error);
            alert("Failed to send message!");
        })
};



function validateandsubmit() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const responseDiv = document.getElementById('response');
    if (!name || !email || !message) {
        responseDiv.textContent = "All inputs are required";
        responseDiv.style.color = "red";
        return;
    }
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        responseDiv.textContent = "Please Enter a valid email";
        responseDiv.style.color = "red";
        return;
    }
    const formdata = JSON.stringify({
        name: name,
        email: email,
        message: message,
    })
    // formdata.append("name", name);
    // formdata.append("email", email);
    // formdata.append("message", message);
try {
    fetch("https://mwemaportfolio.great-site.net/index.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: formdata,
    })
    .then(response => {
        if (response.ok) {
            console.log("Good response");
            return response.json();
        } else {
            console.log(response); 
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log("Trying to verify data....");
        if (data && data.message) {
            console.log("Required data present");
            responseDiv.textContent = data.message;
            responseDiv.style.color = "green";
            sendEmail(); // Ensure this function is defined elsewhere
            document.getElementById('contacts-dev').reset();
        } else {
            console.log(data);
            console.log("Required data not present");
        }
    })
    .catch(error => {
        responseDiv.textContent = "Something went wrong"; // Fixed typo from "Somethinng"
        responseDiv.style.color = "red";
        console.log(error);
    });
} catch (error) {
    console.log("Error: " + error);
}


}
