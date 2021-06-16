import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();

    async function handleSubscribe() {
        if (!session) {
            signIn('google')
            return;
        }

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;


        } catch (err) {
            console.error(err);
        }
    }

     return (
         <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
         >
             Subscribe now
         </button>
     )
}