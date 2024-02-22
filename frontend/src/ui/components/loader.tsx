import style from '../styles/loading.module.css';
/* eslint-disable @next/next/no-img-element */

export default function Loader() {
    return (
        <div className={style.loading}>
            <img
            alt="gif-loading"
            src="https://media2.giphy.com/media/OcKLo9xfUxnEgKUw7i/giphy.gif?cid=ecf05e478p9mdwv8tcklfnmf1zi28omj46ugvjdh5ioddpn1&ep=v1_gifs_related&rid=giphy.gif&ct=s"
            width={100}
            height={100}
            />
        </div>
    )
}