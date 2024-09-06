import { useContext } from 'react'
import { UserStore } from '../store/user-store'
import Button from './button';
import ThemeButton from '../theme';
import useUser from '../hooks/useUser';

export default function Navbar({handlePopup}: {handlePopup?: ()=> void}) {
    const { userName } = useContext(UserStore);
    const { logout } = useUser();

    return (
        <div className='flex w-full dark:bg-black dark:text-white items-center justify-between py-3'>
            <h3>Pizeonfy Privated Ltd</h3>

            <h1 className='font-bold text-4xl'>{userName}</h1>
            
            <div className='flex '>
                <ThemeButton />

                {handlePopup && <Button
                    label='Add Post'
                    onClick={handlePopup}
                />}
                <Button
                    label='Logout'
                    onClick={() => {
                        logout();
                    }}
                />
            </div>
        </div>
    )
}
