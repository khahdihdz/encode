// Hàm mã hóa chuỗi sang Hex
function encodeToHex() {
    const inputText = document.getElementById('inputText').value;
    const hex = Array.from(inputText).map(ch => ch.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    document.getElementById('outputText').value = hex;
}

// Hàm giải mã chuỗi Hex
function decodeFromHex() {
    const inputText = document.getElementById('inputText').value;
    try {
        const text = inputText.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
        document.getElementById('outputText').value = text;
    } catch (error) {
        alert('Dữ liệu không hợp lệ! Vui lòng nhập đúng chuỗi hex.');
    }
}

// Hàm gửi kết quả tới Telegram
function sendToTelegram() {
    const outputText = document.getElementById('outputText').value;
    if (!outputText) {
        alert('Không có kết quả để gửi!');
        return;
    }

    const telegramToken = 'YOUR_BOT_TOKEN'; // Thay bằng token bot của bạn
    const chatId = 'YOUR_CHAT_ID'; // Thay bằng chat ID của bạn
    const message = `Kết quả: ${outputText}`;

    fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Kết quả đã được gửi qua Telegram!');
        } else {
            alert('Gửi thất bại! Vui lòng kiểm tra lại.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi gửi!');
    });
}