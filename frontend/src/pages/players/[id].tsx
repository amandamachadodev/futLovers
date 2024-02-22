'use client'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { getPlayerById, getPlayers, getTeams, updatePlayer } from "@/src/lib/api";
import { errorAlert, updateItemAlert } from "@/src/lib/sweetAlert";
import { TeamProps } from "@/src/lib/definition";
import Link from "next/link";
import Header from "@/src/ui/components/header";
import Loader from "@/src/ui/components/loader";
import style from '@/src/ui/styles/form.module.css';
import { inter } from "@/src/ui/fonts";

export default function Page({teams}: TeamProps) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className={inter.className}>
      <Header/>
      <div className={style.content}>
        <h1>Edit player</h1>
        <Link className={style.link} href={`/`}>{`< back`}</Link>
      </div>
      {loading && <Loader/>}
      {!loading && 
      <form onSubmit={onSubmit} className={style.form}>
        <div className={style.input}>
          <input
            className={style.items}
            type="text"
            name="name"
            value={player.name}
            onChange={({target}) => setPlayer((currentPlayer) => ({...currentPlayer, name: target.value}))}
          />
          <input
            className={style.items}
            type="number"
            name= "age"
            value={player.age}
            onChange={({target}) => setPlayer((currentPlayer) => ({...currentPlayer, age: +target.value}))}
          />
        </div>
        <select
        className={style.select}
          name="team_id"
          onChange={({target}) => setPlayer((currentPlayer) => ({...currentPlayer, team_id: +target.value}))}
          value={player.team_id}
        >
        {teams?.map((team) => (
            <option
              selected={+player.team_id === +team.id}
              key={team.id} value={team.id}>{team.name}
            </option>
            ))}
        </select>
        <button className={style.button} type="submit">Save</button>
      </form>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const teams: TeamProps = await getTeams();  
  return { props: { teams } } 
}
