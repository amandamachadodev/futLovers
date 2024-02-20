import { FormEvent } from 'react';
import { errorAlert, saveItemAlert } from './sweetAlert';
import { PlayerUpdate, Players, Teams } from './definition';

export async function createPlayer(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const player = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      team_id: Number(formData.get('team_id'))
    }
    if (player.name === '' || player.age === 0 || player.team_id === 0) {
      event.preventDefault();
      return errorAlert();
    }
    event.preventDefault();
    await fetch('http://localhost:3000/player/new', {
      method: 'POST',
      body: JSON.stringify(player),
      headers: { 'Content-Type': 'application/json' }
    })
    return saveItemAlert();
}

export async function deletePlayer(id: number) {
  await fetch(`http://localhost:3000/player/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function getPlayerId(id: string) {
  const res = await fetch(`http://localhost:3000/player/${id}`);
  const players: Players = await res.json();
  return players;
}

export async function getTeams() {
  const response = await fetch(`http://localhost:3000/team`);
  const teams: Teams = await response.json();
  return teams;
}

export async function getPlayers() {
  const response = await fetch(`http://localhost:3000/`);
  const players: Players = await response.json();
  return players;
}

export async function updatePlayer(id: string | string[] | undefined, player: PlayerUpdate) {
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
  return response;
}