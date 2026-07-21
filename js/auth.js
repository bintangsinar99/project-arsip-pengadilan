// =============================================
// AUTH.JS - Sistem Autentikasi DIAN
// =============================================

const USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Administrator",
    nip: "19800101 200501 1 001",
    jabatan: "IT Administrator",
    avatar: "A",
  },
  {
    id: 2,
    username: "user1",
    password: "user123",
    role: "user",
    name: "Budi Santoso",
    nip: "19900202 201001 1 002",
    jabatan: "Staff Perdata",
    divisi: "Perdata",
    avatar: "B",
  },
  {
    id: 3,
    username: "user2",
    password: "user123",
    role: "user",
    name: "Siti Rahayu",
    nip: "19950303 201501 2 003",
    jabatan: "Staff Pidana",
    divisi: "Pidana",
    avatar: "S",
  },
];

// Login function
function login(username, password) {
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const sessionData = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      nip: user.nip,
      jabatan: user.jabatan,
      divisi: user.divisi || null,
      avatar: user.avatar,
      loginTime: new Date().toISOString(),
    };
    sessionStorage.setItem("dian_session", JSON.stringify(sessionData));
    return { success: true, role: user.role };
  }
  return { success: false };
}

// Logout function
function logout() {
  sessionStorage.removeItem("dian_session");
  window.location.href = "index.html";
}

// Get current session
function getSession() {
  const session = sessionStorage.getItem("dian_session");
  return session ? JSON.parse(session) : null;
}

// Check if logged in
function isLoggedIn() {
  return getSession() !== null;
}

// Guard: redirect if not logged in
function requireAuth(requiredRole = null) {
  const session = getSession();
  if (!session) {
    window.location.href = "index.html";
    return null;
  }
  if (requiredRole && session.role !== requiredRole) {
    // Redirect to appropriate dashboard
    if (session.role === "admin") {
      window.location.href = "dashboard-admin.html";
    } else {
      window.location.href = "dashboard-user.html";
    }
    return null;
  }
  return session;
}

// Guard: redirect if already logged in
function redirectIfLoggedIn() {
  const session = getSession();
  if (session) {
    if (session.role === "admin") {
      window.location.href = "dashboard-admin.html";
    } else {
      window.location.href = "dashboard-user.html";
    }
  }
}

// Format login time
function formatLoginTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}