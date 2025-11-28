// ==================== DONNÉES AGENT FIFA ====================

const agentData = {
    firstName: "Nabil",
    lastName: "ZAIMI EL KARANI",
    position: "FIFA Football Agent",
    licenseStatus: "VALID",
    licenseNumber: "202305-1843",
    connectId: "1N21CC5",
    minorsAuth: "as of 03/10/2023",
    phone: "+33 6 09 33 11 08",
    email: "elkaraninabil@gmail.com",
    // URL de vérification FIFA - À MODIFIER AVEC LE VRAI LIEN
    verificationUrl: "https://agents.fifa.com/license-validation?hash=7452aeecaab18f206b45928d7cd68d6c95ed5143c6a17927b87bd7531e08b21c",
    photoPath: "./asset/agent-photo.jpg"
};

// ==================== INITIALISATION ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log("🎯 Initialisation Carte FIFA Agent...");
    
    // Afficher les infos de debug
    showDebugInfo();
    
    // Vérifier la bibliothèque QRCode
    if (typeof QRCode === 'undefined') {
        console.error("❌ Bibliothèque QRCode non chargée");
        showError("QR Code library not loaded - Please check internet connection");
        return;
    }
    
    console.log("✅ Bibliothèque QRCode chargée");
    
    // Charger les données de l'agent
    loadAgentData();
    
    // Générer les QR Codes
    generateContactQR();
    generateVerificationQR();
    
    console.log("✅ Carte FIFA prête !");
});

// ==================== CHARGEMENT DES DONNÉES ====================

function loadAgentData() {
    try {
        // Mettre à jour les informations affichées
        document.getElementById('agentFirstName').textContent = agentData.firstName;
        document.getElementById('agentLastName').textContent = agentData.lastName;
        document.getElementById('licenseStatus').textContent = agentData.licenseStatus;
        document.getElementById('licenseNumber').textContent = agentData.licenseNumber;
        document.getElementById('connectId').textContent = agentData.connectId;
        document.getElementById('minorsAuth').textContent = agentData.minorsAuth;
        
        // Charger la photo
        const agentPhoto = document.getElementById('agentPhoto');
        agentPhoto.src = agentData.photoPath;
        
        // Vérifier si la photo charge
        agentPhoto.onerror = function() {
            console.warn("⚠️ Photo non trouvée, utilisation photo par défaut");
            this.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face';
            updateDebugInfo("Photo: Chargée depuis source externe (photo locale non trouvée)");
        };
        
        agentPhoto.onload = function() {
            console.log("✅ Photo chargée avec succès");
            updateDebugInfo("Photo: Chargée depuis " + agentData.photoPath);
        };
        
        console.log("📋 Données agent chargées:", agentData);
        
    } catch (error) {
        console.error("❌ Erreur chargement données:", error);
        showError("Error loading agent data: " + error.message);
    }
}

// ==================== GÉNÉRATION QR CODES ====================

function generateContactQR() {
    const container = document.getElementById('contactQR');
    if (!container) {
        console.error("❌ Container QR Code contact non trouvé");
        return;
    }
    
    container.innerHTML = '<div class="qr-loading">Generating simple version...</div>';
    
    // ✅ VERSION SIMPLIFIÉE - Plus facile à scanner
    const simpleContactData = `MECARD:N:${agentData.lastName},${agentData.firstName};TEL:${agentData.phone};EMAIL:${agentData.email};NOTE:FIFA Agent ${agentData.licenseNumber};;`;
    
    console.log("📇 Données MECARD simplifiées:", simpleContactData);
    
    try {
        container.innerHTML = '';
        
        new QRCode(container, {
            text: simpleContactData,
            width: 150, // Légèrement plus grand
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L // Niveau de correction plus bas
        });
        
        console.log("✅ QR Code Contact SIMPLE généré");
        updateDebugInfo("QR Contact: Version simple générée");
        
    } catch (error) {
        console.error("❌ Erreur génération QR simple:", error);
        // Fallback: version encore plus simple
        generateUltraSimpleContactQR();
    }
}

