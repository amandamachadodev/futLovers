import Link from "next/link";

export type Players = {
  id: number;
  name: string;
  age: number;
  team_id: number; //remover duplicado
  created_at: Date;
  updated_at: Date;
  team: {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  }
}

export default function Table({ players }: Players) {
  return (
    <div>
      <h1>Players</h1>
      <Link href={'/players/new'}><button type="button">Add player</button></Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Team</th>
            <th>Creation date</th>
          </tr>
        </thead>
        <tbody>
          {players?.map(player => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team.name}</td>
              <td>{Intl.DateTimeFormat('pt-BR').format(new Date(player.created_at))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/');
  const players: Players = await res.json();
  
  return { props: { players }, revalidate: 3 } 
}