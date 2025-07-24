import { Link } from "react-router-dom";

const BackLink = () => {
  return (
    <Link 
      to="/" 
      // Trocamos 'text-primary' por 'text-muted-foreground'
      // E o hover agora usa a cor de texto principal 'text-foreground'
      className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
      aria-label="Voltar para a página inicial"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    </Link>
  );
};

export default BackLink;