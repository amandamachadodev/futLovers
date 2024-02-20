import { Team } from '@/src/util/definition';
import { GetStaticProps } from 'next';
import { getTeams,  createPlayer } from '@/src/util/api';
import Link from 'next/link';
import Header from '@/src/ui/components/header';

export default function Form({teams}: Team) {
  return (
    <div>
      <Header/>
      <Link href={`/`}>{`< back`}</Link>
      <form onSubmit={createPlayer}>
        <input type="text" name="name" />
        <input type="number" name= "age" />
        <select name="team_id">
        {teams?.map((team: Team) => (
              <option key={team.id} value={team.id}>
                  {team.name}
              </option>
            ))}
        </select>
        <button type="submit">Salvar</button>
      </form>
  </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const teams: Team = await getTeams();
    
  return { props: { teams }, revalidate: 10 } 
}
