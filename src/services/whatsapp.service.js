async function enviarMensagemWhatsapp({ telefone, mensagem }) {
  const whatsappToken = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!whatsappToken || !phoneNumberId) {
    console.log('--- MODO SIMULADO WHATSAPP ---');
    console.log(`Para: ${telefone}`);
    console.log(mensagem);
    console.log('------------------------------');

    return {
      simulado: true,
      telefone,
      mensagem
    };
  }

  const resposta = await fetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: telefone,
        type: 'text',
        text: {
          body: mensagem
        }
      })
    }
  );

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(JSON.stringify(resultado));
  }

  return resultado;
}

export default {
  enviarMensagemWhatsapp
};