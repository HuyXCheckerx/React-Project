import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Award, Users, ShieldCheck, AlertTriangle, Banknote } from 'lucide-react';

const TermsPage = ({ variants, transition }) => {
  const termsSections = [
    {
      icon: Lock,
      title: "Service Agreement & Usage Policy",
      color: "text-purple-400",
      points: [
        "All services, tools, and educational materials provided by Cryoner Project are intended for legitimate professional development, research, and authorized security testing purposes only.",
        "Users assume full responsibility for their actions and must ensure their use of Cryoner Project services complies with all applicable local, national, and international laws, regulations, and ethical guidelines.",
        "Unauthorized or malicious use of any Cryoner Project service is strictly prohibited and may result in immediate service termination and potential legal action.",
        "Cryoner Project reserves the right to refuse or terminate service to any individual or entity at its sole discretion, particularly in cases of suspected misuse or violation of these terms.",
      ]
    },
    {
      icon: Banknote,
      title: "Payment & Subscription Terms",
      color: "text-cyan-400",
      points: [
        "Payments for services are processed exclusively through approved cryptocurrency channels as specified at checkout.",
        "All transactions are final and non-refundable once a service is activated or digital goods are delivered, except where explicitly stated otherwise.",
        "Subscription services, if offered, will be billed according to the terms specified at the time of purchase. Users are responsible for managing their subscriptions.",
        "Cryoner Project is not responsible for fluctuations in cryptocurrency values. The amount due in cryptocurrency will be determined at the time of transaction.",
      ]
    },
    
    {
      icon: Users,
      title: "Support & Warranty Policy",
      color: "text-red-400",
      points: [
        "Support is provided for premium services through designated secure channels (e.g., Telegram: @pillowware). Response times may vary.",
        "Support is limited to the direct functionality of Cryoner Project services and does not extend to third-party applications or user-specific system configurations.",
        "Warranty is only valid for 1 day with the case of checkers/parsers and 6 days(accounts/hits/ccs)`",
      ]
    },
    {
      icon: ShieldCheck,
      title: "Confidentiality & Data Integrity",
      color: "text-teal-400",
      points: [
        "Client confidentiality is maintained. We do not share identifiable client information with unauthorized third parties, except as required by law.",
        "Users are solely responsible for the security and confidentiality of their own data, API keys, and access credentials related to Cryoner Project services.",
        "Cryoner Project is not liable for data loss or security breaches resulting from user negligence or compromise of their own systems.",
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      color: "text-yellow-400",
      points: [
        "Cryoner Project, its creators, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to the use or inability to use our services.",
        "This includes, but is not limited to, damages for loss of profits, data, goodwill, or other intangible losses, even if advised of the possibility of such damages.",
        "The user agrees to indemnify and hold harmless Cryoner Project from any claims, damages, or expenses arising from their use of the services in violation of these terms or applicable laws.",
      ]
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="pt-20"
    >
      <section id="terms" className="py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'circOut' }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text tracking-tight title-animate">Terms of Service</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto font-roboto-mono">
              Read this carefully before purchasing any services or make any deals to avoid wasting both of our time.
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-2xl p-8 md:p-12 shadow-2xl border border-border/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            viewport={{ once: true }}
          >
            <img 
              src="/terms.png"
              className="w-full h-full object-contain rounded-xl shadow-xl border border-border/40 mx-auto mb-8"
            />
            <div className="space-y-12">
              {termsSections.map((section, index) => (
                <motion.div 
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'circOut' }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="border-b border-border/30 pb-8 last:border-b-0 last:pb-0"
                >
                  <h2 className={`text-2xl md:text-3xl font-semibold mb-6 flex items-center ${section.color} title-animate`}>
                    <section.icon className={`mr-3.5 flex-shrink-0 ${section.color}`} size={28} />
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-foreground/80 font-roboto-mono text-base leading-relaxed">
                    {section.points.map((point, idx) => (
                      <p key={idx} className="text-justify">{point}</p>
                    ))}
                  </div>
                </motion.div>
              ))}

              <motion.div 
                className="bg-secondary/30 rounded-xl p-6 mt-10 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: termsSections.length * 0.1, ease: 'circOut' }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2 text-primary font-orbitron-specific title-animate">Important Notice</h3>
                <p className="text-foreground/70 text-sm font-roboto-mono">
                  By engaging with Cryoner Project services or accessing this website, you acknowledge your understanding and unqualified acceptance
                  of these Terms of Service. These terms are designed to ensure a professional, secure, and ethical
                  environment for all users. Cryoner Project reserves the right to update these terms at any time without prior notice; continued use of services constitutes acceptance of such changes.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default TermsPage;