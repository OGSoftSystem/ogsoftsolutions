import { FloatingWhatsApp } from "react-floating-whatsapp";

const WhatsappWidget = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="+2348062526947"
      accountName="OGSoft Support"
      avatar="/logo.png"
      statusMessage="typing..."
      allowEsc={true}
      className="text-black"
    />
  );
};

export default WhatsappWidget;
