import { motion } from "framer-motion";

const Layout = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

export default Layout;
