import { GetServerSideProps } from "next";
import Link from "next/link";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { PlayerProps } from "../lib/definition";
import deleteItemAlert from "../lib/sweetAlert";
import { getPlayers } from "../lib/api";
import { useRouter } from "next/router";
import Header from "../ui/components/header";
import style from '../ui/styles/dashborad.module.css';
import NotFoundPlayers from "../ui/components/not-found-players";
import { ButtonAdd } from "../ui/components/button-add";
import { inter } from "../ui/fonts";

export default function Page({ players }: PlayerProps) {
  const router = useRouter();
  return (
    <div className={inter.className}>
      <Header/>
      <div className={style.content}>
      <h1>Players</h1>
      <Link className={style.link} href={'/players/new'}><ButtonAdd/></Link>
      </div>
      <table className={style.table}>
        <thead>
          <tr className={style.tr}>
            <th>Id</th>
            <th className={style.name}>Name</th>
            <th className={style.team}>Team</th>
            <th className={style.date}>Creation date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className={style.tr}>
              <td className={style.tdid}>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team.name}</td>
              <td>{Intl.DateTimeFormat('pt-BR').format(new Date(player.created_at))}</td>
              <td className={style.icons}>
                <Link href={`players/${player.id}`}>
                  <MdOutlineModeEdit color='gray' size={20}/>
                </Link>
                <span onClick={async () => {
                  deleteItemAlert(player.id, () => router.replace(router.asPath))
                }
                }>
                  <span className={style.pen}>
                    <RiDeleteBin7Line color='gray' size={20}/>
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {players.length === 0 && <NotFoundPlayers/>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const players: PlayerProps = await getPlayers();
  return { props: { players } };
}