function generateUltraSimpleContactQR() {
    const container = document.getElementById('contactQR');
    
    // ✅ VERSION ULTRA SIMPLE - Juste les infos essentielles
    const ultraSimpleData = `BEGIN:VCARD\nVERSION:2.1\nN:${agentData.lastName};${agentData.firstName}\nFN:${agentData.firstName} ${agentData.lastName}\nTEL:${agentData.phone}\nEMAIL:${agentData.email}\nEND:VCARD`;
    
    try {
        container.innerHTML = '';
        
        new QRCode(container, {
            text: ultraSimpleData,
            width: 160,
            height: 160,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
        
        console.log("✅ QR Code Contact ULTRA SIMPLE généré");
        updateDebugInfo("QR Contact: Version ultra simple générée");
        
    } catch (error) {
        console.error("❌ Erreur génération QR ultra simple:", error);
        container.innerHTML = '<div class="qr-error">Scan Error</div>';
    }
}

function generateVerificationQR() {
    const container = document.getElementById('verificationQR');
    if (!container) {
        console.error("❌ Container QR Code vérification non trouvé");
        return;
    }
    
    container.innerHTML = '<div class="qr-loading">Generating...</div>';
    
    // Utiliser le vrai lien FIFA extrait du PDF
    const verificationData = agentData.verificationUrl;
    
    // Vérifier que ce n'est pas le lien exemple
    if (verificationData.includes("ABCD-1234")) {
        console.warn("⚠️ ATTENTION: Vous utilisez encore le lien exemple !");
        updateDebugInfo("⚠️ REMPLACEZ verificationUrl PAR LE VRAI LIEN FIFA");
    }
    
    try {
        // Vider le container
        container.innerHTML = '';
        
        new QRCode(container, {
            text: verificationData,
            width: 120,
            height: 120,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
        
        console.log("✅ QR Code Vérification généré");
        console.log("🔗 Lien de vérification FIFA:", verificationData);
        updateDebugInfo("QR Vérification: Généré - Pointe vers " + verificationData);
        
        // Afficher un avertissement si c'est encore l'exemple
        if (verificationData.includes("ABCD-1234")) {
            showWarning("⚠️ REMPLACEZ LE LIEN verificationUrl DANS LE CODE !");
        }
        
    } catch (error) {
        console.error("❌ Erreur génération QR Vérification:", error);
        container.innerHTML = '<div class="qr-error">Verification QR Error</div>';
        updateDebugInfo("QR Vérification: Erreur - " + error.message);
    }
}

// ==================== FONCTIONS UTILITAIRES ====================

function showError(message) {
    const container = document.querySelector('.fifa-container');
    const errorDiv = document.createElement('div');
    errorDiv.style.background = '#dc3545';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';
    errorDiv.style.marginBottom = '10px';
    errorDiv.style.textAlign = 'center';
    errorDiv.textContent = '❌ ' + message;
    container.insertBefore(errorDiv, container.firstChild);
}

function showWarning(message) {
    const container = document.querySelector('.fifa-container');
    const warningDiv = document.createElement('div');
    warningDiv.style.background = '#ffc107';
    warningDiv.style.color = '#856404';
    warningDiv.style.padding = '10px';
    warningDiv.style.borderRadius = '5px';
    warningDiv.style.marginBottom = '10px';
    warningDiv.style.textAlign = 'center';
    warningDiv.style.border = '2px solid #ffb507';
    warningDiv.innerHTML = '⚠️ <strong>' + message + '</strong><br><small>Extrayez le vrai lien du QR Code dans votre PDF FIFA</small>';
    container.insertBefore(warningDiv, container.firstChild);
}

function showDebugInfo() {
    const debugDiv = document.querySelector('.debug-info');
    debugDiv.style.display = 'block';
    updateDebugInfo("Initialisation...");
}

function updateDebugInfo(message) {
    const debugContent = document.getElementById('debugContent');
    const timestamp = new Date().toLocaleTimeString();
    debugContent.innerHTML += `<div>[${timestamp}] ${message}</div>`;
    // Garder seulement les 5 derniers messages
    const messages = debugContent.querySelectorAll('div');
    if (messages.length > 5) {
        messages[0].remove();
    }
}

// ==================== PERSONNALISATION FACILE ====================

// Fonction pour mettre à jour toutes les données
function updateAgentData(newData) {
    Object.assign(agentData, newData);
    loadAgentData();
    generateContactQR();
    generateVerificationQR();
    console.log("🔄 Données agent mises à jour:", agentData);
    updateDebugInfo("Données mises à jour");
}

// Fonction pour tester facilement depuis la console
window.updateVerificationLink = function(newLink) {
    agentData.verificationUrl = newLink;
    generateVerificationQR();
    console.log("🔗 Lien de vérification mis à jour:", newLink);
    updateDebugInfo("Lien vérification mis à jour: " + newLink);
}; 

// Testez depuis la console avec :
// updateAgentData({firstName: "VotrePrénom", lastName: "VOTRENOM", phone: "VOTRE-NUMERO", email: "VOTRE@EMAIL.COM"})