export default function PoliticaDePrivacidade() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Política de Privacidade - Aporte Certo
      </h1>
      <p className="mb-6">
        A <strong>Aporte Certo</strong> respeita sua privacidade e se compromete
        a proteger os dados pessoais coletados. Esta política descreve como
        tratamos suas informações, em conformidade com a LGPD.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Dados coletados</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Plano gratuito: nenhum dado pessoal é obrigatório.</li>
          <li>
            Plano pago: nome completo, e-mail, senha, CPF e endereço (se
            necessário para cobrança).
          </li>
          <li>
            Cookies e métricas: utilizamos Google Analytics para análise de uso
            do site.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. Finalidade do uso dos dados
        </h2>
        <p>
          Os dados são utilizados para autenticação de login, processamento de
          pagamento único, métricas de uso e melhoria da experiência.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          3. Compartilhamento de dados
        </h2>
        <p>
          Seus dados poderão ser compartilhados apenas com prestadores de
          serviço necessários ao funcionamento da plataforma, como:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Supabase</strong> – armazenamento e gestão de dados.
          </li>
          <li>
            <strong>AbacatePay</strong> – processamento de pagamentos via Pix.
          </li>
          <li>
            <strong>Google Analytics</strong> – coleta de métricas de navegação.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Direitos do usuário</h2>
        <p>
          Você pode solicitar a exclusão, correção ou acesso aos seus dados
          pessoais a qualquer momento, conforme previsto pela LGPD. Para exercer
          seus direitos, entre em contato pelo e-mail abaixo.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          5. Armazenamento e segurança
        </h2>
        <p>
          Seus dados são armazenados com medidas de segurança adequadas. No
          entanto, nenhum sistema é 100% seguro, e não podemos garantir proteção
          absoluta contra acessos não autorizados.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          6. Alterações desta política
        </h2>
        <p>
          A <strong>Aporte Certo</strong> poderá atualizar esta Política de
          Privacidade periodicamente, com aviso no site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contato</h2>
        <p>
          Para dúvidas ou solicitações relacionadas à privacidade, entre em
          contato pelo e-mail:{" "}
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
