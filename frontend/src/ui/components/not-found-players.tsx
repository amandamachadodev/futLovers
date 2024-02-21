import style from '@/src/ui/styles/dashborad.module.css';

export default function NotFoundPlayers() {
    return (
        <div className={style.notfound}>
            <p>There are no registered players...</p>
        </div>
        
    )
}