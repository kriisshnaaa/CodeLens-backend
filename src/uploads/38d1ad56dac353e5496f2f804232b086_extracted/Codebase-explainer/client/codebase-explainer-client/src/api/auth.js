export async function getCurrentUser() {
  const res = await fetch("http://localhost:5000/auth/me", {
    credentials: "include"
  });
  return res.json();
}

export function loginWithGoogle() {
  window.location.href = "http://localhost:5000/auth/google";
}

export function logout() {
  window.location.href = "http://localhost:5000/auth/logout";
}
