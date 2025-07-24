import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/layout/Header";
import BackLink from "@/components/layout/BackLink";

/**
 * Question4 – Cifra Polinomial
 *
 * ✦ 1º grau é 100 % reversível (sem colisões).
 * ✦ 2º / 3º grau são permitidos MESMO com colisões. O componente detecta
 *   e avisa quantas colisões o polinômio gera no domínio ASCII 32‑126.
 */

const ASCII_MIN = 32; // primeiro caractere permitido (" ")
const MODULO = 95;    // 95 símbolos até 126 ("~")

// Exemplos prontos – a > 0 obrigatoriamente
const COEF_EXAMPLES = {
  1: ["3, 7"],
  2: ["1, 0, 0", "7, 5, 3"],
  3: ["1, 0, 0, 0", "5, 2, 9, 13"],
} as Record<number, string[]>;

const mod = (n: number) => ((n % MODULO) + MODULO) % MODULO;

const modInverse = (a: number): number => {
  for (let x = 1; x < MODULO; x++) {
    if ((a * x) % MODULO === 1) return x;
  }
  throw new Error("O coeficiente 'a' não possui inverso modular em 95.");
};

/**
 * Detecta colisões geradas por um polinômio de grau 2 ou 3
 * Retorna o número de colisões (0 = permutação).
 */
const detectCollisions = (coeff: number[], degree: number): number => {
  const seen = new Set<number>();
  let collisions = 0;
  for (let x = 0; x < MODULO; x++) {
    let y: number;
    if (degree === 2) {
      const [a, b, c] = coeff;
      y = mod(a * x * x + b * x + c);
    } else {
      const [a, b, c, d] = coeff;
      y = mod(a * x * x * x + b * x * x + c * x + d);
    }
    if (seen.has(y)) collisions++;
    else seen.add(y);
  }
  return collisions;
};

