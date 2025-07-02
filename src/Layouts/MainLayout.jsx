import Wallpaper from '../Components/Wallpaper';
import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';
import CategoryBar from '../Components/CategoryBar';


const MainLayout = ({ children }) => (
    <div className="flex flex-col h-screen overflow-hidden relative">
        <Wallpaper />

        <header className="relative z-20">
            <NavBar />
            <CategoryBar />
        </header>

        <main className="flex-grow relative z-10 overflow-auto">
            {children}
        </main>

        <footer className="relative z-10">
            <Footer />
         </footer>
    </div>

);


export default MainLayout;
