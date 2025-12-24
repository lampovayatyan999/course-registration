export async function submitRegistration(data) {
  const response = await fetch('http://localhost:8000/api/registrations/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}