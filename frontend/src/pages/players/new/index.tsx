import { Teams } from '@/src/util/definition';
import onSubmitCreate from '@/src/util/submit';
import { GetStaticProps } from 'next';

export default function Form({teams}: Teams) {
  return (
    <form onSubmit={onSubmitCreate}>
    <input type="text" name="name" />
    <input type="number" name= "age" />
    <select name="team_id">
    {teams?.map(team => (
          <option key={team.id} value={team.id}>
              {team.name}
          </option>
        ))}
    </select>
    <button type="submit">Submit</button>
  </form>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/team');
  const teams: Teams = await res.json();
    
  return { props: { teams }, revalidate: 10 } 
}
