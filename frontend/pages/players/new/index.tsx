import { FormEvent } from 'react';
 
export type Teams = {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export default function Page({teams}: Teams) {
  
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
 
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <input type="number" name= "age" />
      <select name="team_id">
      {teams?.map(team => (
            <option key={team.id} value={team.id}>
                {team.name}
            </option>
          ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  )
}

export const getStaticProps = async () => {
    const res = await fetch('http://localhost:3000/team');
    const teams: Teams = await res.json();
    
    return { props: { teams }, revalidate: 10 } 
  }