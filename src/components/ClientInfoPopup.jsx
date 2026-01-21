import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiGift } from 'react-icons/hi2';

const ClientInfoPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const hasSubmitted = () => {
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        return !!cookies.clientInfo;
    };

    // Check on component mount and set popup visibility based on cookie
    useEffect(() => {
        if (hasSubmitted()) {
            return;
        }

        const interval = setInterval(() => {
            setIsOpen(true);
            setStep(1);
        }, 30000);

        const initialTimeout = setTimeout(() => {
            setIsOpen(true);
        }, 30000);

        return () => {
            clearInterval(interval);
            clearTimeout(initialTimeout);
        };
    }, [isSubmitted]);

    const handleClose = () => {
        setIsOpen(false);
        setStep(1);
        setFormData({ name: '', phone: '' });
    };

    const handleContinue = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handleProceed = () => {
        if (formData.name && formData.phone) {
            setStep(3);

            // Save to cookies - expires in 30 days
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30);
            const expiryString = expiryDate.toUTCString();

            const clientInfoJSON = JSON.stringify(formData);
            document.cookie = `clientInfo=${encodeURIComponent(clientInfoJSON)}; expires=${expiryString}; path=/`;

            console.log('Form submitted:', formData);
            console.log('Cookies saved:', document.cookie);

            setIsSubmitted(true);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
                        onClick={handleClose}
                    >

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-[350px] md:max-w-lg relative overflow-hidden"
                        >

                            <motion.button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <HiXMark className="text-xl text-gray-600" />
                            </motion.button>


                            <div className="p-8 md:p-12">
                                <AnimatePresence mode="wait">
                                    {/* Step 1 */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-center"
                                        >
                                            {/* Icon */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-blue-300"
                                            >
                                                <HiGift className="text-6xl text-blue-500" />
                                            </motion.div>

                                            <motion.h2
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3, duration: 0.4 }}
                                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                                            >
                                                Welcome to VESTELLE!
                                            </motion.h2>

                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4, duration: 0.4 }}
                                                className="text-gray-500 text-base md:text-lg mb-8"
                                            >
                                                Signup to stay updated and never miss an exclusive offer...
                                            </motion.p>

                                            <motion.button
                                                onClick={handleContinue}
                                                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-colors cursor-pointer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5, duration: 0.4 }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Continue
                                            </motion.button>
                                        </motion.div>
                                    )}

                                    {/* Step 2 */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-center"
                                        >
                                            <motion.h2
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1, duration: 0.4 }}
                                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                                            >
                                                Almost Done
                                            </motion.h2>

                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.4 }}
                                                className="text-gray-500 text-base mb-8"
                                            >
                                                Drop your Name and Phone Number so we can reach you easily...
                                            </motion.p>

                                            <div className="space-y-4 mb-8">
                                                <motion.input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className="w-full px-6 py-4 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3, duration: 0.4 }}
                                                />

                                                <motion.input
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    className="w-full px-6 py-4 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4, duration: 0.4 }}
                                                />
                                            </div>

                                            <motion.button
                                                onClick={handleProceed}
                                                disabled={!formData.name || !formData.phone}
                                                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5, duration: 0.4 }}
                                                whileHover={formData.name && formData.phone ? { scale: 1.05, y: -2 } : {}}
                                                whileTap={formData.name && formData.phone ? { scale: 0.95 } : {}}
                                            >
                                                Proceed
                                            </motion.button>
                                        </motion.div>
                                    )}

                                    {/* Step 3 */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-center"
                                        >
                                            {/* Success Icon */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                                className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                                            >
                                                <motion.svg
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ delay: 0.4, duration: 0.6 }}
                                                    className="w-12 h-12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#10B981"
                                                    strokeWidth="3"
                                                >
                                                    <motion.path
                                                        d="M5 13l4 4L19 7"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </motion.svg>
                                            </motion.div>

                                            <motion.h2
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3, duration: 0.4 }}
                                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                                            >
                                                All Set!
                                            </motion.h2>

                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4, duration: 0.4 }}
                                                className="text-gray-500 text-base mb-8"
                                            >
                                                Thanks for signing up...
                                            </motion.p>

                                            <motion.button
                                                onClick={handleClose}
                                                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg transition-colors cursor-pointer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5, duration: 0.4 }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Continue Shopping
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Progress Indicators */}
                            <div className="flex justify-center gap-2 pb-6">
                                {[1, 2, 3].map((s) => (
                                    <motion.div
                                        key={s}
                                        className={`h-1.5 rounded-full transition-all ${s === step ? 'w-8 bg-blue-500' : 'w-1.5 bg-gray-300'
                                            }`}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: s * 0.1 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ClientInfoPopup;