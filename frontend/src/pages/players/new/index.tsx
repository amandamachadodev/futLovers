import { Teams } from '@/src/util/definition';
import { GetStaticProps } from 'next';
import { getTeams,  createPlayer } from '@/src/util/api';

export default function Form({teams}: Teams) {
  return (
    <form onSubmit={createPlayer}>
    <input type="text" name="name" />
    <input type="number" name= "age" />
    <select name="team_id">
    {teams?.map((team: Teams) => (
          <option key={team.id} value={team.id}>
              {team.name}
          </option>
        ))}
    </select>
    <button type="submit">Salvar</button>
  </form>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const teams: Teams = await getTeams();
    
  return { props: { teams }, revalidate: 10 } 
}
