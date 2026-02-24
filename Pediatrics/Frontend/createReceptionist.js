const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

// Connect to DB
// mongoose.connect('mongodb://127.0.0.1:27017/pediatrician_clinic', {
//mongoose.connect('mongodb+srv://aditya31031998_db_user:Adityaadi334@pediatrician-clinic.mx1lp0w.mongodb.net/pediatrician_clinic?appName=pediatrician-clinic', {
mongoose.connect('mongodb+srv://Vercel-Admin-pediatrics:Adityaadi334@pediatrics.qsfg2fw.mongodb.net/?appName=pediatrics', {
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const createReceptionist = async () => {
    try {
        const args = process.argv.slice(2);
        const email = args[0];
        const password = args[1];

        if (!email || !password) {
            console.error('Usage: node createReceptionist.js <email> <password>');
            console.error('Example: node createReceptionist.js reception@clinic.com mySecurePass123');
            process.exit(1);
        }

        const phone = '9999999900'; // Default phone, or add as 3rd arg if needed

        let user = await User.findOne({ email });

        if (user) {
            console.log('Receptionist user already exists. Updating role...');
            user.role = 'receptionist';
            user.password = await bcrypt.hash(password, 10); // Reset password just in case
            await user.save();
            console.log('Receptionist Updated:');
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                name: 'Reception Desk',
                email,
                phone,
                password: hashedPassword,
                role: 'receptionist'
            });

            await user.save();
            console.log('Receptionist Created:');
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createReceptionist();
