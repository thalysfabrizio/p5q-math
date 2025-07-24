import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, Hash, Triangle, Lock, BarChart3 } from "lucide-react";
import Header from "@/components/layout/Header";

// Dados das questões
const questions = [
  {
    id: 1,
    title: "Questão 1 - Números Primos",
    description: "Identificar todos os números primos até um limite N",
    path: "/question-1",
    icon: Hash,
    color: "math-blue"
  },
  {
    id: 2,
    title: "Questão 2 - Números Perfeitos",
    description: "Encontrar números perfeitos em um intervalo",
    path: "/question-2",
    icon: Calculator,
    color: "math-green"
  },
  {
    id: 3,
    title: "Questão 3 - Triplas Pitagóricas",
    description: "Descobrir triplas pitagóricas com limite superior",
    path: "/question-3",
    icon: Triangle,
    color: "math-purple"
  },
  {
    id: 4,
    title: "Questão 4 - Cifra Polinomial",
    description: "Codificar e decodificar mensagens usando funções polinomiais",
    path: "/question-4",
    icon: Lock,
    color: "math-orange"
  },
  {
    id: 5,
    title: "Questão 5 - Propriedades Numéricas",
    description: "Analisar divisores, fatores primos, MDC e MMC",
    path: "/question-5",
    icon: BarChart3,
    color: "primary"
  }
];

// Componente da página principal
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Menu de Questões
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((question) => {
            const Icon = question.icon;
            return (
              // CORREÇÃO 1: Trocamos o <Link> por uma <div>. A key e a classe 'group' permanecem.
              <div key={question.id} className="group">
                <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-medium transition-all duration-200 group-hover:scale-[1.02] h-full flex flex-col">
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      question.color === 'math-blue' ? 'bg-math-blue/10 text-math-blue' :
                      question.color === 'math-green' ? 'bg-math-green/10 text-math-green' :
                      question.color === 'math-purple' ? 'bg-math-purple/10 text-math-purple' :
                      question.color === 'math-orange' ? 'bg-math-orange/10 text-math-orange' :
                      'bg-primary/10 text-primary'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg text-card-foreground">
                      {question.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {question.description}
                  </p>

                  {/* CORREÇÃO 2: O Button usa 'asChild' para passar seus estilos para o Link interno */}
                  <Button asChild variant="menu" size="menu" className="w-full mt-auto">
                    <Link to={question.path}>
                      Abrir Questão
                    </Link>
                  </Button>
                  
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 text-center">
          <div className="bg-muted/50 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-muted-foreground leading-relaxed">
              Projeto desenvolvido para a disciplina de Matemática Discreta, com o objetivo de praticar conceitos apresentados em sala de aula.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;