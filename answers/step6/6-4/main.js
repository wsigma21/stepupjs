async function getPrefs() {
    const prefResponse = await fetch('./prefecture.json');
    return await prefResponse.json();
}

async function displayPrefs() {
    const result = await getPrefs();
    console.log(result);
}

displayPrefs();