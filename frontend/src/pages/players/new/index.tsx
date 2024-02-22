import { TeamProps } from '@/src/lib/definition';
import { GetStaticProps } from 'next';
import { getTeams,  createPlayer } from '@/src/lib/api';
import Link from 'next/link';
import Header from '@/src/ui/components/header';
import style from '@/src/ui/styles/form.module.css';
import { inter } from '@/src/ui/fonts';

export default function Form({teams}: TeamProps) {
  return (
    <div className={inter.className}>
      <Header/>
      <div className={style.content}>
        <h1>Insert player</h1>
        <Link className={style.link} href={`/`}>{`< back`}</Link>
      </div>
      <form className={style.form} onSubmit={createPlayer}>
        <div className={style.input}>
          <input className={style.items} type="text" name="name" placeholder="Name"/>
          <input className={style.items} type="number" name= "age" placeholder="Age"/>
        </div>
        <select className={style.select} name="team_id">
        {teams?.map((team) => (
              <option key={team.id} value={team.id}>
                  {team.name}
              </option>
            ))}
        </select>
        <button className={style.button} type="submit">Salvar</button>
      </form>
  </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const teams: TeamProps = await getTeams();
    
  return { props: { teams }, revalidate: 10 } 
}
