import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, List } from "lucide-react";
import Header from "@/components/layout/Header";
import BackLink from "@/components/layout/BackLink";
import OutputArea from "@/components/ui/output-area";

const MAX_CALCULO_REAL = 20000;
const KNOWN_PERFECTS = [
	6,
	28,
	496,
	8128,
	33550336,
	8589869056,
	137438691328,
	"2305843008139952128",
	"2658455991569831744654692615953842176",
	"191561942608236107294793378084303638130997321548169216",
];

const Question2 = () => {
	const [input, setInput] = useState("");
	const [info, setInfo] = useState("");
	const [totalPerfeitos, setTotalPerfeitos] = useState<number | null>(null);
	const [listaPerfeitos, setListaPerfeitos] = useState<(number | string)[]>([]);
	const [logCalculo, setLogCalculo] = useState("");
	const [logVisivel, setLogVisivel] = useState(false);
	const [listaVisivel, setListaVisivel] = useState(false);

	const isPerfeito = (num: number): boolean => {
		if (num < 2) return false;
		let somaDivisores = 1;
		for (let i = 2; i * i <= num; i++) {
			if (num % i === 0) {
				somaDivisores += i;
				if (i * i !== num) somaDivisores += num / i;
			}
		}
		return somaDivisores === num;
	};

	const handleSubmit = () => {
		setInfo("");
		setTotalPerfeitos(null);
		setListaPerfeitos([]);
		setLogCalculo("");
		setLogVisivel(false);
		setListaVisivel(false);

		const N = parseInt(input);

		if (isNaN(N) || N <= 1) {
			setInfo("Erro: Por favor, digite um número inteiro maior que 1.");
			return;
		}

		if (N > MAX_CALCULO_REAL) {
			// --- ALTERAÇÃO FINAL AQUI ---
			// A mensagem informativa agora vai para o 'logCalculo' e não mais para 'info'.
			setInfo(""); // Limpa a área de info principal
			setLogCalculo(
				`Para N > ${MAX_CALCULO_REAL}, o resultado é exibido instantaneamente com base em uma lista de números perfeitos conhecidos.`
			);

			const perfeitosEncontrados = KNOWN_PERFECTS.filter((p) => {
				const pNum = BigInt(p);
				return pNum <= N;
			});
			setListaPerfeitos(perfeitosEncontrados);
			setTotalPerfeitos(perfeitosEncontrados.length);
			// --- FIM DA ALTERAÇÃO ---
		} else {
			let logResult = `Verificando números de 2 até ${N}...\n\n`;
			const perfeitosCalculados: number[] = [];
			for (let i = 2; i <= N; i++) {
				if (isPerfeito(i)) {
					logResult += `${i} é perfeito\n`;
					perfeitosCalculados.push(i);
				} else {
					logResult += `${i} não é perfeito\n`;
				}
			}
			setLogCalculo(logResult);
			setListaPerfeitos(perfeitosCalculados);
			setTotalPerfeitos(perfeitosCalculados.length);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<div className="container mx-auto px-6 py-8 max-w-4xl">

				<Card className="shadow-medium">
<CardHeader className="flex flex-row items-center justify-between bg-math-green/10 border-b border-math-green/20">
    <CardTitle className="text-2xl text-math-green font-bold">
        2ª Questão: Números Perfeitos
    </CardTitle>
    <BackLink />
</CardHeader>
					<CardContent className="p-6">
						<div className="space-y-4">
							<div>
								<Label
									htmlFor="q2-input"
									className="text-base font-medium"
								>
									Digite um número inteiro positivo (N):
								</Label>
								<Input
									id="q2-input"
									type="number"
									value={input}
									onChange={(e) => {
										// Aceita apenas inteiros positivos
										const val = e.target.value.replace(/[^\d]/g, "");
										setInput(val);
									}}
									placeholder="Ex: 20000"
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
								Encontrar Perfeitos
							</Button>

							{info && (
								<OutputArea className="text-destructive font-medium">
									{info}
								</OutputArea>
							)}

							{totalPerfeitos !== null && (
								<div className="pt-4 space-y-4">
									<div className="text-center">
										<p className="text-lg font-medium">
											Quantidade de perfeitos encontrados:
											<span className="ml-2 font-bold text-xl text-math-green">
												{totalPerfeitos}
											</span>
										</p>
									</div>

									{(totalPerfeitos > 0 || logCalculo) && (
										<div className="flex items-center justify-center gap-x-2">
											{totalPerfeitos > 0 && (
												<Button
													variant="outline"
													onClick={() => setListaVisivel(!listaVisivel)}
												>
													<List className="mr-2 h-4 w-4" />
													{listaVisivel
														? "Ocultar Lista"
														: "Exibir Lista"}
												</Button>
											)}
											<Button
												variant="ghost"
												size="icon"
												onClick={() => setLogVisivel(!logVisivel)}
												className="hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground"
												aria-label="Ver log de cálculo"
											>
												{logVisivel ? (
													<Eye />
												) : (
													<EyeOff className="text-muted-foreground" />
												)}
											</Button>
										</div>
									)}

									{listaVisivel && (
                    <OutputArea className="mt-4">
											<ol
												className="space-y-1"
												style={{
													listStyleType: "none",
													paddingLeft: 0,
												}}
											>
												{listaPerfeitos.map((p, index) => (
													<li key={index}>
														<span className="font-semibold">
															{index + 1}º:
														</span>{" "}
														{typeof p === "number"
															? p.toLocaleString("pt-BR")
															: String(p)}
													</li>
												))}
											</ol>
										</OutputArea>
									)}

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

export default Question2;