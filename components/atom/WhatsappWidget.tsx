import { FloatingWhatsApp } from "react-floating-whatsapp";

const WhatsappWidget = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="8038888192"
      accountName="OGSoft Support"
      avatar="/logo.png"
      statusMessage="typing..."
      // allowClickAway
    />
  );
};

export default WhatsappWidget;
