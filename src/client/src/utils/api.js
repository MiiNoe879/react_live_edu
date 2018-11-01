import { isDevMode } from "utils/helpers";
const apiUrl = isDevMode ? "http://localhost:8000/api/v3" : "/api/v3";

export function apiGet(url) {
  return fetch(apiUrl + url, {
    method: "GET",
    credentials: "include"
  }).then(response =>
    response.json().then(data => ({
      data: data,
      ok: response.ok
    }))
  );
}

export function apiPost(url, data) {
  return fetch(apiUrl + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data)
  }).then(response =>
    response.json().then(data => ({
      data: data,
      ok: response.ok
    }))
  );
}
