// สร้างรายการไอเท็มที่สุ่มได้
const gachaPool = [
  { name: "ร่มวิเศษ", rarity: "⭐5", rate: 60 },
  { name: "ชุดเกราะทองคำ", rarity: "⭐6", rate: 25 },
  { name: "ร่มพิเศษ", rarity: "⭐7", rate: 10 },
  { name: "ชุดหายาก", rarity: "⭐8", rate: 5 }
];

let diamonds = 200; // จำนวนเพชรเริ่มต้น

// ฟังก์ชันสำหรับสุ่มไอเท็ม
function rollGacha() {
  const random = Math.random() * 100; // สุ่มเลข 0-100
  let cumulativeRate = 0;

  for (const item of gachaPool) {
    cumulativeRate += item.rate;
    if (random <= cumulativeRate) {
      return item;
    }
  }
  return null;
}

// ฟังก์ชันสุ่มหลายครั้ง
function rollMultipleGacha(times) {
  const results = [];
  for (let i = 0; i < times; i++) {
    const result = rollGacha();
    if (result) results.push(result);
  }
  return results;
}

// แสดงผลลัพธ์
function displayResults(results) {
  const resultDiv = document.getElementById("result-list");
  resultDiv.innerHTML = ""; // ล้างค่าก่อน
  results.forEach((item, index) => {
    const resultItem = document.createElement("p");
    resultItem.textContent = `ครั้งที่ ${index + 1}: ${item.name} (${item.rarity})`;
    resultDiv.appendChild(resultItem);
  });
}

// อัปเดตจำนวนเพชร
function updateDiamonds() {
  document.getElementById("diamond-count").textContent = diamonds;
}

// การสุ่ม 1 ครั้ง
document.getElementById("gacha-one-button").addEventListener("click", () => {
  if (diamonds >= 40) {
    diamonds -= 40;
    const result = [rollGacha()]; // สุ่ม 1 ครั้ง
    displayResults(result);
    updateDiamonds();
  } else {
    alert("เพชรไม่พอ!");
  }
});

// การสุ่ม 5+1 ครั้ง (โบนัส)
document.getElementById("gacha-five-button").addEventListener("click", () => {
  if (diamonds >= 200) {
    diamonds -= 200;
    const results = rollMultipleGacha(6); // สุ่ม 6 ครั้ง
    displayResults(results);
    updateDiamonds();
  } else {
    alert("เพชรไม่พอ!");
  }
});

// ฟังก์ชันสำหรับเติมเพชร
function topUpDiamonds(amount) {
  diamonds += amount; // เพิ่มจำนวนเพชร
  updateDiamonds(); // อัปเดตเพชรบนหน้าจอ
  alert(`เติม ${amount} เพชรสำเร็จ! เพชรปัจจุบัน: ${diamonds}`);
}

// เปิด Modal ยืนยันการสุ่ม
document.getElementById("gacha-single-button").addEventListener("click", () => {
  const modal = document.getElementById("confirm-modal");
  modal.style.display = "flex"; // แสดง Modal
});

// ฟังก์ชันปิด Modal
function closeModal() {
  const modal = document.getElementById("confirm-modal");
  modal.style.display = "none";
}

// ฟังก์ชันยืนยันการสุ่ม Gacha
function confirmGacha(type) {
  let cost = (type === 5) ? 200 : 40; // ค่าตามชนิดของการสุ่ม
  if (diamonds >= cost) {
    diamonds -= cost; // หักเพชรตามชนิด
    displayResults(rollMultipleGacha(type === 5 ? 6 : 1)); // สุ่มตามชนิด
    updateDiamonds(); // อัปเดตจำนวนเพชร
    closeModal(); // ปิด Modal
  } else {
    alert("เพชรไม่พอ!");
    closeModal();
  }
}



