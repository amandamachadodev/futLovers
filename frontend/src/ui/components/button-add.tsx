import style from '@/src/ui/styles/button-add.module.css';
import { IoAddOutline } from "react-icons/io5";

export function ButtonAdd() {
    return (
        <div>
            <button type="button"className={style.buttonadd}>
               <span><IoAddOutline color='white' size={20}/></span>
               <span>ADD PLAYER</span>
            </button>
        </div>
    )
}