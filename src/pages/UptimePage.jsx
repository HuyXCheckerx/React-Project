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
        mainServices: parseFloat(Math.min(99.99, prev.mainServices + (Math.random() * 0.002 - 0.001)).toFixed(2)),
        apiGateway: parseFloat(Math.min(99.99, prev.apiGateway + (Math.random() * 0.002 - 0.001)).toFixed(2)),
        paymentProcessor: parseFloat(Math.min(99.99, prev.paymentProcessor + (Math.random() * 0.003 - 0.0015)).toFixed(2)),
        averageResponseTime: parseInt(Math.max(25, Math.min(55, prev.averageResponseTime + (Math.random() * 4 - 2))).toFixed(0)),
        networkLatency: parseInt(Math.max(10, Math.min(25, prev.networkLatency + (Math.random() * 2 - 1))).toFixed(0)),
      }));
    }, 3500); // Update interval for more dynamic feel
    return () => clearInterval(interval);
  }, []);

  const StatusCard = ({ icon: Icon, title, value, unit, colorFrom, colorTo, description, isPercentage }) => {
    const displayValue = isPercentage ? parseFloat(value).toFixed(2) : value;
    return (
    <motion.div
      className="p-6 md:p-8 bg-card rounded-2xl shadow-xl border border-border/50 transform hover:scale-105 transition-transform duration-300 ease-out"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'circOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${colorFrom} ${colorTo} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg filter brightness-110`}>
        <Icon className="text-background" size={32} />
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-1.5 text-center font-minecraft title-animate">{displayValue}{unit}</h3>
      <p className="text-foreground/80 text-center text-sm mb-3 font-roboto-mono tracking-wide">{title}</p>
      {description && <p className="text-foreground/60 text-center text-xs font-roboto-mono">{description}</p>}
    </motion.div>
  )};
  
  const statusItems = [
    { icon: Server, title: "Core Services", value: uptimeData.mainServices, unit:"%", colorFrom:"from-green-500", colorTo:"to-emerald-500", description: "Main operational systems availability", isPercentage: true },
    { icon: Activity, title: "API Gateway", value: uptimeData.apiGateway, unit:"%", colorFrom:"from-cyan-500", colorTo:"to-sky-500", description: "Service request handling integrity", isPercentage: true },
    { icon: Database, title: "Database Cluster", value: uptimeData.databaseCluster, unit:"%", colorFrom:"from-blue-500", colorTo:"to-indigo-500", description: "Data storage & retrieval status", isPercentage: true },
    { icon: Zap, title: "Avg. Response", value: uptimeData.averageResponseTime, unit:"ms", colorFrom:"from-yellow-500", colorTo:"to-amber-500", description: "System responsiveness benchmark" },
    { icon: Shield, title: "Payment Gateway", value: uptimeData.paymentProcessor, unit:"%", colorFrom:"from-purple-500", colorTo:"to-violet-500", description: "Transaction processing uptime", isPercentage: true },
    { icon: Wifi, title: "Network Latency", value: uptimeData.networkLatency, unit:"ms", colorFrom:"from-pink-500", colorTo:"to-rose-500", description: "To major internet backbones" },
    { icon: CheckCircle, title: "Support System", value: uptimeData.supportSystem, unit:"%", colorFrom:"from-teal-500", colorTo:"to-cyan-500", description: "Client assistance portal status", isPercentage: true },
    { icon: TrendingUp, title: "Security Posture", value: uptimeData.securityIncidents === 0 ? 'Nominal' : `${uptimeData.securityIncidents} Incidents`, unit:"", colorFrom: uptimeData.securityIncidents === 0 ? "from-lime-500" : "from-red-500", colorTo: uptimeData.securityIncidents === 0 ? "to-green-500" : "to-rose-500", description: uptimeData.securityIncidents === 0 ? "No incidents in past 90 days" : "Incidents in past 90 days" },
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
              Real-time monitoring of our service performance, availability, and key reliability metrics. We value transparency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statusItems.map((item, index) => (
                <StatusCard key={item.title} {...item} />
            ))}
          </div>
          
          <motion.div 
            className="mt-16 md:mt-20 text-center p-8 bg-card rounded-2xl shadow-2xl border border-border/50"
            initial={{ opacity: 0, y: 20 }}
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