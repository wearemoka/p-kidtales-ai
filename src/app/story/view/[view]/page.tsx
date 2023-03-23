"use client"
import { usePathname } from 'next/navigation';
import Style from './View.module.css';
import { useFetchStoryItem } from '@/app/hooks/useFetchStoryItem';
const View = () => {
    const path = usePathname()
    const splitPath = path.split('/')
    const { status, data } = useFetchStoryItem(splitPath[3] as string)
    const {box} = Style

    return (
        <div className={box}>
            {status === 'success' ? <>
                <h2>Title :: {data?.title}</h2>
                <p className={Style.description}>Description :: {data?.description}</p>
            </> : "Loading..."}
        </div>
    )
}
export default View;