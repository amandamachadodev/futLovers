import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { getPlayerId, getPlayers, getTeams, updatePlayer } from "@/src/util/api";
import { errorAlert, updateItemAlert } from "@/src/util/sweetAlert";
import { Players, Teams } from "@/src/util/definition";
import Link from "next/link";

export default function Page({teams, players}) {
  const [player, setPlayer] = useState({
    name: players.name,
    age: players.age,
    team_id: players.team_id,
    team: players.team.name
  });
  const  { query: { id }, } = useRouter();
  const  router = useRouter();
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (player.name === '' || player.age === 0 || player.team_id === 0 ||  player.age === '') {
      event.preventDefault()
      return errorAlert();
    }
    event.preventDefault();
    await updatePlayer(id, player);
    updateItemAlert();
    router.push(`/`);
  }

  
  return (
    <>
    <Link href={`/`}>{`< back`}</Link>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={player.name}
        onChange={({target}) => setPlayer({...player, name: target.value})}
      />
      <input
        type="number"
        name= "age"
        value={player.age}
        onChange={({target}) => setPlayer({...player, age: target.value})}
      />
      <select
        name="team_id"
        onChange={({target}) => setPlayer({...player, team_id: target.value})}
      >
        <option selected value={player.team_id}>{player.team}</option>
      {teams?.map((team: Teams) => ( 
          player.team_id === team.id ? '' :
          <option key={team.id} value={team.id}>{team.name}</option>
          ))}
      </select>
      <button type="submit">Save</button>
    </form>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const players = await getPlayers();
  
  const paths = players.map((player: Players) => {
    return { params: { id: player.id.toString() } }
  });
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const players = await getPlayerId(id);
  const teams = await getTeams();
    
  return { props: { players, teams }, revalidate: 10 } 
}