(() => {
'use strict';
const viToEn = {
'ENCODE & DECODE PRO trang chủ':'ENCODE & DECODE PRO home',
'Công cụ':'Tools','Tính năng':'Features','Quyền riêng tư':'Privacy','Đổi giao diện':'Toggle theme',
'Mã hóa. Giải mã.':'Encode. Decode.','Không để lại dấu vết.':'Leave no trace.',
'Công cụ Encode / Decode đa định dạng, hỗ trợ tiếng Việt, Unicode, khoảng trắng và chuỗi viết liền. Phép chuyển đổi diễn ra trong trình duyệt; lịch sử được gửi an toàn đến Telegram theo cấu hình của bạn.':'A multi-format Encode / Decode tool with support for Vietnamese, Unicode, whitespace, and continuous strings. Conversion runs in your browser; history is securely sent to Telegram according to your configuration.',
'Mở công cụ':'Open tool','Tìm hiểu bảo mật →':'Learn about privacy →','✓ Không tài khoản':'✓ No account required','✓ Không lưu trên máy chủ ứng dụng':'✓ No application-server storage','✓ Lưu lịch sử Telegram':'✓ Telegram history',
'processed locally':'processed locally','Không gian chuyển đổi':'Conversion workspace','Chọn định dạng, nhập dữ liệu và xử lý tức thì.':'Choose a format, enter your data, and convert instantly.','Xử lý trên thiết bị':'Processed on your device','Chế độ':'Mode','Định dạng':'Format','Phạm vi':'Scope','Toàn văn bản':'Entire text','Từng dòng':'Each line','Dấu phân cách':'Separator','Không có':'None','Khoảng trắng':'Space','Gạch ngang':'Hyphen',
'VĂN BẢN ĐẦU VÀO':'INPUT TEXT','Dán':'Paste','Xóa':'Clear','Nhập hoặc dán văn bản tại đây…\n\nVí dụ: Xin chào Việt Nam':'Enter or paste text here…\n\nExample: Hello Vietnam','Đổi Input / Output':'Swap Input / Output','KẾT QUẢ':'OUTPUT','Sao chép':'Copy','Tải TXT':'Download TXT','Kết quả sẽ xuất hiện ở đây…':'Your result will appear here…','TÙY CHỌN XỬ LÝ KHOẢNG TRẮNG':'WHITESPACE OPTIONS','Mặc định giữ nguyên dữ liệu':'Data is preserved by default','Loại bỏ khoảng trắng đầu/cuối':'Trim leading/trailing whitespace','Loại bỏ mọi khoảng trắng':'Remove all whitespace','Gộp khoảng trắng liên tiếp':'Collapse consecutive whitespace','Loại bỏ xuống dòng':'Remove line breaks','Loại bỏ Tab':'Remove tabs','Các tùy chọn chỉ áp dụng khi bạn chủ động bật. Không thể khôi phục dấu cách đã bị loại bỏ hoặc tự suy đoán ranh giới từ của chuỗi viết liền.':'Options are applied only when enabled. Removed spaces cannot be restored, and word boundaries cannot be reliably inferred from a continuous string.',
'Sẵn sàng. Sẵn sàng. Lịch sử sẽ được gửi đến Telegram sau mỗi lần xử lý thành công.':'Ready. History will be sent to Telegram after each successful conversion.',
'Mạnh mẽ nhưng đơn giản':'Powerful, yet simple','Các công cụ cần thiết cho văn bản, dữ liệu và lập trình.':'Essential tools for text, data, and development.','17 định dạng':'17 formats','Base64, URL, Hex, Binary, Unicode, Morse, JSON, ROT13, Caesar và các thuật toán Hash.':'Base64, URL, Hex, Binary, Unicode, Morse, JSON, ROT13, Caesar, and hash algorithms.','Unicode chuẩn xác':'Accurate Unicode support','Hỗ trợ tiếng Việt có dấu, Emoji, ký tự đặc biệt, khoảng trắng, Tab và xuống dòng.':'Supports accented Vietnamese, emoji, special characters, spaces, tabs, and line breaks.','Giữ nguyên văn bản':'Preserve text exactly','Không tự ý trim, xóa dấu cách hay thay đổi nội dung. Bạn kiểm soát mọi tùy chọn.':'No automatic trimming, whitespace removal, or content changes. You control every option.','Chạy ngay trên máy':'Runs on your device','Không cần tài khoản, backend, cơ sở dữ liệu hoặc dịch vụ xử lý bên thứ ba.':'No account, backend, database, or third-party processing service required.',
'Dữ liệu thuộc về bạn.':'Your data belongs to you.','ENCODE & DECODE PRO xử lý nội dung bằng JavaScript ngay trong trình duyệt. Nội dung được xử lý trong trình duyệt. Khi Encode/Decode thành công, Input, Output, định dạng và thời điểm sẽ được gửi đến Telegram thông qua Cloudflare Worker. Không lưu nội dung trong LocalStorage, SessionStorage, IndexedDB hoặc Cookie.':'ENCODE & DECODE PRO processes content with JavaScript directly in your browser. After a successful Encode / Decode operation, the input, output, format, and timestamp are sent to Telegram through a Cloudflare Worker. Content is not stored in LocalStorage, SessionStorage, IndexedDB, or cookies.',
'✓ Không lưu Input / Output trên trình duyệt':'✓ Input / Output are not stored in the browser','✓ Chỉ gửi đến Telegram đã cấu hình':'✓ Sent only to the configured Telegram chat','✓ Đóng trang là kết thúc phiên':'✓ Closing the page ends the session',
'Câu hỏi thường gặp':'Frequently asked questions','Công cụ có lưu nội dung tôi nhập không?':'Does the tool store the content I enter?','Có. Sau mỗi lần Encode / Decode thành công, Input và Output cùng định dạng, chế độ và thời điểm sẽ được gửi đến Telegram đã cấu hình. Nội dung không được lưu trong bộ nhớ lưu trữ của trình duyệt.':'Yes. After each successful Encode / Decode operation, the input and output, along with the format, mode, and timestamp, are sent to the configured Telegram chat. Content is not stored in browser storage.',
'Chuỗi viết liền có được tự thêm dấu cách khi giải mã?':'Will spaces be added automatically when decoding a continuous string?','Không. Công cụ bảo toàn chính xác dữ liệu. Nếu dấu cách đã bị xóa trước đó, không có cách đáng tin cậy để khôi phục vị trí ban đầu.':'No. The tool preserves data exactly. If spaces were removed earlier, their original positions cannot be reliably recovered.',
'Tại sao MD5 và SHA không có Decode?':'Why is Decode unavailable for MD5 and SHA?','Đây là các hàm băm một chiều, không phải mã hóa có thể đảo ngược. Có thể tạo hash để đối chiếu, nhưng không thể giải mã hash về văn bản gốc.':'These are one-way hash functions, not reversible encryption. You can generate hashes for comparison, but a hash cannot be decoded back into the original text.',
'Made for privacy · ':'Made for privacy · ',
'MD5 (Hash một chiều)':'MD5 (One-way hash)','SHA-1 (Hash một chiều)':'SHA-1 (One-way hash)','SHA-256 (Hash một chiều)':'SHA-256 (One-way hash)','SHA-512 (Hash một chiều)':'SHA-512 (One-way hash)'
};
const attrs = {
'Nhập hoặc dán văn bản tại đây…\n\nVí dụ: Xin chào Việt Nam':'Enter or paste text here…\n\nExample: Hello Vietnam',
'Kết quả sẽ xuất hiện ở đây…':'Your result will appear here…',
'Đổi Input / Output':'Swap Input / Output','Đổi giao diện':'Toggle theme'
};
const dynamic = {
'Base64 không hợp lệ.':'Invalid Base64 input.',
'Hex cần là chuỗi byte có số ký tự hex chẵn.':'Hex must contain an even number of hexadecimal characters.',
'Binary cần chứa các nhóm 8 bit (0 và 1).':'Binary must contain groups of 8 bits (0 and 1).',
'Decimal Unicode không hợp lệ.':'Invalid Unicode decimal value.',
'Mã Unicode nằm ngoài phạm vi hợp lệ.':'Unicode code point is out of range.',
'Unicode escape không hợp lệ.':'Invalid Unicode escape.',
'Web Crypto không khả dụng. Hãy mở trang bằng HTTPS hoặc localhost.':'Web Crypto is unavailable. Open this page over HTTPS or localhost.',
'Hash là thuật toán một chiều, không hỗ trợ Decode.':'Hashing is one-way and does not support Decode.',
'Định dạng chưa được hỗ trợ.':'Unsupported format.',
'Mã Morse không hợp lệ: ':'Invalid Morse code: ',
'Morse không hỗ trợ ký tự: ':'Morse does not support character: ',
'Hãy nhập văn bản cần xử lý.':'Enter the text you want to process.',
'Vui lòng nhập văn bản trước khi xử lý.':'Please enter text before converting.',
'Hash là một chiều, không thể giải mã.':'Hashing is one-way and cannot be decoded.',
'Hash là một chiều, không thể Decode.':'Hashing is one-way and cannot be decoded.',
'Đang xử lý trong trình duyệt…':'Processing in your browser…',
'Hoàn tất. Đang lưu lịch sử lên Telegram…':'Complete. Saving history to Telegram…',
'Hoàn tất. Lịch sử đã được gửi đến Telegram.':'Complete. History sent to Telegram.',
'Hoàn tất. Không thể gửi lịch sử Telegram (kiểm tra cấu hình/kết nối).':'Complete. Could not send Telegram history (check configuration/connection).',
'Hoàn tất! Lịch sử đã được gửi đến Telegram.':'Done! History sent to Telegram.',
'Đã xử lý xong, nhưng chưa gửi được lịch sử Telegram.':'Conversion complete, but Telegram history could not be sent.',
'Không thể xử lý dữ liệu. Kiểm tra định dạng đầu vào.':'Could not process the data. Check the input format.',
'Đã xóa nội dung khỏi giao diện.':'Content cleared from the interface.',
'Đã xóa nội dung Input và Output.':'Input and output cleared.',
'Đã dán nội dung.':'Content pasted.',
'Đã dán nội dung từ Clipboard.':'Pasted content from clipboard.',
'Trình duyệt không hỗ trợ đọc Clipboard.':'This browser does not support clipboard reading.',
'Không thể đọc Clipboard. Hãy dán thủ công.':'Could not read the clipboard. Paste manually.',
'Chưa có kết quả để sao chép.':'There is no result to copy.',
'Đã sao chép kết quả vào Clipboard.':'Result copied to clipboard.',
'Hãy sao chép kết quả bằng thao tác Copy của trình duyệt.':'Use your browser’s Copy command to copy the result.',
'Trình duyệt đã chọn văn bản. Hãy sao chép thủ công.':'The text has been selected. Copy it manually.',
'Chưa có kết quả để tải.':'There is no result to download.',
'Chưa có kết quả để tải xuống.':'There is no result to download.',
'Đã tạo tệp tải xuống theo yêu cầu.':'Download file created.',
'Đã tạo tệp encode-result.txt.':'Created encode-result.txt.',
'Đã đổi Input / Output.':'Input / Output swapped.',
'Đã hoán đổi Input / Output và chế độ.':'Input / Output and mode swapped.',
'Trình duyệt không hỗ trợ đọc Clipboard.':'This browser does not support clipboard reading.'
};
const enToVi = Object.fromEntries([...Object.entries(viToEn), ...Object.entries(dynamic)].map(([vi,en])=>[en,vi]));
let lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'vi';
const translate = value => {
 if(lang !== 'en') return value;
 if(dynamic[value]) return dynamic[value];
 for(const [prefix,translated] of [['Morse không hỗ trợ ký tự: ','Morse does not support character: '],['Mã Morse không hợp lệ: ','Invalid Morse code: ']]) if(value.startsWith(prefix)) return translated + value.slice(prefix.length);
 return viToEn[value] || value;
};
const apply = () => {
 document.documentElement.lang = lang;
 document.title = lang === 'en' ? 'ENCODE & DECODE PRO — Encoding and decoding tools' : 'ENCODE & DECODE PRO — Công cụ mã hóa và giải mã';
 const meta = document.querySelector('meta[name="description"]');
 if(meta) meta.content = lang === 'en' ? 'ENCODE & DECODE PRO — multi-format encoding and decoding, Unicode support, and Telegram history.' : 'ENCODE & DECODE PRO — công cụ mã hóa và giải mã văn bản đa định dạng, xử lý UTF-8 trên thiết bị và tự động lưu lịch sử đến Telegram.';
 const ogTitle = document.querySelector('meta[property="og:title"]');
 if(ogTitle) ogTitle.content = document.title;
 const ogDesc = document.querySelector('meta[property="og:description"]');
 if(ogDesc) ogDesc.content = lang === 'en' ? 'Multi-format Encode / Decode with Unicode support and Telegram processing history.' : 'Encode / Decode đa định dạng, hỗ trợ Unicode, tự động gửi lịch sử xử lý đến Telegram.';
 const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
 let node;
 while((node=walker.nextNode())) {
  const raw=node.nodeValue, trimmed=raw.trim();
  if(!trimmed) continue;
  const translated = lang === 'en' ? (viToEn[trimmed] || trimmed) : (enToVi[trimmed] || trimmed);
  if(translated !== trimmed) node.nodeValue=raw.replace(trimmed,translated);
 }
 document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{
  for(const attr of ['placeholder','title','aria-label']) {
   const value=el.getAttribute(attr); if(!value) continue;
   const translated=lang==='en'?(attrs[value]||viToEn[value]||value):(Object.entries(attrs).find(([,v])=>v===value)?.[0]||enToVi[value]||value);
   el.setAttribute(attr,translated);
  }
 });
 const btn=document.getElementById('languageBtn');
 if(btn){btn.textContent=lang==='en'?'VI':'EN';btn.setAttribute('aria-label',lang==='en'?'Switch to Vietnamese':'Switch to English');btn.title=lang==='en'?'Switch to Vietnamese':'Switch to English';}
 const status=document.getElementById('status');
 if(status && status.dataset.message) status.textContent=translate(status.dataset.message);
 const stats=document.getElementById('inputStats');
 if(stats && window.siteRefreshStats) window.siteRefreshStats();
 const result=document.getElementById('resultState');
 if(result && ['HOÀN TẤT','COMPLETE'].includes(result.textContent)) result.textContent=lang==='en'?'COMPLETE':'HOÀN TẤT';
 const modeLabel=document.getElementById('convertLabel');
 if(modeLabel) modeLabel.textContent=document.getElementById('encodeMode').classList.contains('active')?'Encode':'Decode';
 const url=new URL(location.href);
 if(lang==='en') url.searchParams.set('lang','en'); else url.searchParams.delete('lang');
 history.replaceState(null,'',url.pathname+url.search+url.hash);
};
document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.getElementById('languageBtn');
 if(btn) btn.addEventListener('click',()=>{lang=lang==='vi'?'en':'vi';apply();});
 apply();
});
window.siteI18n={get lang(){return lang;},translate,apply};
})();