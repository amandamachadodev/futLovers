import { GetServerSideProps } from "next";
import Link from "next/link";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { PlayerProps } from "../util/definition";
import deleteItemAlert from "../util/sweetAlert";
import { getPlayers } from "../util/api";
import { useRouter } from "next/router";
import Header from "../ui/components/header";

export default function Page({ players }: PlayerProps) {
  const router = useRouter();
  return (
    <div>
      <Header/>
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
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team.name}</td>
              <td>{Intl.DateTimeFormat('pt-BR').format(new Date(player.created_at))}</td>
              <td>
                <Link href={`players/${player.id}`}><MdOutlineModeEdit/></Link>
                <span onClick={async () => {
                  deleteItemAlert(player.id, () => router.replace(router.asPath))
                }
                }>
                  <RiDeleteBin7Line/>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const players: PlayerProps = await getPlayers();
  return { props: { players } };
}