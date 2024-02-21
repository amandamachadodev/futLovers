'use client'
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { getPlayerById, getPlayers, getTeams, updatePlayer } from "@/src/util/api";
import { errorAlert, updateItemAlert } from "@/src/util/sweetAlert";
import { Player, Team } from "@/src/util/definition";
import Link from "next/link";
import Header from "@/src/ui/components/header";
import Loader from "@/src/ui/components/loader";

export default function Page({teams}: Team) {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState({
    name: '',
    age: 0,
    team_id: 0,
    team: ''
  });
  const  router = useRouter();
  
  useEffect(() => {
    async function fetchData() {
      const data = await getPlayerById(router.query.id);
      setPlayer({
        name: data.name,
        age: data.age,
        team_id: data.team_id,
        team: data.team.name
      })
    };
    fetchData().then(() => setLoading(false));
    ;
  }, [])
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (player.name === '' || player.age === 0 || player.team_id === 0) {
      event.preventDefault()
      return errorAlert();
    }
    event.preventDefault();
    await updatePlayer(router.query.id, player);
    updateItemAlert();
    router.push(`/`);
  }

  
  return (
    <div>
      <Header/>
      <Link href={`/`}>{`< back`}</Link>
      {loading && <Loader/>}
      {!loading && <form onSubmit={onSubmit}>
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
          onChange={({target}) => setPlayer({...player, age: +target.value})}
        />
        <select
          name="team_id"
          onChange={({target}) => setPlayer({...player, team_id: +target.value})}
        >
          <option selected value={player.team_id}>{player.team}</option>
        {teams?.map((team: Team) => ( 
            player.team_id === team.id ? '' :
            <option key={team.id} value={team.id}>{team.name}</option>
            ))}
        </select>
        <button type="submit">Save</button>
      </form>}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const players = await getPlayers();
  
  const paths = players.map((player: Player) => {
    return { params: { id: player.id.toString() } }
  });
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const teams = await getTeams();
    
  return { props: { teams }, revalidate: 10 } 
}