import { GetStaticPaths, GetStaticProps } from "next";
import { Teams } from "@/src/util/definition";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page({teams, players}) {
  const { id } = useRouter().query;
  async function onSubmit() {
      const data = {
        name: player.name,
        age: Number(player.age),
        team_id: Number(player.team_id),
      }
      const response = await fetch(`http://localhost:3000/player/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    console.log(response);
  }

  const [player, setPlayer] = useState({
    name: players.name, age: players.age, team_id: players.team_id, team: players.team.name});
  return (
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
      {teams?.map(team => ( 
          player.team_id === team.id ? '' :
          <option key={team.id} value={team.id}>{team.name}</option>
          ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/');
  const players = await res.json();
  
  const paths = players.map(player => {
    return { params: { id: player.id.toString() } }
  });
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/player/${id}`);
  const players: Player = await res.json();

  const response = await fetch(`http://localhost:3000/team`);
  const teams: Teams = await response.json();
  console.log(players);
    
  return { props: { players, teams }, revalidate: 10 } 
}