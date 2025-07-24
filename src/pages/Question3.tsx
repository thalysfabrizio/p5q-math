import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { List } from "lucide-react";
import Header from "@/components/layout/Header";
import BackLink from "@/components/layout/BackLink";
import OutputArea from "@/components/ui/output-area";

// Limite para o cálculo em tempo real para não sobrecarregar o navegador.
const MAX_CALCULO_REAL = 300;

// Definindo um tipo para a tripla para melhor organização
type TriplaPitagorica = { a: number; b: number; c: number };

const Question3 = () => {
  const [input, setInput] = useState("");
  const [erro, setErro] = useState("");
  
  const [totalTriplas, setTotalTriplas] = useState<number | null>(null);
  const [listaTriplas, setListaTriplas] = useState<TriplaPitagorica[]>([]);
  const [listaVisivel, setListaVisivel] = useState(false);

  const handleSubmit = () => {
    // 1. Resetar estados
    setErro("");
    setTotalTriplas(null);
    setListaTriplas([]);
    setListaVisivel(false);

    const N = parseInt(input);
    
    if (isNaN(N) || N <= 0) {
      setErro("Erro: Por favor, digite um limite superior positivo.");
      return;
    }

    if (N > MAX_CALCULO_REAL) {
      setErro(`Aviso: O limite para N é ${MAX_CALCULO_REAL} para garantir a performance do navegador.`);
      return;
    }

    // 2. Calcular as triplas
    const triplasEncontradas: TriplaPitagorica[] = [];
    for (let a = 1; a <= N; a++) {
      for (let b = a + 1; b <= N; b++) {
        const c = Math.sqrt(a * a + b * b);
        if (c % 1 === 0 && c <= N) {
          triplasEncontradas.push({ a, b, c });
        }
      }
    }
    
    // 3. Atualizar os estados com os resultados
    setListaTriplas(triplasEncontradas);
    setTotalTriplas(triplasEncontradas.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        
        <Card className="shadow-medium">
<CardHeader className="flex flex-row items-center justify-between bg-math-purple/10 border-b border-math-purple/20">
    <CardTitle className="text-2xl text-math-purple font-bold">
        3ª Questão: Triplas Pitagóricas
    </CardTitle>
    <BackLink />
</CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="q3-input" className="text-base font-medium">
                  Limite superior (N):
                </Label>
                <Input
                  id="q3-input"
                  type="number"
                  value={input}
                  onChange={(e) => {
                    // Aceita apenas inteiros positivos
                    const val = e.target.value.replace(/[^\d]/g, "");
                    setInput(val);
                  }}
                  placeholder="Ex: 50"
                  min="1"
                  step="1"
                  className="mt-2 text-lg"
                />
              </div>
              
              <Button 
                onClick={handleSubmit}
                size="lg"
                className="w-full"
              >
                Encontrar Triplas
              </Button>
              
              {erro && <OutputArea>{erro}</OutputArea>}

              {totalTriplas !== null && (
                <div className="pt-4 space-y-4">
                  <div className="text-center">
                    <p className="text-lg font-medium">
                      Quantidade de triplas encontradas:
                      <span className="ml-2 font-bold text-xl text-math-purple">{totalTriplas}</span>
                    </p>
                  </div>
                  
                  {totalTriplas > 0 && (
                     <div className="text-center">
                        <Button
                           variant="outline"
                           onClick={() => setListaVisivel(!listaVisivel)}
                        >
                           <List className="mr-2 h-4 w-4"/>
                           {listaVisivel ? "Ocultar Triplas" : "Exibir Triplas"}
                        </Button>
                     </div>
                  )}

                  {listaVisivel && (
                     <div className="mt-4 rounded-md border">
                       <Table>
                         <TableHeader>
                           <TableRow>
                             <TableHead className="text-center">a</TableHead>
                             <TableHead className="text-center">b</TableHead>
                             <TableHead className="text-center">c</TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {listaTriplas.map((tripla, index) => (
                             <TableRow key={index}>
                               <TableCell className="text-center font-medium">{tripla.a}</TableCell>
                               <TableCell className="text-center font-medium">{tripla.b}</TableCell>
                               <TableCell className="text-center font-medium">{tripla.c}</TableCell>
                             </TableRow>
                           ))}
                         </TableBody>
                       </Table>
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

export default Question3;