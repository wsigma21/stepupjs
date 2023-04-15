async function displayMessage() {
    const response = await fetch('./hello.json'); // fetchした結果受け取った情報をresponseに格納
    const data = await response.json(); // responseに含まれるJSONをオブジェクトに変換
    const messageElm = document.getElementById('message');
    messageElm.innerHTML = data.message;
}

displayMessage();