const Question4 = () => {
  const [mensagem, setMensagem] = useState("");
  const [grau, setGrau] = useState("1");
  const [coeffs, setCoeffs] = useState("");
  const [output, setOutput] = useState("");
  const [showExamples, setShowExamples] = useState(false);

  const processar = (
    msg: string,
    dir: "codificar" | "decodificar",
    coefficients: number[],
    degree: number
  ) => {
    const [a, b, c, d] = [
      coefficients[0] || 0,
      coefficients[1] || 0,
      coefficients[2] || 0,
      coefficients[3] || 0,
    ];

    // Pré‑mapeamento para decodificar (grau > 1) – pode ter colisões
    let mapa: Map<number, number> | null = null;
    if (dir === "decodificar" && degree > 1) {
      mapa = new Map();
      for (let i = 0; i < MODULO; i++) {
        const enc = processar(
          String.fromCharCode(i + ASCII_MIN),
          "codificar",
          coefficients,
          degree
        ).charCodeAt(0);
        if (!mapa.has(enc)) mapa.set(enc, i + ASCII_MIN);
      }
    }

    let res = "";
    for (const char of msg) {
      const code = char.charCodeAt(0);
      if (code < ASCII_MIN || code >= ASCII_MIN + MODULO) {
        res += char;
        continue;
      }

      let x = code - ASCII_MIN;
      let y: number;

      if (dir === "codificar") {
        if (degree === 1) y = mod(a * x + b);
        else if (degree === 2) y = mod(a * x * x + b * x + c);
        else y = mod(a * x * x * x + b * x * x + c * x + d);
        res += String.fromCharCode(y + ASCII_MIN);
      } else {
        if (degree === 1) {
          const inv = modInverse(a);
          y = mod(inv * (x - b));
          res += String.fromCharCode(y + ASCII_MIN);
        } else {
          const mapped = mapa!.get(code);
          res += String.fromCharCode((mapped ?? code));
        }
      }
    }
    return res;
  };

  const handleSubmit = () => {
    try {
      if (!mensagem || !coeffs.trim()) {
        throw new Error("Preencha a mensagem e os coeficientes.");
      }

      const degreeNum = parseInt(grau);
      const coeffArr = coeffs.split(",").map((n) => parseInt(n.trim()));
      const expected = degreeNum + 1;
      if (coeffArr.length !== expected) {
        throw new Error(`O grau selecionado exige ${expected} coeficientes.`);
      }
      if (coeffArr[0] === 0) {
        throw new Error("O coeficiente 'a' deve ser diferente de zero.");
      }

      // Detecta colisões (somente grau > 1)
      const collisions = degreeNum > 1 ? detectCollisions(coeffArr, degreeNum) : 0;

      const codificada = processar(mensagem, "codificar", coeffArr, degreeNum);
      const decodificada = processar(codificada, "decodificar", coeffArr, degreeNum);

      let result = `<p><strong>Mensagem Original:</strong><br>${mensagem}</p>`;
      result += `<p><strong>Codificada:</strong><br>${codificada}</p>`;
      result += `<p><strong>Decodificada:</strong><br>${decodificada}</p>`;
      if (collisions > 0) {
        result += `<p class="mt-2 text-yellow-800"><strong>⚠️ Atenção:</strong> O polinômio gera ${collisions} colisões; a decodificação pode não recuperar todos os caracteres originais.</p>`;
      }
      setOutput(result);
    } catch (err: any) {
      setOutput(`<p class="text-red-600 font-semibold">Erro: ${err.message}</p>`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-4xl px-6 py-8">

        <Card className="shadow-medium">
<CardHeader className="flex flex-row items-center justify-between bg-math-orange/20 border-b border-math-orange/10">
    <CardTitle className="text-2xl text-math-orange font-bold">
        4ª Questão: Cifra Polinomial
    </CardTitle>
    <BackLink />
</CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Mensagem */}
              <div>
                <Label htmlFor="q4-msg" className="text-base font-medium">
                  Mensagem:
                </Label>
                <Textarea
                  id="q4-msg"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Digite o texto aqui..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              {/* Grau + Coeficientes */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="q4-grau" className="text-base font-medium">
                    Grau da Função:
                  </Label>
                  <Select value={grau} onValueChange={setGrau}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1º Grau: f(x) = ax + b</SelectItem>
                      <SelectItem value="2">2º Grau: f(x) = ax² + bx + c</SelectItem>
                      <SelectItem value="3">3º Grau: f(x) = ax³ + bx² + cx + d</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="q4-coeffs" className="text-base font-medium">
                    Coeficientes (separados por vírgula):
                  </Label>
                  <Input
                    id="q4-coeffs"
                    value={coeffs}
                    onChange={(e) => {
                      // Aceita apenas inteiros e vírgulas
                      const val = e.target.value.replace(/[^\d,]/g, "");
                      setCoeffs(val);
                    }}
                    placeholder="Ex: 3,7"
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Botão de exemplos */}
              <Button
                variant="secondary"
                type="button"
                onClick={() => setShowExamples(!showExamples)}
                className="w-full"
              >
                {showExamples ? "Ocultar exemplos" : "Ver exemplos de coeficientes"}
              </Button>

              {showExamples && (
                <div className="rounded-lg border border-border bg-muted p-3 text-sm shadow-sm">
                  {Object.entries(COEF_EXAMPLES).map(([deg, list]) => (
                    <div key={deg} className="mb-2">
                      <p className="font-medium">
                        Grau {deg} ({deg === "1" ? "100% reversível" : "com colisões"}):
                      </p>
                      <ul className="ml-4 list-disc">
                        {list.map((ex) => (
                          <li
                            key={ex}
                            className="cursor-pointer hover:underline"
                            onClick={() => {
                              setGrau(deg);
                              setCoeffs(ex);
                            }}
                          >
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Executar */}
              <Button onClick={handleSubmit} size="lg" className="w-full">
                Codificar e Decodificar
              </Button>

              {/* Resultado */}
              {output && (
                <div
                  className="min-h-[80px] whitespace-pre-wrap break-words rounded-lg border border-border bg-muted p-4 text-sm font-mono shadow-soft"
                  dangerouslySetInnerHTML={{ __html: output }}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Question4;
