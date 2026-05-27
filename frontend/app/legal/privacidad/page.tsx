import LegalPageLayout from '@/components/legal/LegalPageLayout';

export const metadata = {
  title: 'Política de Tratamiento de Datos — EcoHome',
};

export default function PrivacidadPage() {
  return (
    <LegalPageLayout title="Política de Tratamiento de Datos Personales" lastUpdated="1 de enero de 2025">
      <div className="prose-custom">

        <p>
          En cumplimiento de la <strong>Ley 1581 de 2012</strong> (Ley de Protección
          de Datos Personales), el <strong>Decreto 1377 de 2013</strong> y demás
          normas concordantes vigentes en la República de Colombia, <strong>EcoHome</strong> presenta
          su Política de Tratamiento de Datos Personales.
        </p>

        <h2>1. Responsable del Tratamiento</h2>
        <ul>
          <li><strong>Razón social:</strong> EcoHome Inc.</li>
          <li><strong>Domicilio:</strong> Medellín, Antioquia, Colombia.</li>
          <li><strong>Correo electrónico:</strong> datos@ecohome.co</li>
          <li><strong>Sitio web:</strong> ecohome.co</li>
        </ul>

        <h2>2. Datos Personales Recopilados</h2>
        <h3>2.1 Datos de identificación</h3>
        <ul>
          <li>Nombre completo</li>
          <li>Número de identificación (cédula de ciudadanía o NIT)</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Dirección del inmueble donde se instala el dispositivo</li>
        </ul>
        <h3>2.2 Datos de consumo energético</h3>
        <ul>
          <li>Mediciones de voltaje (V) y corriente eléctrica (A)</li>
          <li>Potencia calculada (W) y energía consumida (kWh)</li>
          <li>Timestamps de cada medición</li>
          <li>Identificador único del dispositivo instalado</li>
        </ul>
        <h3>2.3 Datos de uso de la plataforma</h3>
        <ul>
          <li>Dirección IP y datos del navegador</li>
          <li>Registros de acceso y actividad en la plataforma</li>
          <li>Preferencias y configuraciones del usuario</li>
        </ul>

        <h2>3. Finalidades del Tratamiento</h2>
        <p>EcoHome tratará los datos personales para las siguientes finalidades:</p>
        <ul>
          <li>Prestar el servicio de monitoreo de consumo energético.</li>
          <li>Generar reportes, alertas y recomendaciones personalizadas.</li>
          <li>Enviar notificaciones relacionadas con el servicio contratado.</li>
          <li>Mejorar los algoritmos de análisis y predicción de consumo.</li>
          <li>Cumplir obligaciones legales y contractuales.</li>
          <li>Atender solicitudes, quejas y reclamos (PQRS).</li>
          <li>Realizar análisis estadísticos anonimizados para investigación energética.</li>
        </ul>

        <h2>4. Derechos del Titular</h2>
        <p>
          De conformidad con el artículo 8 de la Ley 1581 de 2012, el titular
          de los datos personales tiene los siguientes derechos:
        </p>
        <ul>
          <li><strong>Conocer:</strong> Acceder gratuitamente a sus datos personales.</li>
          <li><strong>Actualizar:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
          <li><strong>Rectificar:</strong> Corregir información desactualizada o errónea.</li>
          <li><strong>Suprimir:</strong> Solicitar la eliminación de sus datos cuando no exista obligación legal de conservarlos.</li>
          <li><strong>Revocar:</strong> Retirar la autorización para el tratamiento de sus datos.</li>
          <li><strong>Acceder:</strong> Conocer el uso que se ha dado a sus datos personales.</li>
          <li><strong>Presentar quejas:</strong> Ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la normativa de protección de datos.</li>
        </ul>

        <h2>5. Autorización del Titular</h2>
        <p>
          EcoHome recolecta la autorización expresa del titular al momento del
          registro en la plataforma. Dicha autorización es previa, expresa e
          informada, en cumplimiento del artículo 9 de la Ley 1581 de 2012.
          El titular puede revocar su autorización en cualquier momento enviando
          una solicitud a <strong>datos@ecohome.co</strong>.
        </p>

        <h2>6. Transferencia y Transmisión de Datos</h2>
        <p>
          EcoHome podrá compartir datos personales con:
        </p>
        <ul>
          <li><strong>Supabase Inc.:</strong> Proveedor de base de datos en la nube, bajo acuerdo de confidencialidad y cumplimiento del GDPR y la Ley 1581 de 2012.</li>
          <li><strong>Proveedores de servicios tecnológicos:</strong> Únicamente los necesarios para la operación de la plataforma, bajo acuerdos de tratamiento de datos.</li>
        </ul>
        <p>
          EcoHome no vende ni cede datos personales a terceros con fines comerciales.
        </p>

        <h2>7. Medidas de Seguridad</h2>
        <p>
          EcoHome implementa medidas técnicas, administrativas y físicas para
          proteger los datos personales, incluyendo:
        </p>
        <ul>
          <li>Cifrado de datos en tránsito mediante HTTPS/TLS.</li>
          <li>Almacenamiento seguro con cifrado en reposo.</li>
          <li>Control de acceso basado en roles (RBAC).</li>
          <li>Monitoreo continuo de accesos y actividad sospechosa.</li>
          <li>Copias de seguridad periódicas.</li>
        </ul>

        <h2>8. Conservación de los Datos</h2>
        <p>
          Los datos personales serán conservados durante el tiempo en que el
          usuario mantenga una cuenta activa en EcoHome y por el período adicional
          que exijan las obligaciones legales aplicables en Colombia (mínimo 5 años
          para datos contables y fiscales, conforme al Código de Comercio).
        </p>

        <h2>9. Procedimiento para Ejercer Derechos</h2>
        <p>
          El titular puede ejercer sus derechos enviando una solicitud a
          <strong> datos@ecohome.co</strong> con los siguientes datos:
        </p>
        <ul>
          <li>Nombre completo y número de identificación.</li>
          <li>Descripción clara del derecho que desea ejercer.</li>
          <li>Documentos de soporte si aplica.</li>
        </ul>
        <p>
          EcoHome dará respuesta en un plazo máximo de <strong>10 días hábiles</strong>,
          prorrogables por 5 días hábiles adicionales cuando resulte necesario,
          conforme al artículo 14 de la Ley 1581 de 2012.
        </p>

        <h2>10. Cookies y Tecnologías de Seguimiento</h2>
        <p>
          La plataforma utiliza cookies técnicas estrictamente necesarias para
          el funcionamiento del servicio. No se utilizan cookies de seguimiento
          publicitario. El usuario puede configurar su navegador para rechazar
          cookies, aunque esto puede afectar el funcionamiento de algunas
          funcionalidades.
        </p>

        <h2>11. Modificaciones a la Política</h2>
        <p>
          EcoHome podrá modificar la presente Política en cualquier momento.
          Los cambios serán publicados en la plataforma y notificados al titular
          con al menos <strong>15 días de anticipación</strong> mediante correo
          electrónico.
        </p>

        <h2>12. Superintendencia de Industria y Comercio</h2>
        <p>
          El titular que considere que EcoHome ha incumplido la normativa de
          protección de datos puede presentar una queja ante la
          <strong> Superintendencia de Industria y Comercio (SIC)</strong>,
          autoridad de protección de datos en Colombia:
        </p>
        <ul>
          <li>Sitio web: <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer">www.sic.gov.co</a></li>
          <li>Línea gratuita: 01 8000 910 165</li>
          <li>Correo: contactenos@sic.gov.co</li>
        </ul>

        <h2>13. Contacto</h2>
        <p>
          Para cualquier consulta relacionada con el tratamiento de sus datos
          personales: <strong>datos@ecohome.co</strong>
        </p>

      </div>
    </LegalPageLayout>
  );
}
