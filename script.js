(() => {
'use strict';
const $ = id => document.getElementById(id);
const input = $('inputText'), output = $('outputText'), format = $('format');
let mode = 'encode';
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });
const bytes = s => encoder.encode(s);
const fromBytes = b => decoder.decode(b);
const setStatus = (message, type = '') => { const el=$('status'); el.textContent=message; el.className='status '+type; };
const stats = () => {
 const value=input.value; $('inputStats').textContent=value.length.toLocaleString()+' ký tự · '+(value.trim()?value.trim().split(/\s+/u).length:0)+' từ · '+bytes(value).length.toLocaleString()+' byte';
 $('outputStats').textContent=output.value.length.toLocaleString()+' ký tự';
};
const preprocess = value => {
 let s=value;
 if($('trimSpace').checked) s=s.trim();
 if($('removeSpace').checked) s=s.replace(/[ \t\n\r\f\v]+/g,'');
 else {
  if($('collapseSpace').checked) s=s.replace(/[ \t\f\v]+/g,' ');
  if($('removeNewlines').checked) s=s.replace(/\r\n|\r|\n/g,'');
  if($('removeTabs').checked) s=s.replace(/\t/g,'');
 }
 return s;
};
const b64encode = (s,url=false) => {
 let binary=''; const b=bytes(s); for(let i=0;i<b.length;i+=0x8000) binary+=String.fromCharCode(...b.subarray(i,i+0x8000));
 let out=btoa(binary); if(url) out=out.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); return out;
};
const b64decode = (s,url=false) => {
 let v=s.replace(/\s+/g,''); if(url) v=v.replace(/-/g,'+').replace(/_/g,'/');
 if(!/^[A-Za-z0-9+/]*={0,2}$/.test(v)||v.length%4===1) throw Error('Base64 không hợp lệ.');
 v=v.replace(/=+$/,''); v+='='.repeat((4-v.length%4)%4);
 const bin=atob(v), out=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i); return fromBytes(out);
};
const hexEncode=s=>Array.from(bytes(s),b=>b.toString(16).padStart(2,'0')).join($('separator').value);
const hexDecode=s=>{
 let v=s.trim().replace(/^0x/i,'').replace(/0x/gi,'').replace(/[\s,:;_-]+/g,'');
 if(!v||v.length%2||!/^[\da-f]+$/i.test(v)) throw Error('Hex cần là chuỗi byte có số ký tự hex chẵn.');
 const a=new Uint8Array(v.length/2); for(let i=0;i<a.length;i++) a[i]=parseInt(v.slice(i*2,i*2+2),16); return fromBytes(a);
};
const binaryEncode=s=>Array.from(bytes(s),b=>b.toString(2).padStart(8,'0')).join($('separator').value);
const binaryDecode=s=>{
 const v=s.trim().replace(/0b/gi,'').replace(/[\s,_-]+/g,''); if(!v||!/^[01]+$/.test(v)||v.length%8) throw Error('Binary cần chứa các nhóm 8 bit (0 và 1).');
 const a=new Uint8Array(v.length/8); for(let i=0;i<a.length;i++) a[i]=parseInt(v.slice(i*8,i*8+8),2); return fromBytes(a);
};
const decimalEncode=s=>Array.from(s,ch=>ch.codePointAt(0).toString(10)).join($('separator').value||' ');
const decimalDecode=s=>{
 const tokens=s.trim().split(/[\s,;|]+/).filter(Boolean); if(!tokens.length) return '';
 return tokens.map(t=>{if(!/^\d+$/.test(t)) throw Error('Decimal Unicode không hợp lệ.'); const n=Number(t); if(!Number.isInteger(n)||n<0||n>0x10ffff||(n>=0xd800&&n<=0xdfff)) throw Error('Mã Unicode nằm ngoài phạm vi hợp lệ.'); return String.fromCodePoint(n);}).join('');
};
const unicodeEncode=s=>Array.from(s,ch=>{const cp=ch.codePointAt(0);return cp<=0xffff?'\\u'+cp.toString(16).padStart(4,'0'):'\\u{'+cp.toString(16)+'}';}).join('');
const unicodeDecode=s=>s.replace(/\\u\{([\da-f]{1,6})\}|\\u([\da-f]{4})/gi,(_,a,b)=>{const n=parseInt(a||b,16);if(n>0x10ffff||(n>=0xd800&&n<=0xdfff))throw Error('Unicode escape không hợp lệ.');return String.fromCodePoint(n);});
const htmlEncode=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const htmlDecode=s=>{const d=new DOMParser().parseFromString(s,'text/html');return d.documentElement.textContent;};
const rotate=(s,shift)=>Array.from(s,ch=>{const c=ch.codePointAt(0);if(c>=65&&c<=90)return String.fromCharCode((c-65+shift+2600)%26+65);if(c>=97&&c<=122)return String.fromCharCode((c-97+shift+2600)%26+97);return ch;}).join('');
const morseMap={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.', '.':'.-.-.-',',':'--..--','?':'..--..',"'":'.----.','!':'-.-.--','/':'-..-.','(':'-.--.',')':'-.--.-','&':'.-...',':':'---...',';':'-.-.-.','=':'-...-','+':'.-.-.','-':'-....-','_':'..--.-','"':'.-..-.','$':'...-..-','@':'.--.-.'};
const morseReverse=Object.fromEntries(Object.entries(morseMap).map(([k,v])=>[v,k]));
const graphemes=s=>typeof Intl!=='undefined'&&Intl.Segmenter?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(s)].map(x=>x.segment):Array.from(s);
const md5=s=>{
 const data=Array.from(bytes(s)); const bitLen=data.length*8; data.push(128); while(data.length%64!==56)data.push(0);
 const lo=bitLen>>>0,hi=Math.floor(bitLen/4294967296); for(let i=0;i<4;i++)data.push((lo>>>(8*i))&255);for(let i=0;i<4;i++)data.push((hi>>>(8*i))&255);
 const K=Array.from({length:64},(_,i)=>Math.floor(Math.abs(Math.sin(i+1))*4294967296)>>>0), S=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21];
 let a0=0x67452301,b0=0xefcdab89,c0=0x98badcfe,d0=0x10325476;
 const add=(x,y)=>(x+y)>>>0, rol=(x,n)=>(x<<n)|(x>>>(32-n));
 for(let off=0;off<data.length;off+=64){const M=[];for(let j=0;j<16;j++)M[j]=(data[off+j*4]|data[off+j*4+1]<<8|data[off+j*4+2]<<16|data[off+j*4+3]<<24)>>>0;let A=a0,B=b0,C=c0,D=d0;
  for(let i=0;i<64;i++){let F,g,sh;if(i<16){F=(B&C)|(~B&D);g=i;sh=S[i%4];}else if(i<32){F=(D&B)|(~D&C);g=(5*i+1)%16;sh=S[4+i%4];}else if(i<48){F=B^C^D;g=(3*i+5)%16;sh=S[8+i%4];}else{F=C^(B|~D);g=(7*i)%16;sh=S[12+i%4];}const tmp=D;D=C;C=B;B=add(B,rol(add(add(A,F),add(K[i],M[g])),sh));A=tmp;}
  a0=add(a0,A);b0=add(b0,B);c0=add(c0,C);d0=add(d0,D);
 }
 return [a0,b0,c0,d0].map(n=>[0,8,16,24].map(k=>((n>>>k)&255).toString(16).padStart(2,'0')).join('')).join('');
};
const hash=async (s,alg)=>{if(alg==='md5')return md5(s);if(!crypto.subtle)throw Error('Web Crypto không khả dụng trong ngữ cảnh này. Hãy dùng HTTPS hoặc localhost.');const name={sha1:'SHA-1',sha256:'SHA-256',sha512:'SHA-512'}[alg];const digest=await crypto.subtle.digest(name,bytes(s));return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');};
const transform=async (s,op)=>{
 const sep=$('separator').value;
 if(['md5','sha1','sha256','sha512'].includes(op)){if(mode==='decode')throw Error('Hash là thuật toán một chiều, không hỗ trợ Decode.');return hash(s,op);}
 if(mode==='encode'){
  switch(op){
   case'base64':return b64encode(s);case'base64url':return b64encode(s,true);case'url':return encodeURIComponent(s);case'html':return htmlEncode(s);case'unicode':return unicodeEncode(s);case'hex':return hexEncode(s);case'binary':return binaryEncode(s);case'decimal':return decimalEncode(s);case'rot13':return rotate(s,13);case'caesar':return rotate(s,Number($('shift').value)||0);case'morse':return Array.from(s.toUpperCase(),ch=>ch===' '?' / ':morseMap[ch]||'').join(' ').replace(/ +/g,' ').trim();case'reverse':return graphemes(s).reverse().join('');case'json':return JSON.stringify(s).slice(1,-1);default:throw Error('Định dạng chưa được hỗ trợ.');
  }
 }
 switch(op){
  case'base64':return b64decode(s);case'base64url':return b64decode(s,true);case'url':return decodeURIComponent(s.replace(/\+/g,'%20'));case'html':return htmlDecode(s);case'unicode':return unicodeDecode(s);case'hex':return hexDecode(s);case'binary':return binaryDecode(s);case'decimal':return decimalDecode(s);case'rot13':return rotate(s,13);case'caesar':return rotate(s,-(Number($('shift').value)||0));case'morse':return s.trim().split(/\s*\/\s*/).map(word=>word.split(/\s+/).map(code=>{if(!morseReverse[code])throw Error('Mã Morse không hợp lệ: '+code);return morseReverse[code];}).join('')).join(' ');case'reverse':return graphemes(s).reverse().join('');case'json':return JSON.parse('"'+s+'"');default:throw Error('Định dạng chưa được hỗ trợ.');
 }
};
const convert=async()=>{
 if(!input.value){output.value='';stats();setStatus('Hãy nhập văn bản cần xử lý.');return;}
 const op=format.value;if(mode==='decode'&&['md5','sha1','sha256','sha512'].includes(op)){setStatus('Hash là một chiều, không thể giải mã.','error');return;}
 const btn=$('convertBtn');btn.disabled=true;setStatus('Đang xử lý trong trình duyệt…');
 try{const value=preprocess(input.value);const result=await transform(value,op);output.value=result;stats();$('resultState').textContent='HOÀN TẤT';setStatus('Hoàn tất. Nội dung chỉ được xử lý trong bộ nhớ trang.','success');}
 catch(e){output.value='';stats();$('resultState').textContent='ERROR';setStatus(e&&e.message?e.message:'Không thể xử lý dữ liệu. Kiểm tra định dạng đầu vào.','error');}
 finally{btn.disabled=false;}
};
const setMode=m=>{mode=m;$('encodeMode').classList.toggle('active',m==='encode');$('decodeMode').classList.toggle('active',m==='decode');$('convertLabel').textContent=m==='encode'?'Encode':'Decode';};
const updateParams=()=>{const v=format.value;$('caesarParam').hidden=v!=='caesar';$('separatorParam').hidden=!['hex','binary','decimal'].includes(v);$('decodeMode').disabled=['md5','sha1','sha256','sha512'].includes(v);if($('decodeMode').disabled&&mode==='decode')setMode('encode');};
$('encodeMode').addEventListener('click',()=>setMode('encode'));$('decodeMode').addEventListener('click',()=>setMode('decode'));$('convertBtn').addEventListener('click',convert);format.addEventListener('change',updateParams);
input.addEventListener('input',stats);output.addEventListener('input',stats);
$('clearBtn').addEventListener('click',()=>{input.value='';output.value='';stats();setStatus('Đã xóa nội dung khỏi giao diện.');input.focus();});
$('pasteBtn').addEventListener('click',async()=>{try{if(!navigator.clipboard?.readText)throw Error('Trình duyệt không hỗ trợ đọc Clipboard.');input.value=await navigator.clipboard.readText();stats();setStatus('Đã dán nội dung.');}catch(e){setStatus(e.message||'Không thể đọc Clipboard. Hãy dán thủ công.','error');}});
$('copyBtn').addEventListener('click',async()=>{if(!output.value){setStatus('Chưa có kết quả để sao chép.','error');return;}try{await navigator.clipboard.writeText(output.value);setStatus('Đã sao chép kết quả vào Clipboard.','success');}catch{output.focus();output.select();setStatus('Hãy sao chép kết quả bằng thao tác Copy của trình duyệt.','error');}});
$('downloadBtn').addEventListener('click',()=>{if(!output.value){setStatus('Chưa có kết quả để tải.','error');return;}const blob=new Blob([output.value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='encode-result.txt';a.click();URL.revokeObjectURL(url);setStatus('Đã tạo tệp tải xuống theo yêu cầu.','success');});
$('swapBtn').addEventListener('click',()=>{const v=input.value;input.value=output.value;output.value=v;setMode(mode==='encode'?'decode':'encode');stats();setStatus('Đã đổi Input / Output.');});
$('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('light');$('themeBtn').textContent=document.body.classList.contains('light')?'☾':'☼';});
$('year').textContent=new Date().getFullYear();updateParams();stats();
})();