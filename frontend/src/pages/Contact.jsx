import { Heading } from "../components/common/UI";
import ContactForm from "../components/common/ContactForm";
import Icon from "../components/common/Icon";
export default function Contact() {
  return (
    <section className="section page">
      <Heading
        eyebrow="HABLEMOS DE TU PRÓXIMA AVENTURA"
        title="Cada viaje empieza con una conversación"
      >
        Cuéntanos qué tienes en mente. Nos encantará imaginarlo contigo.
      </Heading>
      <div className="contact-grid">
        <div>
          <Icon name="mail" size={36} />
          <h2>
            Tu próximo destino
            <br />
            puede empezar aquí.
          </h2>
          <p>
            ¿Una escapada con amigas, un viaje por tu cuenta o unos días para
            reconectar?
          </p>
          <div className="whatsapp">
            <h3>WhatsApp empresarial</h3>
            <p>
              Canal pendiente de habilitación. Aún no se ha proporcionado un
              número de contacto.
            </p>
          </div>
          <span className="handwritten">El mundo te espera.</span>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
