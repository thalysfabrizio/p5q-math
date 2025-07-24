import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react"; // Ícones para loading e erro

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from "@/components/layout/Header";
import BackLink from "@/components/layout/BackLink";

// Se você já usa o componente OutputArea no seu projeto – e quer manter o código da página
// inicial literalmente igual ao primeiro arquivo – basta remover o comentário abaixo e
// seguir passando a string "output" como antes.  Caso contrário, ele não é mais necessário.
// import OutputArea from "@/components/ui/output-area";

// -----------------------------------------------------------------------------
// Tipos auxiliares (apenas dados; não interferem no layout original) ------------
// -----------------------------------------------------------------------------
interface AnalysisData {
  num: number;
  divisores: number[];
  somaDivisores: number;
  fatoresPrimos: number[];
}

interface AnalysisResult {
  analysisA: AnalysisData;
  analysisB: AnalysisData;
  mdc: number;
  mmc: number;
}

// -----------------------------------------------------------------------------
// Funções matemáticas (inalteradas em relação ao segundo arquivo) --------------
// -----------------------------------------------------------------------------
const getDivisores = (n: number): number[] => {
  const div = new Set<number>();
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      div.add(i);
      div.add(n / i);
    }
  }
  return Array.from(div).sort((a, b) => a - b);
};

const getFatoresPrimos = (n: number): number[] => {
  const fat: number[] = [];
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) {
      fat.push(d);
      n /= d;
    }
    d++;
  }
  if (n > 1) fat.push(n);
  return fat;
};

const getMDC = (a: number, b: number): number => {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

// -----------------------------------------------------------------------------
// Sub‑componente ONLY para exibir o resultado (vem do 2º arquivo) --------------
// -----------------------------------------------------------------------------
const AnalysisCard = ({ title, data }: { title: string; data: AnalysisData }) => (
  <Card className="flex-1 min-w-[280px]">
    <CardHeader>
      <CardTitle className="text-xl text-primary">{title}: {data.num}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3 text-sm">
      <div className="flex justify-between items-start">
        <strong className="text-muted-foreground">Divisores:</strong>
        <p className="text-right pl-4 break-all">{data.divisores.join(", ")}</p>
      </div>
      <div className="flex justify-between items-center">
        <strong className="text-muted-foreground">Total de divisores:</strong>
        <span className="font-mono bg-muted px-2 py-1 rounded">{data.divisores.length}</span>
      </div>
      <div className="flex justify-between items-center">
        <strong className="text-muted-foreground">Soma dos divisores:</strong>
        <span className="font-mono bg-muted px-2 py-1 rounded">{data.somaDivisores}</span>
      </div>
      <div className="flex justify-between items-start">
        <strong className="text-muted-foreground">Fatores primos:</strong>
        <p className="text-right pl-4 break-all">{data.fatoresPrimos.length > 0 ? data.fatoresPrimos.join(" × ") : "Nenhum"}</p>
      </div>
    </CardContent>
  </Card>
);

// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL  (mantém estrutura do 1º arquivo,  
//                      apenas adiciona a renderização moderna do resultado) ----
// -----------------------------------------------------------------------------
const Question5 = () => {
  // Estes estados já existiam (ou são equivalentes) no primeiro código -------------
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  // output segue disponível caso queira mantê‑lo para texto simples ---------------
  const [output, setOutput] = useState<string>("");

  // Novos estados para experiência interativa refinada ---------------------------
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Se preferir preservar o comportamento antigo de simplesmente preencher
    // "output", você pode remover todo o bloco abaixo e voltar à lógica anterior.
    // Aqui trazemos a UX do segundo código.

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    setTimeout(() => {
      const A = parseInt(inputA);
      const B = parseInt(inputB);

      if (isNaN(A) || isNaN(B) || A <= 0 || B <= 0) {
        setError("Erro: Por favor, digite dois números inteiros positivos.");
        setIsLoading(false);
        return;
      }

      const analisar = (num: number): AnalysisData => {
        const divisores = getDivisores(num);
        return {
          num,
          divisores,
          somaDivisores: divisores.reduce((s, v) => s + v, 0),
          fatoresPrimos: getFatoresPrimos(num),
        };
      };

      const mdc = getMDC(A, B);

      // Preenche tanto o formato estruturado…
      setAnalysisResult({
        analysisA: analisar(A),
        analysisB: analisar(B),
        mdc,
        mmc: (A * B) / mdc,
      });

      // …quanto a string simples, se você ainda usa <OutputArea> em algum lugar.
      setOutput(`MDC(${A}, ${B}) = ${mdc} — MMC(${A}, ${B}) = ${(A * B) / mdc}`);

      setIsLoading(false);
    }, 300); // Delay de 300 ms apenas para exibir o loader
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">

        <Card className="shadow-lg border-border/60">
<CardHeader className="flex flex-row items-center justify-between bg-muted/30">
    <CardTitle className="text-2xl text-primary font-bold">
        5ª Questão: Propriedades Numéricas
    </CardTitle>
    <BackLink />
</CardHeader>

          <CardContent className="p-6">
            {/* FORMULÁRIO — 100 % igual ao do primeiro arquivo */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="q5-input-a" className="text-base font-medium">Número A:</Label>
                  <Input
                    id="q5-input-a"
                    type="number"
                    value={inputA}
                    onChange={(e) => {
                      // Aceita apenas inteiros positivos
                      const val = e.target.value.replace(/[^\d]/g, "");
                      setInputA(val);
                    }}
                    placeholder="Digite o primeiro número"
                    min="1"
                    step="1"
                    className="mt-2 text-lg"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="q5-input-b" className="text-base font-medium">Número B:</Label>
                  <Input
                    id="q5-input-b"
                    type="number"
                    value={inputB}
                    onChange={(e) => {
                      // Aceita apenas inteiros positivos
                      const val = e.target.value.replace(/[^\d]/g, "");
                      setInputB(val);
                    }}
                    placeholder="Digite o segundo número"
                    min="1"
                    step="1"
                    className="mt-2 text-lg"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full text-base" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  "Analisar Números"
                )}
              </Button>
            </form>

            {/* RESULTADO — visível somente após o clique ---------------------------*/}
            <div className="mt-8 space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Ocorreu um Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {analysisResult && (
                <div className="space-y-6 animate-in fade-in-0 duration-500">
                  <div className="flex flex-wrap gap-6 justify-center">
                    <AnalysisCard title="Análise de A" data={analysisResult.analysisA} />
                    <AnalysisCard title="Análise de B" data={analysisResult.analysisB} />
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">Relação entre A e B</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <strong className="text-muted-foreground">MDC(A, B):</strong>
                        <span className="font-mono text-lg bg-muted px-3 py-1 rounded">{analysisResult.mdc}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <strong className="text-muted-foreground">MMC(A, B):</strong>
                        <span className="font-mono text-lg bg-muted px-3 py-1 rounded">{analysisResult.mmc}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Caso continue usando <OutputArea>, ele permanece funcional  --------*/}
              {/* <OutputArea output={output} /> */}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Question5;