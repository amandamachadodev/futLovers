import { FormEvent } from 'react';

export default async function onSubmitCreate(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const player = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      team_id: Number(formData.get('team_id'))
    }
    const response = await fetch('http://localhost:3000/player/new', {
      method: 'POST',
      body: JSON.stringify(player),
      headers: { 'Content-Type': 'application/json' }
    })

  // Handle response if necessary
  const data = await response.json()
  console.log(data)
  // ...
}
