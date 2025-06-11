// script.js

// كلمة المرور الابتدائية
let adminPassword = "ELYA_ADMIN_313";

// حفظ كلمة السر في Local Storage لتغييرها لاحقًا
if (!localStorage.getItem("adminPassword")) {
  localStorage.setItem("adminPassword", adminPassword);
}

// تسجيل الدخول
function login() {
  const input = document.getElementById("password").value;
  const saved = localStorage.getItem("adminPassword");
  if (input === saved) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
  } else {
    alert("كلمة المرور غير صحيحة");
  }
}

// تغيير كلمة السر
function changePassword() {
  const oldPass = prompt("أدخل كلمة السر الحالية");
  const newPass = prompt("أدخل كلمة السر الجديدة");
  if (oldPass === localStorage.getItem("adminPassword")) {
    localStorage.setItem("adminPassword", newPass);
    alert("تم تغيير كلمة السر بنجاح");
  } else {
    alert("كلمة السر القديمة غير صحيحة");
  }
}

// إرسال بيانات الفريق
async function sendTeam() {
  const teamName = document.getElementById("teamName").value;
  const scrimTime = document.getElementById("scrimTime").value;
  const leader = document.getElementById("leader").value;

  let players = [];
  for (let i = 1; i <= 4; i++) {
    const selected = document.getElementById(`player${i}`).value;
    const custom = document.getElementById(`custom${i}`).value;
    const role = document.getElementById(`role${i}`).value;

    let mention = selected ? `<@${selected}>` : (custom ? `<@${custom}>` : "❌");
    players.push(`${mention} - ${role || "بدون دور"}`);
  }

  const message = `
📌 **تسجيل فريق جديد للسكرم**

🆔 **اسم الفريق:** ${teamName}
⏰ **موعد السكرم:** ${scrimTime}
👑 **قائد الفريق:** ${leader}

👥 **الأعضاء المشاركون:**
1. ${players[0]}
2. ${players[1]}
3. ${players[2]}
4. ${players[3]}

📩 **تم تسجيل الفريق بواسطة المشرف.**
`;

  await fetch("https://discord.com/api/webhooks/1382440597331382272/JtIYPKvhXMsLtHDzDhFVZ4QbNUG2P5NscLSi7WqohLBxy-1k7YsSRUtoppC5DwiA6IxJ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message })
  });

  alert("تم إرسال البيانات إلى ديسكورد بنجاح ✅");
}
