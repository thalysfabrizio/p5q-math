import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, List } from "lucide-react"; // <-- IMPORT DO ÍCONE LIST
import Header from "@/components/layout/Header";
import BackLink from "@/components/layout/BackLink";
import OutputArea from "@/components/ui/output-area";

const Question1 = () => {
  // --- ESTADOS ATUALIZADOS ---
  const [input, setInput] = useState("");
  const [totalPrimos, setTotalPrimos] = useState<number | null>(null);
  const [listaPrimos, setListaPrimos] = useState<number[]>([]); // <-- NOVO ESTADO PARA A LISTA
  const [logCalculo, setLogCalculo] = useState("");
  const [erro, setErro] = useState("");
  const [logVisivel, setLogVisivel] = useState(false); // Renomeado de 'detalhesVisiveis'
  const [listaVisivel, setListaVisivel] = useState(false); // <-- NOVO ESTADO PARA VISIBILIDADE DA LISTA

  const isPrimo = (num: number): boolean => {
    if (num <= 1) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const handleSubmit = () => {
    // --- RESET DOS NOVOS ESTADOS ---
    setTotalPrimos(null);
    setListaPrimos([]);
    setLogCalculo("");
    setErro("");
    setLogVisivel(false);
    setListaVisivel(false);

    const N = parseInt(input);
    
    if (isNaN(N) || N <= 1) {
      setErro("Erro: Por favor, digite um número inteiro maior que 1.");
      return;
    }

    let logResult = `Verificando números de 2 até ${N}:\n\n`;
    const primosCalculados: number[] = []; // Array local para coletar os primos
    
    for (let i = 2; i <= N; i++) {
      if (isPrimo(i)) {
        logResult += `P(${i}) = 1 \n`;
        primosCalculados.push(i); // <-- ADICIONA O PRIMO ENCONTRADO AO ARRAY
      } else {
        logResult += `P(${i}) = 0 \n`;
      }
    }
    
    // --- ATUALIZA TODOS OS ESTADOS AO FINAL ---
    setTotalPrimos(primosCalculados.length);
    setListaPrimos(primosCalculados);
    setLogCalculo(logResult);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        
        <Card className="shadow-medium">
<CardHeader className="flex flex-row items-center justify-between bg-math-blue/5 border-b border-math-blue/20">
    <CardTitle className="text-2xl text-math-blue font-bold">
        1ª Questão: Números Primos
    </CardTitle>
    <BackLink />
</CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="q1-input" className="text-base font-medium">
                  Digite um número inteiro positivo (N):
                </Label>
                <Input
                  id="q1-input"
                  type="number"
                  value={input}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d]/g, "");
                    setInput(val);
                  }}
                  placeholder="Ex: 100"
                  min="2"
                  step="1"
                  className="mt-2 text-lg"
                />
              </div>
              
              <Button 
                onClick={handleSubmit}
                size="lg"
                className="w-full"
              >
                Encontrar Primos
              </Button>
              
              {erro && <OutputArea className="text-destructive font-medium">{erro}</OutputArea>}

              {/* --- SEÇÃO DE RESULTADOS TOTALMENTE REFEITA (MODELO 'Question2') --- */}
              {totalPrimos !== null && (
                <div className="pt-4 space-y-4">
                  <div className="text-center">
                    <p className="text-lg font-medium">
                        Quantidade total de primos encontrados:
                        <span className="ml-2 font-bold text-xl text-math-blue">{totalPrimos}</span>
                    </p>
                  </div>

                  {/* Botões para controlar visibilidade */}
                  {(totalPrimos > 0 || logCalculo) && (
                     <div className="flex items-center justify-center gap-x-2">
                        {totalPrimos > 0 && (
                           <Button
                            variant="outline"
                            onClick={() => setListaVisivel(!listaVisivel)}
                           >
                            <List className="mr-2 h-4 w-4" />
                            {listaVisivel ? "Ocultar Lista" : "Exibir Lista"}
                           </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setLogVisivel(!logVisivel)}
                            aria-label="Ver log de cálculo"
                            className="hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground"
                        >
                           {logVisivel ? <Eye /> : <EyeOff className="text-muted-foreground" />}
                        </Button>
                     </div>
                  )}

                  {/* Área da Lista de Primos */}
                  {listaVisivel && (
                    <OutputArea>
                      <p className="font-semibold text-center">Lista de Primos Encontrados:</p>
                      <p className="text-center mt-2 break-words">
                        {listaPrimos.join(", ")}
                      </p>
                    </OutputArea>
                  )}
                  
                  {/* Área do Log de Cálculo */}
                  {logVisivel && (
                    <div className="mt-4">
                      <OutputArea>
                        <pre className="text-sm font-sans whitespace-pre-wrap">
                            {logCalculo}
                        </pre>
                      </OutputArea>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Question1;