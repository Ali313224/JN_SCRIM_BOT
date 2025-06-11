const adminPassword = "ELYA_ADMIN_313";
localStorage.setItem("adminPassword", adminPassword);

// تسجيل الدخول
function login() {
  const input = document.getElementById("password").value;
  if (input === localStorage.getItem("adminPassword")) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
    generatePlayerFields(); // توليد خانات اللاعبين تلقائياً
  } else {
    alert("كلمة السر غير صحيحة!");
  }
}

// تغيير كلمة السر
function changePassword() {
  const oldPass = prompt("أدخل كلمة السر الحالية:");
  if (oldPass === localStorage.getItem("adminPassword")) {
    const newPass = prompt("أدخل كلمة السر الجديدة:");
    localStorage.setItem("adminPassword", newPass);
    alert("تم تغيير كلمة السر بنجاح.");
  } else {
    alert("كلمة السر القديمة غير صحيحة.");
  }
}

// قائمة اللاعبين الجاهزين
const playerOptions = {
  "فايروس": "1380981046362898474",
  "هيثم": "1360200583675379865",
  "هيرو": "1148152210430107708",
  "سبيد": "1375364456036433920",
  "هنتر": "1380867027367100506",
  "باترو": "1370551180073107536",
  "روليكس": "1381387460222652558",
  "انس": "1043393234245787658",
  "ناروتو": "1198320840912146542",
  "زومبي": "1291829284825993359",
  "ماتريكس": "1323720388521230447"
};

// توليد خانات اللاعبين
function generatePlayerFields() {
  const count = parseInt(document.getElementById("teamSize").value);
  const container = document.getElementById("playersContainer");
  container.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>اللاعب ${i}:</label>
      <select id="playerSelect${i}">
        <option value="">اختر من القائمة</option>
        ${Object.entries(playerOptions).map(([name, id]) =>
          `<option value="${id}">${name}</option>`
        ).join("")}
      </select>
      <input type="text" id="customId${i}" placeholder="أو أدخل ID يدويًا" />
      <input type="text" id="role${i}" placeholder="دور اللاعب (مثل IGL)" />
    `;
    container.appendChild(div);
  }
}

// إرسال الفريق
function sendTeam() {
  const webhook = "https://discord.com/api/webhooks/1382440597331382272/JtIYPKvhXMsLtHDzDhFVZ4QbNUG2P5NscLSi7WqohLBxy-1k7YsSRUtoppC5DwiA6IxJ";
  const teamName = document.getElementById("teamName").value;
  const scrimTime = document.getElementById("scrimTime").value;
  const leader = document.getElementById("leader").value;
  const teamSize = parseInt(document.getElementById("teamSize").value);

  let mentions = "";
  let details = "";

  for (let i = 1; i <= teamSize; i++) {
    const selected = document.getElementById(`playerSelect${i}`).value;
    const custom = document.getElementById(`customId${i}`).value;
    const role = document.getElementById(`role${i}`).value || "لا يوجد";

    const id = custom || selected;
    if (id) mentions += `<@${id}> `;
    details += `**اللاعب ${i}:** <@${id || "?"}> | الدور: ${role}\n`;
  }

  const message = {
    content: mentions,
    embeds: [{
      title: `📌 تسجيل فريق جديد`,
      description: `**اسم الفريق:** ${teamName}\n**القائد:** ${leader}\n**موعد السكرم:** ${scrimTime}\n\n${details}`,
      color: 3447003
    }]
  };

  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  }).then(() => {
    alert("تم إرسال الفريق بنجاح!");
  }).catch(() => {
    alert("حدث خطأ أثناء الإرسال.");
  });
}
