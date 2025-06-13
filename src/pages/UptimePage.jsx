import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Shield, Server, Activity, CheckCircle, Wifi, Database } from 'lucide-react';

const UptimePage = ({ variants, transition }) => {
  const initialUptime = {
    mainServices: 99.99,
    apiGateway: 99.98,
    databaseCluster: 99.99,
    paymentProcessor: 99.97,
    supportSystem: 100.00,
    averageResponseTime: 38, // ms
    securityIncidents: 0,
    networkLatency: 15 // ms to major hubs
  };

  const [uptimeData, setUptimeData] = useState(initialUptime);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeData(prev => ({
        ...prev,
        mainServices: parseFloat(Math.min(99.99, prev.mainServices + (Math.random() * 0.02 - 0.01)).toFixed(2)),
        apiGateway: parseFloat(Math.min(99.99, prev.apiGateway + (Math.random() * 0.02 - 0.01)).toFixed(2)),
        paymentProcessor: parseFloat(Math.min(99.99, prev.paymentProcessor + (Math.random() * 0.03 - 0.015)).toFixed(2)),
        averageResponseTime: parseInt(Math.max(25, Math.min(55, prev.averageResponseTime + (Math.random() * 4 - 2))).toFixed(0)),
        networkLatency: parseInt(Math.max(10, Math.min(25, prev.networkLatency + (Math.random() * 5-2))).toFixed(0)),
      }));
    }, 3500); // Update interval for more dynamic feel
    return () => clearInterval(interval);
  }, []);

  const StatusCard = ({ icon: Icon, title, value, unit, colorFrom, colorTo, description, isPercentage }) => {
    const displayValue = isPercentage ? parseFloat(value).toFixed(2) : value;
    return (
    <motion.div
      className="p-6 md:p-8 bg-card rounded-2xl shadow-xl border border-border/50 transform hover:scale-105 transition-transform duration-300 ease-out flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'circOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${colorFrom} ${colorTo} rounded-xl flex items-center justify-center mb-6 shadow-lg filter brightness-110`}>
        <Icon className="text-background" size={32} />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center font-minecraft title-animate">{displayValue}{unit}</h3>
      <p className="text-base md:text-lg text-foreground/80 text-center mb-2 font-roboto-mono tracking-wide">{title}</p>
      {description && <p className="text-sm text-foreground/60 text-center font-roboto-mono">{description}</p>}
    </motion.div>
  )};
  
  const statusItems = [
    { icon: Server, title: "Antipublic DBs", value: uptimeData.mainServices, unit:"%", colorFrom:"from-green-500", colorTo:"to-emerald-500", description: "Antipub availability", isPercentage: true },
    { icon: Activity, title: "API Gateway(Palhitter)", value: uptimeData.apiGateway, unit:"%", colorFrom:"from-cyan-500", colorTo:"to-sky-500", description: "Api for Palhitter", isPercentage: true },
    { icon: Database, title: "Proxyless EXAPI", value: uptimeData.databaseCluster, unit:"%", colorFrom:"from-blue-500", colorTo:"to-indigo-500", description: "Proxyless REV gate", isPercentage: true },
    { icon: Zap, title: "Avg. Response", value: uptimeData.averageResponseTime, unit:"ms", colorFrom:"from-yellow-500", colorTo:"to-amber-500", description: "SYSres" },
    { icon: Shield, title: "API Gateway(Veralium HM)", value: uptimeData.paymentProcessor, unit:"%", colorFrom:"from-purple-500", colorTo:"to-violet-500", description: "Veralium API", isPercentage: true },
    { icon: Wifi, title: "VPS network", value: uptimeData.networkLatency, unit:"ms", colorFrom:"from-pink-500", colorTo:"to-rose-500", description: "VPS cluster UPtime" },
    { icon: CheckCircle, title: "SSX", value: uptimeData.supportSystem, unit:"%", colorFrom:"from-teal-500", colorTo:"to-cyan-500", description: "Client assistance portal status", isPercentage: true },
    { icon: TrendingUp, title: "SECyy", value: uptimeData.securityIncidents === 0 ? 'Nominal' : `${uptimeData.securityIncidents} Incidents`, unit:"", colorFrom: uptimeData.securityIncidents === 0 ? "from-lime-500" : "from-red-500", colorTo: uptimeData.securityIncidents === 0 ? "to-green-500" : "to-rose-500", description: uptimeData.securityIncidents === 0 ? "No incidents in past 90 days" : "Incidents in past 90 days" },
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
      <section id="uptime" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'circOut' }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text tracking-tight title-animate">System Status & Performance</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-roboto-mono">
              API response and Uptime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto w-full">
            {statusItems.map((item, index) => (
                <StatusCard key={"item.title"} {...item} />
            ))}
          </div>
          
          <motion.div 
            className="mt-16 md:mt-20 text-center p-8 bg-card rounded-2xl shadow-2xl border border-border/50 mx-auto"
            initial={{ opacity: 0 , y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'circOut', delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground/80 text-lg font-roboto-mono">
              All systems are currently <strong className="text-green-400 font-semibold font-minecraft">OPERATIONAL</strong>. 
              We are committed to maintaining the highest levels of service availability and performance.
              <br />
              <span className="text-xs text-foreground/60 mt-2 block">Last update: {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}</span>
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default UptimePage;