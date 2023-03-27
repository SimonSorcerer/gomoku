import { Game } from './components/Game';
import { Title } from './components/title/Title';

export const App: React.FC = () => {
    return (
        <div className='app'>
            <Title />
            <Game />
        </div>
    );
};
