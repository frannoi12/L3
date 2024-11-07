// Proxy pour valider l'email
const emailValidatorProxy = new Proxy({}, {
    async set(target, prop, value) {
        if (prop === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(value)) {
                throw new Error('Email invalide');
            }
        }
        // Si l'email est valide, on autorise la mise à jour de la propriété
        target[prop] = value;
        return true;
    }
});