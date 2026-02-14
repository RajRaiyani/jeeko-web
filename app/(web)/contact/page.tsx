import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaRegClock, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/pages/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="w-full min-h-[80vh] px-2 pt-0">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12 pt-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
        <div className="w-24 h-1 bg-primary mx-auto my-2" />
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          We&apos;re here to help! Reach out for product inquiries, support, or
          just to say hello. Our team will get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-4 mb-15 rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="Jeeko Agro Industries Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.0382621220806!2d70.63602267529136!3d22.259444179715963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cd0078ebc8eb%3A0xc22087af2a2420dd!2sJEEKO%20AGRITECH%20LLP!5e1!3m2!1sen!2sin!4v1757067033891!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Additional Contact Information */}
      <div className="max-w-6xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Other Ways to Reach Us
          </h3>
          <p className="text-gray-600">
            Choose the method that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <IoCall className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Sales Inquiry</h4>
            <p className="text-sm text-gray-600">
              For product information and quotes
            </p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <IoMdMail className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Technical Support</h4>
            <p className="text-sm text-gray-600">
              For product support and troubleshooting
            </p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaWhatsapp className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Quick Chat</h4>
            <p className="text-sm text-gray-600">
              Instant messaging for quick questions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mt-14 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pb-5 items-start">
        {/* Contact Info */}
        <div className="space-y-5">
          <div className="p-6 flex items-start gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="bg-primary rounded-xl p-3">
              <IoCall className="size-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Call Us</div>
              <div className="text-gray-600">+91 99252 32951</div>
              <div className="text-xs text-gray-500 mt-1">
                Available during business hours
              </div>
            </div>
          </div>

          <div className="p-6 flex items-start gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="bg-primary rounded-xl p-3">
              <IoMdMail className="size-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Email</div>
              <div className="text-gray-600">jeekoagritech@gmail.com</div>
              <div className="text-xs text-gray-500 mt-1">
                We&apos;ll respond within 24 hours
              </div>
            </div>
          </div>

          <div className="p-6 flex items-start gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="bg-primary rounded-xl p-3">
              <FaRegClock className="size-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Operational Hours</div>
              <div className="text-gray-600">09:00 AM - 05:00 PM</div>
              <div className="text-xs text-gray-500 mt-1">
                Monday to Saturday
              </div>
            </div>
          </div>

          <div className="p-6 flex items-start gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="bg-primary rounded-xl p-3">
              <FaLocationDot className="size-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Location</div>
              <div className="text-gray-600">
                Plot no:-332, Road-R, Gate NO. 2, Phase -1 khirasara GIDC,
                <br />
                Tal. Lodhika, Rajkot -360021, Gujarat, India.
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/919925232951?text=Hello, I would like to inquire about your products."
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <FaWhatsapp className="size-5" /> Enquire on WhatsApp
            </Button>
          </a>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-800 font-medium mb-2">
              Need immediate assistance?
            </p>
            <p className="text-xs text-blue-600">
              For urgent inquiries, please call us directly or use WhatsApp for
              faster response.
            </p>
          </div>
        </div>

        {/* Contact Form (client component) */}
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
