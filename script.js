// Theo dõi sự thay đổi trong ô nhập liệu và tự động chuyển đổi
document.getElementById('inputText').addEventListener('input', () => {
    const inputText = document.getElementById('inputText').value.trim();

    if (isHex(inputText)) {
        // Nếu là chuỗi Hex hợp lệ, giải mã
        document.getElementById('outputText').value = decodeFromHex(inputText);
    } else {
        // Nếu không, mã hóa
        document.getElementById('outputText').value = encodeToHex(inputText);
    }
});

// Kiểm tra chuỗi có phải là Hex hợp lệ không
function isHex(str) {
    return /^[0-9a-fA-F\s]+$/.test(str) && str.length % 2 === 0;
}

// Hàm mã hóa chuỗi sang Hex
function encodeToHex(text) {
    return Array.from(text).map(ch => ch.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

// Hàm giải mã chuỗi Hex
function decodeFromHex(hex) {
    try {
        return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    } catch (error) {
        return 'Dữ liệu Hex không hợp lệ!';
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
