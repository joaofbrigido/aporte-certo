export default function TermosDeUso() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Termos de Uso - Aporte Certo</h1>
      <p className="mb-6">
        Bem-vindo ao <strong>Aporte Certo</strong>. Ao utilizar nosso site, você
        concorda com os termos descritos abaixo.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Sobre a plataforma</h2>
        <p>
          O <strong>Aporte Certo</strong> oferece calculadoras que auxiliam
          investidores da B3 a economizar tempo e otimizar aportes mensais. Há
          um plano gratuito com anúncios e um plano pago (R$ 69,00 – pagamento
          único via Pix) que garante acesso sem anúncios.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Cadastro e uso</h2>
        <p>
          O uso do plano gratuito não exige cadastro. Para o plano pago, poderão
          ser solicitados nome, e-mail, senha e, eventualmente, CPF e endereço.
          Os dados fornecidos devem ser verdadeiros e atualizados.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Obrigações do usuário</h2>
        <p>
          O usuário pode utilizar livremente as calculadoras. Usuários não PRO
          visualizarão anúncios durante o uso da plataforma. Não há restrição de
          idade para utilização do serviço.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Pagamentos</h2>
        <p>
          O plano PRO é adquirido por meio de pagamento único via Pix,
          processado pela AbacatePay. Atualmente, não oferecemos política de
          reembolso para pagamentos realizados.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Responsabilidade</h2>
        <p>
          A <strong>Aporte Certo</strong> não se responsabiliza por danos
          diretos ou indiretos decorrentes do uso da plataforma, bem como por
          falhas técnicas de terceiros (provedor de hospedagem, banco de dados,
          etc.). Empregamos esforços razoáveis para manter a disponibilidade do
          serviço.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Alterações dos termos</h2>
        <p>
          A <strong>Aporte Certo</strong> poderá atualizar estes Termos de Uso a
          qualquer momento, com aviso no site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contato</h2>
        <p>
          Em caso de dúvidas, entre em contato pelo e-mail:{" "}
          <a
            href="mailto:suporte.aportecerto@gmai.com"
            className="text-primary underline"
          >
            suporte.aportecerto@gmai.com
          </a>
        </p>
      </section>
    </main>
  );
}
