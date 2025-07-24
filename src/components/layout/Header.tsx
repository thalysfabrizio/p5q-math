import { Link } from "react-router-dom";
// 1. Importe sua logo aqui
import logo from "../../assets/logo.png"; // <-- Atualize o caminho para sua logo

const Header = () => {
  return (
    <header className="bg-gradient-hero text-white py-8 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          {/* 2. Adicione as classes flex e adicione a tag da imagem */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans flex items-center justify-center">
            <img src={logo} alt="Logo" className="h-24 mr-4" /> {/* <-- Sua logo */}
            <span></span>
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-90">
            Solucionador de Problemas - Matemática Discreta
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;