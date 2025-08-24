import Footer from "@/app/(store)/components/footer";
import Navbar from "@/app/(store)/components/navbar";
import React from "react";

const Privacy = () => {
  return (
    <div className="bg-black">
        <Navbar />
      <div className="bg-black">
        <h1 className="font-bold text-4xl text-amber-800 text-center">Privacy & Policies</h1>
        <div className="font-semibold mx-5 sm:mx-72 my-20 text-left text-white">
          ⸻ 1. Nuva - 7-Day Return & Exchange Policy Eligibility <br /> =&#62; Returns or
          exchanges must be requested within 7 calendar days of delivery (the
          date the courier marks the parcel as delivered). <br /> =&#62; Items must be
          unworn, unwashed, and in original condition with all tags attached.<br /> =&#62;
          Vintage items sometimes show minor age-related wear; such
          characteristics are noted on product pages and are not considered
          defects.<br /> <br /> <p className="text-xl font-bold text-center text-amber-800">How to start a return:</p> <br /> =&#62; Email us at nuvathrift@gmail.com with: <br /> •
          order number • item(s) you're returning or exchanging • brief reason
          (size, change of mind, defect, etc.) <br /> =&#62; We'll reply within one
          business day with a Return Authorization (RA) number and the return
          address.<br /> =&#62; Pack items securely, write the RA number on the outside of
          the parcel, and ship them back using any tracked service. Return
          shipping is at the buyer's expense unless we shipped the wrong or
          defective item. Refunds & exchanges • Refunds are issued to the
          original payment method within 3 - 5 business days after we receive
          and inspect the return. • Exchanges ship out within two business days
          of approval; we'll email you a new tracking number. • Non-returnable
          items: final-sale products, gift cards, and any item explicitly marked
          “non-returnable” on the product page. Late requests • Returns
          requested after 7 days may be declined. <br /> ⸻ 2. Nuva - Standard Privacy Policy (Plain-English
          Outline) <br /> =&#62; What we collect • Name, shipping address, email, phone
          (for order updates) • Payment details (processed securely by Payments; we never see full card numbers) • Browsing
          data: cookies, IP address, device type (to improve site performance
          and marketing) <br /> =&#62; How we use your data • Fulfil and ship orders • Send
          order confirmations, shipping updates, and occasional promos (opt-out
          anytime) • Improve site layout, product selection, and advertising
          relevance • Detect and prevent fraud <br /> =&#62; Sharing & disclosure • Never
          sold to third parties • Shared only with trusted service providers
          needed to run the business (payment gateways, courier APIs, email
          marketing platform), all bound by confidentiality agreements <br /> =&#62; Data
          security • SSL encryption on every page • Payment info handled only by
          PCI-compliant processors • Access to customer data restricted to
          authorized Nuva staff <br /> =&#62; Your choices & rights • Access, correct, or
          delete your data — email: nuvathrift@gmail.com • Opt-out of marketing emails
          via the unsubscribe link or by contacting us • Disable cookies in your
          browser (site may lose some functionality) <br /> =&#62; Retention • Order
          records kept for legal/tax purposes (typically 7 years) • Marketing
          data deleted or anonymized after 24 months of inactivity <br /> =&#62; Contact us
          Questions about privacy? Write to nuvathrift@gmail.com or: Nuva, 123
          Vintage Street, Karachi, Pakistan.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
