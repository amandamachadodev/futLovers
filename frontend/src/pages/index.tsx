import { GetStaticProps } from "next";
import Link from "next/link";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Players } from "../util/definition";

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players?.map(player => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team.name}</td>
              <td>{Intl.DateTimeFormat('pt-BR').format(new Date(player.created_at))}</td>
              <td>
                <Link href={`players/${player.id}`}><MdOutlineModeEdit/></Link>
                <RiDeleteBin7Line/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/');
  const players: Players = await res.json();
  
  return { props: { players }, revalidate: 3 } 
}