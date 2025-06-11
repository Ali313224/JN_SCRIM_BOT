const webhookURL = "https://discord.com/api/webhooks/1382440597331382272/JtIYPKvhXMsLtHDzDhFVZ4QbNUG2P5NscLSi7WqohLBxy-1k7YsSRUtoppC5DwiA6IxJ";

const discordIDs = {
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

let currentPassword = "ELYA_ADMIN_313";

function checkPassword() {
  const password = document.getElementById("adminPassword").value;
  if (password === currentPassword) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("mainForm").classList.remove("hidden");
  } else {
    alert("كلمة السر غير صحيحة");
  }
}

function generateTeams() {
  const count = parseInt(document.getElementById("playerCount").value);
  const teamsContainer = document.getElementById("teamsContainer");
  teamsContainer.innerHTML = "";

  const teamCount = Math.ceil(count / 4);
  for (let t = 0; t < teamCount; t++) {
    const teamDiv = document.createElement("div");
    teamDiv.innerHTML = `<h3>الفريق ${t + 1}</h3>`;

    for (let i = 0; i < 4; i++) {
      const index = t * 4 + i + 1;
      if (index > count) break;

      teamDiv.innerHTML += `
        <label>اللاعب ${index}:</label>
        <input type="text" id="playerName_${index}" placeholder="اسم اللاعب أو ID" />
        <select id="role_${index}">
          <option value="IGL">IGL</option>
          <option value="Support">Support</option>
          <option value="Fragger">Fragger</option>
          <option value="Scout">Scout</option>
        </select>
      `;
    }

    teamsContainer.appendChild(teamDiv);
  }
}

function submitForm() {
  const teamName = document.getElementById("teamName").value;
  const scrimTime = document.getElementById("scrimTime").value;
  const leaderName = document.getElementById("leaderName").value;
  const count = parseInt(document.getElementById("playerCount").value);

  if (!teamName || !scrimTime || !leaderName) {
    alert("يرجى تعبئة جميع الحقول!");
    return;
  }

  let message = `**📌 تسجيل سكرم جديد**\n`;
  message += `**📆 الموعد:** <t:${Math.floor(new Date(scrimTime).getTime() / 1000)}:F>\n`;
  message += `**📣 الفريق:** ${teamName}\n`;
  message += `**👑 القائد:** ${leaderName}\n`;
  message += `**👥 عدد اللاعبين:** ${count}\n\n`;

  const teamCount = Math.ceil(count / 4);

  for (let t = 0; t < teamCount; t++) {
    message += `**🟩 الفريق ${t + 1}:**\n`;
    for (let i = 0; i < 4; i++) {
      const index = t * 4 + i + 1;
      if (index > count) break;

      const player = document.getElementById(`playerName_${index}`).value.trim();
      const role = document.getElementById(`role_${index}`).value;
      let mention = "";

      if (discordIDs[player]) {
        mention = `<@${discordIDs[player]}>`;
      } else if (/^\d{17,19}$/.test(player)) {
        mention = `<@${player}>`;
      } else {
        mention = player;
      }

      message += `▫️ ${mention} - **${role}**\n`;
    }
    message += "\n";
  }

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message })
  })
    .then(response => {
      if (response.ok) {
        alert("✅ تم إرسال البيانات بنجاح إلى ديسكورد!");
      } else {
        alert("❌ حدث خطأ أثناء الإرسال.");
      }
    })
    .catch(error => {
      console.error("Webhook error:", error);
      alert("❌ تعذر الاتصال بالويب هوك.");
    });
}
