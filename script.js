// Configuration Firebase (remplace les valeurs par les tiennes)
const firebaseConfig = {
  apiKey: "AIzaSyBUYdBTVB31gI_HCTj03Yjyb3KFGkdMoEbQ",
  authDomain: "fitness-app-cf4d8.firebaseapp.com",
  projectId: "fitness-app-cf4d8",
  storageBucket: "fitness-app-cf4d8.appspot.com",
  messagingSenderId: "244040081054",
  appId: "1:244040081054:web:51acbd85ae4b6ef0cba58f",
  measurementId: "G-ZEKYTP4YMT"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Inscription
function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      db.collection("users").doc(user.uid).set({
        email: email,
        muscles: { pectoraux: "Fer", biceps: "Fer" }
      });
      alert("Compte créé !");
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
}

// Connexion
function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("auth").style.display = "none";
      document.getElementById("app").style.display = "block";
      document.getElementById("user-email").textContent = email;
      loadMuscles(userCredential.user.uid);
    });
}

// Charger les muscles de l'utilisateur
function loadMuscles(userId) {
  db.collection("users").doc(userId).onSnapshot((doc) => {
    const muscles = doc.data().muscles;
    const container = document.getElementById("muscles");
    container.innerHTML = "";
    for (const [name, rank] of Object.entries(muscles)) {
      const rankColor = rank === "Or" ? "gold" : rank === "Fer" ? "gray" : "blue";
      container.innerHTML += `
        <div class="muscle">
          ${name} :
          <span class="rank" style="background: ${rankColor};">${rank}</span>
        </div>
      `;
    }
  });
}
