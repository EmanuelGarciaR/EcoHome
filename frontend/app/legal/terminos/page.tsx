import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Términos y Condiciones — EcoHome',
};

export default function TerminosPage() {
  return (
    <LegalPageLayout title="Términos y Condiciones" lastUpdated="24 de mayo de 2026">
      <div className="prose-custom">

        <p>
          Bienvenido a <strong>EcoHome</strong>. Al acceder y utilizar nuestra
          plataforma de monitoreo de consumo energético, usted acepta los
          presentes Términos y Condiciones, los cuales se rigen por las leyes
          de la República de Colombia, en especial la Ley 1480 de 2011
          (Estatuto del Consumidor) y la Ley 527 de 1999 (Comercio Electrónico).
        </p>

        <h2>1. Definiciones</h2>
        <ul>
          <li><strong>EcoHome:</strong> Plataforma tecnológica de monitoreo de consumo energético residencial.</li>
          <li><strong>Usuario:</strong> Persona natural o jurídica que accede y utiliza los servicios de EcoHome.</li>
          <li><strong>Dispositivo:</strong> Hardware (amperímetro y voltímetro) instalado en el inmueble del usuario.</li>
          <li><strong>Plataforma:</strong> Aplicación web y servicios asociados disponibles a través de EcoHome.</li>
          <li><strong>Datos de consumo:</strong> Información de voltaje, corriente, potencia y energía recopada por los dispositivos.</li>
        </ul>

        <h2>2. Objeto del Servicio</h2>
        <p>
          EcoHome presta servicios de monitoreo, análisis y visualización del consumo
          energético residencial mediante dispositivos de medición instalados en el
          inmueble del usuario. La plataforma genera reportes, alertas y
          recomendaciones con base en los datos recopilados.
        </p>

        <h2>3. Condiciones de Uso</h2>
        <h3>3.1 Registro y Cuenta</h3>
        <p>
          El usuario debe proporcionar información veraz, completa y actualizada
          al momento del registro. Es responsabilidad exclusiva del usuario
          mantener la confidencialidad de sus credenciales de acceso.
        </p>
        <h3>3.2 Uso Permitido</h3>
        <p>El usuario se compromete a utilizar la plataforma exclusivamente para:</p>
        <ul>
          <li>Monitorear el consumo energético de su propio inmueble.</li>
          <li>Consultar reportes y estadísticas de consumo.</li>
          <li>Configurar alertas y notificaciones personalizadas.</li>
        </ul>
        <h3>3.3 Usos Prohibidos</h3>
        <p>Queda expresamente prohibido:</p>
        <ul>
          <li>Usar la plataforma para fines ilegales o no autorizados.</li>
          <li>Intentar acceder a datos de otros usuarios.</li>
          <li>Interferir con el funcionamiento de los dispositivos o la plataforma.</li>
          <li>Reproducir, distribuir o comercializar el contenido de la plataforma sin autorización.</li>
        </ul>

        <h2>4. Instalación y Funcionamiento del Dispositivo</h2>
        <p>
          El usuario es responsable de garantizar que la instalación del dispositivo
          (amperímetro y voltímetro) sea realizada por un electricista certificado,
          cumpliendo con el Reglamento Técnico de Instalaciones Eléctricas (RETIE)
          vigente en Colombia. EcoHome no se hace responsable por daños derivados
          de una instalación inadecuada.
        </p>

        <h2>5. Disponibilidad del Servicio</h2>
        <p>
          EcoHome procurará mantener la plataforma disponible de forma continua,
          sin embargo no garantiza una disponibilidad del 100%. Podrán presentarse
          interrupciones por mantenimiento, actualizaciones o causas de fuerza mayor.
          EcoHome notificará con anticipación las interrupciones programadas.
        </p>

        <h2>6. Propiedad Intelectual</h2>
        <p>
          Todos los derechos de propiedad intelectual sobre la plataforma, su diseño,
          algoritmos, marcas y contenidos son de titularidad exclusiva de EcoHome.
          Se prohíbe su reproducción total o parcial sin autorización escrita previa.
        </p>

        <h2>7. Limitación de Responsabilidad</h2>
        <p>
          EcoHome no será responsable por decisiones tomadas por el usuario con base
          en la información de la plataforma. Los datos de consumo son estimaciones
          basadas en las mediciones del dispositivo y pueden tener variaciones respecto
          a la factura oficial de la empresa prestadora del servicio de energía.
        </p>

        <h2>8. Modificaciones</h2>
        <p>
          EcoHome se reserva el derecho de modificar los presentes Términos y
          Condiciones en cualquier momento. Los cambios serán notificados al usuario
          mediante correo electrónico o aviso en la plataforma con al menos 15 días
          de anticipación.
        </p>

        <h2>9. Ley Aplicable y Jurisdicción</h2>
        <p>
          Los presentes Términos y Condiciones se rigen por las leyes de la República
          de Colombia. Para cualquier controversia, las partes se someten a la
          jurisdicción de los jueces y tribunales competentes de la ciudad de
          Medellín, Antioquia, renunciando a cualquier otro fuero que pudiera
          corresponderles.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Para cualquier consulta sobre estos Términos y Condiciones, puede
          contactarnos a través de: <strong>legal@ecohome.co</strong>
        </p>

      </div>
    </LegalPageLayout>
  );
}
