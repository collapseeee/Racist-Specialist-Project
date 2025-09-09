

const button = document.createElement('button');

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/api/get', {
            method: "GET",
            headers: {'Content-Type': "application/json"}
        });
        
        const data = await response.json();

        console.log(data);
        
    } catch (err) {
        console.error(err);
    }
}