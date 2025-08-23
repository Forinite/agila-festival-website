import ContactForm from "@/app/components/ui/contactForm";
import ContactInfo from "@/app/components/ui/contactInfo";
import SocialLinks from "@/app/components/ui/socialLinks";
import AdminContacts from "@/app/components/ui/adminContacts";

const ContactSection = () => {
    return (
        <section id="contact" className="py-16 bg-[#ededed]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Contact <span className="text-red-500">Us</span>
                    </h2>
                    <h5 className="md:text-md text-xs text-gray-500 max-w-3xl mx-auto">  Office address: <address>17 OGIRI OKO STREET, OTUKPO, BENUE STATE</address></h5>
                    <p className="md:text-lg text-sm text-gray-600 max-w-3xl mx-auto">
                        Get in touch with the Agila Carnival team for inquiries, partnerships, media requests, or any questions about the festival.
                    </p>
                </div>

                <AdminContacts />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ContactForm />
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                            <ContactInfo />
                        </div>
                        <SocialLinks />
                        {/*<MediaResources />*/}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;