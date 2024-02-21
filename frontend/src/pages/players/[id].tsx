'use client'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
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
    team_id: 0
  });
  const  router = useRouter();
  
  useEffect(() => {
    async function fetchData() {
      const data = await getPlayerById(router.query.id);
      setPlayer({
        name: data.name,
        age: +data.age,
        team_id: data.team_id
      })
    };
    fetchData().then(() => setLoading(false));
    ;
  }, [])
  
  const onSubmit = useCallback(async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (player.name === '' || player.age === 0 || player.team_id === 0) {
      return errorAlert();
    }
    await updatePlayer(router.query.id, player);
    updateItemAlert();
    router.push(`/`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.name, player.age, player.team_id])

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
          onChange={({target}) => setPlayer((currentPlayer) => ({...currentPlayer, name: target.value}))}
        />
        <input
          type="number"
          name= "age"
          value={player.age}
          onChange={({target}) => setPlayer((currentPlayer) => ({...currentPlayer, age: +target.value}))}
        />
        <select
          name="team_id"
          onChange={({target}) => setPlayer((currentPlayer) => ({...currentPlayer, team_id: +target.value}))}
          value={player.team_id}
        >
        {teams?.map((team: Team) => (
            <option
              selected={+player.team_id === +team.id}
              key={team.id} value={team.id}>{team.name}
            </option>
            ))}
        </select>
        <button type="submit">Save</button>
      </form>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const teams = await getTeams();  
  return { props: { teams } } 
}
